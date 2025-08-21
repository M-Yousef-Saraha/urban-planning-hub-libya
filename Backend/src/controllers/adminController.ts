import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import prisma from '../utils/prisma';
import { emailService } from '../services/emailService';

export const getAllRequests = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      urgency,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (urgency) {
      where.urgency = urgency;
    }

    const orderBy: any = {};
    orderBy[sortBy as string] = sortOrder;

    const [requests, total] = await Promise.all([
      prisma.documentRequest.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          document: {
            select: {
              id: true,
              title: true,
              category: true,
              fileName: true,
              filePath: true,
              mimeType: true,
            },
          },
        },
      }),
      prisma.documentRequest.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          itemsPerPage: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get all requests error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const request = await prisma.documentRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        document: {
          select: {
            id: true,
            title: true,
            fileName: true,
            filePath: true,
            mimeType: true,
          },
        },
      },
    });

    if (!request) {
      res.status(404).json({
        success: false,
        error: 'Request not found',
      });
    }

    // Update request status
    const updatedRequest = await prisma.documentRequest.update({
      where: { id },
      data: { 
        status,
        notes: adminNotes || request.notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        document: {
          select: {
            id: true,
            title: true,
            fileName: true,
            filePath: true,
            mimeType: true,
          },
        },
      },
    });

    // If approved, send document via email
    if (status === 'APPROVED') {
      try {
        const filePath = path.join(process.cwd(), request.document.filePath);
        
        if (fs.existsSync(filePath)) {
          const documentBuffer = fs.readFileSync(filePath);
          
          await emailService.sendDocumentDelivery(
            request.user.email,
            request.user.name,
            request.document.title,
            documentBuffer,
            request.document.fileName,
            request.document.mimeType
          );

          // Update status to completed after successful email delivery
          await prisma.documentRequest.update({
            where: { id },
            data: { status: 'COMPLETED' },
          });
        } else {
          console.error('Document file not found:', filePath);
          res.status(404).json({
            success: false,
            error: 'Document file not found',
          });
        }
      } catch (emailError) {
        console.error('Failed to send document via email:', emailError);
        res.status(500).json({
          success: false,
          error: 'Failed to send document via email',
        });
      }
    }

    res.json({
      success: true,
      data: updatedRequest,
      message: `Request ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const getRequestStats = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const [
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      completedRequests,
      urgentRequests,
    ] = await Promise.all([
      prisma.documentRequest.count(),
      prisma.documentRequest.count({ where: { status: 'PENDING' } }),
      prisma.documentRequest.count({ where: { status: 'APPROVED' } }),
      prisma.documentRequest.count({ where: { status: 'REJECTED' } }),
      prisma.documentRequest.count({ where: { status: 'COMPLETED' } }),
      prisma.documentRequest.count({ 
        where: { 
          urgency: 'URGENT',
          status: { in: ['PENDING', 'APPROVED'] }
        } 
      }),
    ]);

    // Get requests by category
    const requestsByCategory = await prisma.documentRequest.groupBy({
      by: ['documentId'],
      _count: {
        id: true,
      },
    });

    // Get recent requests (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentRequests = await prisma.documentRequest.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    res.json({
      success: true,
      data: {
        totalRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
        completedRequests,
        urgentRequests,
        recentRequests,
        requestsByCategory,
      },
    });
  } catch (error) {
    console.error('Get request stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const getDocumentStats = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const [
      totalDocuments,
      activeDocuments,
      inactiveDocuments,
    ] = await Promise.all([
      prisma.document.count(),
      prisma.document.count({ where: { isActive: true } }),
      prisma.document.count({ where: { isActive: false } }),
    ]);

    // Get documents by category
    const documentsByCategory = await prisma.document.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: {
        id: true,
      },
    });

    // Get most requested documents
    const mostRequestedDocuments = await prisma.documentRequest.groupBy({
      by: ['documentId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    });

    // Get document details for most requested
    const documentIds = mostRequestedDocuments.map(item => item.documentId);
    const documents = await prisma.document.findMany({
      where: { id: { in: documentIds } },
      select: {
        id: true,
        title: true,
        category: true,
      },
    });

    const mostRequestedWithDetails = mostRequestedDocuments.map(item => ({
      ...item,
      document: documents.find(doc => doc.id === item.documentId),
    }));

    res.json({
      success: true,
      data: {
        totalDocuments,
        activeDocuments,
        inactiveDocuments,
        documentsByCategory,
        mostRequestedDocuments: mostRequestedWithDetails,
      },
    });
  } catch (error) {
    console.error('Get document stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const getDownloads = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { limit = 50 } = req.query;
    const logsPath = path.join(process.cwd(), 'logs', 'downloads.jsonl');

    if (!fs.existsSync(logsPath)) {
      return res.json({ success: true, data: { downloads: [] } });
    }

    const lines = fs.readFileSync(logsPath, 'utf8').trim().split('\n').filter(Boolean);
    const recent = lines.slice(-Number(limit)).map(l => JSON.parse(l));

    res.json({ success: true, data: { downloads: recent.reverse() } });
  } catch (error) {
    console.error('Get downloads error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

