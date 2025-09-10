import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import logger from '../utils/logger';
import path from 'path';
import fs from 'fs';

export const secureDownload = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { token } = req.params;
    const clientIP = req.ip || req.connection.remoteAddress;

    // Find and validate token
    const downloadToken = await prisma.downloadToken.findUnique({
      where: { token },
      include: {
        request: {
          include: {
            document: {
              select: {
                title: true,
                fileName: true,
                filePath: true,
                fileSize: true,
                mimeType: true,
              },
            },
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!downloadToken) {
      return res.status(404).json({
        success: false,
        error: 'Download link not found or invalid',
      });
    }

    // Check if token has expired
    if (new Date() > downloadToken.expiresAt) {
      return res.status(403).json({
        success: false,
        error: 'Download link has expired',
      });
    }

    // Check if token has already been used
    if (downloadToken.downloadedAt) {
      return res.status(403).json({
        success: false,
        error: 'Download link has already been used',
      });
    }

    // Check if request is approved
    if (downloadToken.request.status !== 'APPROVED') {
      return res.status(403).json({
        success: false,
        error: 'Document request is not approved',
      });
    }

    const document = downloadToken.request.document;
    const filePath = path.join(process.cwd(), document.filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      logger.error(`File not found: ${filePath}`);
      return res.status(404).json({
        success: false,
        error: 'Document file not found',
      });
    }

    // Mark token as used
    await prisma.downloadToken.update({
      where: { id: downloadToken.id },
      data: {
        downloadedAt: new Date(),
        ipAddress: clientIP,
      },
    });

    // Log download activity
    logger.info(`Document downloaded: ${document.fileName} by ${downloadToken.request.user.email} from IP ${clientIP}`);

    // Set appropriate headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${document.fileName}"`);
    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Length', document.fileSize);
    
    // Cache control to prevent caching of sensitive documents
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      logger.error('File stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Error streaming file',
        });
      }
    });

  } catch (error) {
    logger.error('Secure download error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const generateDownloadLink = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params; // request ID

    // Check if request exists and is approved
    const request = await prisma.documentRequest.findFirst({
      where: { id, status: 'APPROVED' },
      include: {
        document: { select: { title: true, fileName: true } },
        downloadTokens: {
          where: { downloadedAt: null }, // Only unused tokens
          select: { token: true, expiresAt: true },
        },
      },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Approved request not found',
      });
    }

    // Check if there's already an active token
    const activeToken = request.downloadTokens.find(
      (token) => new Date() < token.expiresAt
    );

    if (activeToken) {
      return res.json({
        success: true,
        data: {
          token: activeToken.token,
          expiresAt: activeToken.expiresAt,
          downloadUrl: `/api/download/${activeToken.token}`,
        },
        message: 'Download link already exists',
      });
    }

    // Generate new token if none exists or all expired
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);

    const downloadToken = await prisma.downloadToken.create({
      data: {
        requestId: id,
        token,
        expiresAt,
      },
    });

    return res.json({
      success: true,
      data: {
        token: downloadToken.token,
        expiresAt: downloadToken.expiresAt,
        downloadUrl: `/api/download/${downloadToken.token}`,
      },
      message: 'Download link generated successfully',
    });
  } catch (error) {
    logger.error('Generate download link error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};