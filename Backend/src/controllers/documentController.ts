import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import logger from '../utils/logger';

export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = { isActive: true };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy as string] = sortOrder;

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          fileName: true,
          fileSize: true,
          mimeType: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.document.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        documents,
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
    logger.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const getDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findFirst({
      where: { id, isActive: true },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        fileName: true,
        fileSize: true,
        mimeType: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!document) {
      res.status(404).json({
        success: false,
        error: 'Document not found',
      });
    }

    res.json({
      success: true,
      data: document,
    });
  } catch (error) {
    logger.error('Get document by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const createDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
      return;
    }

    const { title, description, category, categoryId, locationId, tags, keywords } = req.body;
    const { filename, size, mimetype, path } = req.file as any;

    // Parse arrays if they're JSON strings
    let parsedTags = [];
    let parsedKeywords = [];
    
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags = [];
      }
    }
    
    if (keywords) {
      try {
        parsedKeywords = typeof keywords === 'string' ? JSON.parse(keywords) : keywords;
      } catch (e) {
        parsedKeywords = [];
      }
    }

    // Determine which category system to use
    let finalCategory = category;
    if (categoryId && !category) {
      // If hierarchical category is provided but legacy isn't, use a default legacy value
      finalCategory = 'GUIDES'; // Default fallback
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        category: finalCategory,
        categoryId: categoryId || null,
        locationId: locationId || null,
        tags: parsedTags,
        keywords: parsedKeywords,
        fileName: filename,
        filePath: path,
        fileSize: size,
        mimeType: mimetype,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        categoryId: true,
        locationId: true,
        tags: true,
        keywords: true,
        fileName: true,
        fileSize: true,
        mimeType: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      data: document,
    });
  } catch (error) {
    logger.error('Create document error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const updateDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { title, description, category, isActive } = req.body;

    const existingDocument = await prisma.document.findUnique({
      where: { id },
    });

    if (!existingDocument) {
      res.status(404).json({
        success: false,
        error: 'Document not found',
      });
    }

    const updateData: any = { title, description, category };
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    }

    // Handle file update if new file is uploaded
    if (req.file) {
      const { filename, size, mimetype, path } = req.file as any;
      updateData.fileName = filename;
      updateData.filePath = path;
      updateData.fileSize = size;
      updateData.mimeType = mimetype;
    }

    const document = await prisma.document.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        fileName: true,
        fileSize: true,
        mimeType: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      data: document,
    });
  } catch (error) {
    logger.error('Update document error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      res.status(404).json({
        success: false,
        error: 'Document not found',
      });
    }

    // Soft delete by setting isActive to false
    await prisma.document.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    logger.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get hierarchical categories from the database
    const hierarchicalCategories = await prisma.category.findMany({
      where: {
        isActive: true,
        parentId: null, // Root categories only
      },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            _count: {
              select: { documents: true }
            }
          }
        },
        _count: {
          select: { documents: true }
        }
      },
      orderBy: { sortOrder: 'asc' },
    });

    // Also provide legacy categories for backward compatibility
    const legacyCategories = [
      { value: 'GUIDES', label: 'أدلة / Guides' },
      { value: 'LAWS', label: 'قوانين / Laws' },
      { value: 'STANDARDS', label: 'معايير / Standards' },
      { value: 'REPORTS', label: 'تقارير / Reports' },
      { value: 'MAPS', label: 'خرائط / Maps' },
      { value: 'STUDIES', label: 'دراسات / Studies' },
    ];

    res.json({
      success: true,
      data: {
        legacy: legacyCategories,
        hierarchical: hierarchicalCategories,
        // Default to hierarchical if available, fallback to legacy
        categories: hierarchicalCategories.length > 0 ? hierarchicalCategories : legacyCategories
      },
    });
  } catch (error) {
    logger.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

