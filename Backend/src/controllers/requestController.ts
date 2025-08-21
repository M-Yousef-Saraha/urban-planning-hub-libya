import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { emailService } from '../services/emailService';

export const createRequest = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { documentId, purpose, urgency, notes } = req.body;
    const userId = req.user!.id;

    // Check if document exists and is active
    const document = await prisma.document.findFirst({
      where: { id: documentId, isActive: true },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found or not available',
      });
    }

    // Check if user already has a pending request for this document
    const existingRequest = await prisma.documentRequest.findFirst({
      where: {
        userId,
        documentId,
        status: { in: ['PENDING', 'APPROVED'] },
      },
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        error: 'You already have a pending request for this document',
      });
    }

    // Create the request
    const documentRequest = await prisma.documentRequest.create({
      data: {
        userId,
        documentId,
        purpose,
        urgency,
        notes,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        document: {
          select: { id: true, title: true, category: true },
        },
      },
    });

    // Send confirmation email to user
    try {
      await emailService.sendRequestConfirmation(
        documentRequest.user.email,
        documentRequest.user.name,
        documentRequest.document.title,
        documentRequest.id
      );
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Send notification email to admin
    try {
      await emailService.sendAdminNotification(
        documentRequest.user.name,
        documentRequest.user.email,
        documentRequest.document.title,
        documentRequest.purpose,
        documentRequest.urgency,
        documentRequest.id
      );
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    return res.status(201).json({
      success: true,
      data: {
        id: documentRequest.id,
        documentId: documentRequest.documentId,
        purpose: documentRequest.purpose,
        urgency: documentRequest.urgency,
        notes: documentRequest.notes,
        status: documentRequest.status,
        createdAt: documentRequest.createdAt,
        document: documentRequest.document,
      },
    });
  } catch (error) {
    console.error('Create request error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const getUserRequests = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { userId: req.user!.id };
    if (status) {
      where.status = status;
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
          document: {
            select: {
              id: true,
              title: true,
              category: true,
              fileName: true,
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
    console.error('Get user requests error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const getRequest = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const request = await prisma.documentRequest.findFirst({
      where: { id, userId },
      include: {
        document: {
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            fileName: true,
            fileSize: true,
            mimeType: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found',
      });
    }

    return res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Get request error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const cancelRequest = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const request = await prisma.documentRequest.findFirst({
      where: { id, userId, status: 'PENDING' },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found or cannot be cancelled',
      });
    }

    await prisma.documentRequest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    return res.json({
      success: true,
      message: 'Request cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel request error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

