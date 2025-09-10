import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import logger from '../utils/logger';
import { LocationType } from '@prisma/client';

// Get all locations with hierarchy
export const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, parentId, includeChildren = 'true' } = req.query;

    let whereClause: any = { isActive: true };
    
    if (type) {
      whereClause.type = type as LocationType;
    }
    
    if (parentId === 'null' || parentId === undefined) {
      whereClause.parentId = null;
    } else if (parentId) {
      whereClause.parentId = parentId as string;
    }

    const locations = await prisma.location.findMany({
      where: whereClause,
      include: {
        children: includeChildren === 'true' ? {
          where: { isActive: true },
          orderBy: { name: 'asc' },
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
      orderBy: { name: 'asc' },
    });

    res.json({
      success: true,
      data: locations,
    });
  } catch (error) {
    logger.error('Get locations error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get location tree (full hierarchy)
export const getLocationTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await prisma.location.findMany({
      where: {
        isActive: true,
      },
      include: {
        children: {
          where: { isActive: true },
          include: {
            children: {
              where: { isActive: true },
              orderBy: { name: 'asc' },
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
          orderBy: { name: 'asc' },
        },
        _count: {
          select: { documents: true }
        }
      },
      orderBy: { name: 'asc' },
    });

    // Filter to only root locations (countries)
    const rootLocations = locations.filter(loc => loc.parentId === null);

    res.json({
      success: true,
      data: rootLocations,
    });
  } catch (error) {
    logger.error('Get location tree error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get cities for quick filters
export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const cities = await prisma.location.findMany({
      where: {
        type: { in: [LocationType.CITY, LocationType.GOVERNORATE] },
        isActive: true,
      },
      include: {
        parent: {
          select: { name: true, nameAr: true }
        },
        _count: {
          select: { 
            documents: {
              where: { isActive: true }
            }
          }
        }
      },
      orderBy: [
        { type: 'asc' }, // Governorates first
        { population: 'desc' }, // Then by population
      ],
    });

    res.json({
      success: true,
      data: cities,
    });
  } catch (error) {
    logger.error('Get cities error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get location by ID with breadcrumb path
export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        parent: {
          include: {
            parent: true
          }
        },
        children: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
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

    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Location not found',
      });
      return;
    }

    // Build breadcrumb path
    const buildPath = (loc: any): any[] => {
      if (!loc.parent) return [loc];
      return [...buildPath(loc.parent), loc];
    };

    const breadcrumbPath = buildPath(location);

    res.json({
      success: true,
      data: {
        ...location,
        breadcrumbPath,
      },
    });
  } catch (error) {
    logger.error('Get location by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get locations for filters (with document counts)
export const getLocationsForFilter = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await prisma.location.findMany({
      where: {
        isActive: true,
        type: { in: [LocationType.GOVERNORATE, LocationType.CITY, LocationType.DISTRICT] }
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
        { type: 'asc' },
        { population: 'desc' },
        { name: 'asc' }
      ],
    });

    // Group by type for easier frontend consumption
    const groupedLocations = locations.reduce((acc: any, location: any) => {
      if (!acc[location.type]) {
        acc[location.type] = [];
      }
      acc[location.type].push(location);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        flat: locations,
        grouped: groupedLocations,
      },
    });
  } catch (error) {
    logger.error('Get locations for filter error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};