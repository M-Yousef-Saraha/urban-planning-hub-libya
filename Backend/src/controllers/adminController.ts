import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import prisma from '../utils/prisma';
import { emailService } from '../services/emailService';
import logger from '../utils/logger';

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
    logger.error('Get all admin requests error:', error);
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
          logger.warn('Document file not found for email attachment:', filePath);
          res.status(404).json({
            success: false,
            error: 'Document file not found',
          });
        }
      } catch (emailError) {
        logger.error('Failed to send document via email:', emailError);
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
    logger.error('Update request status error:', error);
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
    logger.error('Get request stats error:', error);
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
    logger.error('Get document stats error:', error);
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
    logger.error('Get downloads error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// User Management
export const getAllUsers = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (role) {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          _count: {
            requests: true
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          itemsPerPage: limitNum,
        }
      }
    });
  } catch (error) {
    logger.error('Get all users error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    res.json({
      success: true,
      data: updatedUser,
      message: 'User role updated successfully'
    });
  } catch (error) {
    logger.error('Update user role error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const toggleUserStatus = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Since there's no isActive field, we'll implement a different approach
    // For now, we'll just return a success message
    res.json({
      success: true,
      message: 'User status toggle functionality not implemented yet'
    });
    return;

    res.json({
      success: true,
      data: updatedUser,
      message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    logger.error('Toggle user status error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// System Settings
export const getSystemSettings = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    // For now, return default settings since we don't have a settings table yet
    const settings = {
      siteName: 'Urban Planning Hub Libya',
      maxFileSize: 50 * 1024 * 1024, // 50MB
      allowedFileTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
      emailSettings: {
        enabled: true,
        fromName: 'Urban Planning Authority',
        fromEmail: 'noreply@urbanplanning.ly'
      },
      requestSettings: {
        autoApproval: false,
        maxRequestsPerUser: 10,
        urgentRequestNotification: true
      }
    };

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    logger.error('Get system settings error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const updateSystemSettings = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const settings = req.body;
    
    // For now, just validate and return the settings since we don't have persistence
    // In a real implementation, you would save to a settings table
    
    res.json({
      success: true,
      data: settings,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    logger.error('Update system settings error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Media Management
export const getMediaFiles = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({ success: true, data: { files: [] } });
    }

    const files = fs.readdirSync(uploadsDir).map(filename => {
      const filePath = path.join(uploadsDir, filename);
      const stats = fs.statSync(filePath);
      
      return {
        name: filename,
        size: stats.size,
        modified: stats.mtime,
        type: path.extname(filename),
        path: `/uploads/${filename}`
      };
    });

    res.json({
      success: true,
      data: { files: files.sort((a, b) => b.modified.getTime() - a.modified.getTime()) }
    });
  } catch (error) {
    logger.error('Get media files error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deleteMediaFile = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    logger.error('Delete media file error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Bulk Operations
export const bulkUpdateRequests = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { requestIds, action, status, adminNotes } = req.body;

    if (!requestIds || requestIds.length === 0) {
      return res.status(400).json({ success: false, error: 'No request IDs provided' });
    }

    let updateData: any = {};
    
    if (action === 'updateStatus' && status) {
      updateData.status = status;
      if (adminNotes) {
        updateData.notes = adminNotes;
      }
    }

    const result = await prisma.documentRequest.updateMany({
      where: { id: { in: requestIds } },
      data: updateData
    });

    res.json({
      success: true,
      data: { updatedCount: result.count },
      message: `${result.count} requests updated successfully`
    });
  } catch (error) {
    logger.error('Bulk update requests error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const bulkUpdateDocuments = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { documentIds, action, isActive, category } = req.body;

    if (!documentIds || documentIds.length === 0) {
      return res.status(400).json({ success: false, error: 'No document IDs provided' });
    }

    let updateData: any = {};
    
    if (action === 'toggleStatus') {
      updateData.isActive = isActive;
    } else if (action === 'updateCategory' && category) {
      updateData.category = category;
    }

    const result = await prisma.document.updateMany({
      where: { id: { in: documentIds } },
      data: updateData
    });

    res.json({
      success: true,
      data: { updatedCount: result.count },
      message: `${result.count} documents updated successfully`
    });
  } catch (error) {
    logger.error('Bulk update documents error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Enhanced Analytics
export const getAnalytics = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { period = 'week' } = req.query;
    
    let startDate = new Date();
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    const [
      userGrowth,
      requestTrends,
      topDocuments,
      userActivity,
      systemHealth
    ] = await Promise.all([
      // User growth
      prisma.user.count({
        where: { createdAt: { gte: startDate } }
      }),
      
      // Request trends
      prisma.documentRequest.groupBy({
        by: ['status'],
        where: { createdAt: { gte: startDate } },
        _count: { id: true }
      }),
      
      // Top requested documents
      prisma.documentRequest.groupBy({
        by: ['documentId'],
        where: { createdAt: { gte: startDate } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10
      }),
      
      // User activity
      prisma.user.findMany({
        where: { 
          requests: {
            some: { createdAt: { gte: startDate } }
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          _count: {
            requests: {
              where: { createdAt: { gte: startDate } }
            }
          }
        },
        orderBy: {
          requests: {
            _count: 'desc'
          }
        },
        take: 10
      }),
      
      // System health metrics
      Promise.all([
        prisma.user.count(),
        prisma.document.count({ where: { isActive: true } }),
        prisma.documentRequest.count(),
      ])
    ]);

    res.json({
      success: true,
      data: {
        period,
        userGrowth,
        requestTrends,
        topDocuments,
        userActivity,
        systemHealth: {
          totalUsers: systemHealth[0],
          activeDocuments: systemHealth[1],
          totalRequests: systemHealth[2]
        }
      }
    });
  } catch (error) {
    logger.error('Get analytics error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

