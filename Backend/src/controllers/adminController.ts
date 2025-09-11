import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import prisma from '../utils/prisma';
import { emailService } from '../services/emailService';
import logger from '../utils/logger';
import bcrypt from 'bcryptjs';

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

// Consolidated admin request approval function
export const approveRequest = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { adminNotes } = req.body;
    const adminId = req.user!.id;

    // Check if request exists and is pending
    const request = await prisma.documentRequest.findFirst({
      where: { id, status: 'PENDING' },
      include: {
        user: { select: { name: true, email: true } },
        document: { select: { title: true, filePath: true, fileName: true } },
      },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found or already processed',
      });
    }

    // Calculate expiry time (2 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);

    // Update request status
    const updatedRequest = await prisma.documentRequest.update({
      where: { id },
      data: {
        status: 'APPROVED',
        adminNotes: adminNotes || null,
        approvedBy: adminId,
        processedAt: new Date(),
        expiresAt,
      },
      include: {
        user: { select: { name: true, email: true } },
        document: { select: { title: true, filePath: true, fileName: true } },
      },
    });

    // Generate secure download token
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    await prisma.downloadToken.create({
      data: {
        requestId: id,
        token,
        expiresAt,
      },
    });

    logger.info(`Request ${id} approved by admin ${adminId}`);

    return res.json({
      success: true,
      data: {
        request: updatedRequest,
        downloadToken: token,
        expiresAt,
      },
      message: 'Request approved successfully',
    });
  } catch (error) {
    logger.error('Approve request error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Consolidated admin request rejection function
export const rejectRequest = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { adminNotes } = req.body;
    const adminId = req.user!.id;

    if (!adminNotes || adminNotes.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Rejection reason is required',
      });
    }

    // Check if request exists and is pending
    const request = await prisma.documentRequest.findFirst({
      where: { id, status: 'PENDING' },
      include: {
        user: { select: { name: true, email: true } },
        document: { select: { title: true } },
      },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found or already processed',
      });
    }

    // Update request status
    const updatedRequest = await prisma.documentRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
        adminNotes: adminNotes.trim(),
        approvedBy: adminId,
        processedAt: new Date(),
      },
      include: {
        user: { select: { name: true, email: true } },
        document: { select: { title: true } },
      },
    });

    logger.info(`Request ${id} rejected by admin ${adminId}`);

    return res.json({
      success: true,
      data: updatedRequest,
      message: 'Request rejected successfully',
    });
  } catch (error) {
    logger.error('Reject request error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Secure admin-only user creation (does NOT return tokens)
export const createUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, phone, password, role = 'USER' } = req.body;
    const adminId = req.user!.id;

    // Validate role assignment
    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role specified',
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user (NO token generation)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    logger.info(`User ${user.email} created by admin ${adminId} with role ${role}`);

    // Return user data WITHOUT token for security
    return res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully',
    });
  } catch (error) {
    logger.error('Admin create user error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error during user creation',
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
          createdAt: true
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
      
      // User activity - simplified since we don't have count functionality
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
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

