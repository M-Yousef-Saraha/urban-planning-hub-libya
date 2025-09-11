import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import logger from '../utils/logger';

// Get all categories with hierarchy
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { includeChildren = 'true', parentId } = req.query;

    let categories;
    
    if (parentId === 'null' || parentId === undefined) {
      // Get root categories
      categories = await prisma.category.findMany({
        where: {
          parentId: null,
          isActive: true,
        },
        include: {
          children: includeChildren === 'true' ? {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
              _count: {
                select: { documents: true }
              }
            }
          } : false,
          _count: {
            select: { documents: true }
          }
        },
        orderBy: { sortOrder: 'asc' },
      });
    } else {
      // Get specific category with children
      categories = await prisma.category.findMany({
        where: {
          parentId: parentId as string,
          isActive: true,
        },
        include: {
          children: includeChildren === 'true' ? {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
              _count: {
                select: { documents: true }
              }
            }
          } : false,
          _count: {
            select: { documents: true }
          }
        },
        orderBy: { sortOrder: 'asc' },
      });
    }

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    logger.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get category tree (full hierarchy)
export const getCategoryTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      include: {
        children: {
          where: { isActive: true },
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
        },
        _count: {
          select: { documents: true }
        }
      },
      orderBy: { sortOrder: 'asc' },
    });

    // Filter to only root categories (they include their children)
    const rootCategories = categories.filter(cat => cat.parentId === null);

    res.json({
      success: true,
      data: rootCategories,
    });
  } catch (error) {
    logger.error('Get category tree error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get category by slug with full path
export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        parent: {
          include: {
            parent: true
          }
        },
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
    });

    if (!category) {
      res.status(404).json({
        success: false,
        error: 'Category not found',
      });
      return;
    }

    // Build breadcrumb path
    const buildPath = (cat: any): any[] => {
      if (!cat.parent) return [cat];
      return [...buildPath(cat.parent), cat];
    };

    const breadcrumbPath = buildPath(category);

    res.json({
      success: true,
      data: {
        ...category,
        breadcrumbPath,
      },
    });
  } catch (error) {
    logger.error('Get category by slug error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get categories with document counts for filters (consolidated)
export const getCategoriesForFilter = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: { 
            documents: {
              where: { isActive: true }
            }
          }
        }
      },
      orderBy: [
        { parentId: 'asc' }, // Parents first
        { sortOrder: 'asc' }
      ],
    });

    // Organize into hierarchy for easier frontend consumption
    const categoryMap = new Map();
    const rootCategories: any[] = [];

    // First pass: create map and identify roots
    categories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [] });
      if (!cat.parentId) {
        rootCategories.push(categoryMap.get(cat.id));
      }
    });

    // Second pass: build hierarchy
    categories.forEach(cat => {
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children.push(categoryMap.get(cat.id));
        }
      }
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
        flat: categories,
        hierarchical: rootCategories,
        legacy: legacyCategories,
        // Default to hierarchical if available, fallback to legacy
        categories: rootCategories.length > 0 ? rootCategories : legacyCategories
      },
    });
  } catch (error) {
    logger.error('Get categories for filter error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};