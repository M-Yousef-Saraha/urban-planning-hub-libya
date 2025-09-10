import express from 'express';
import { SeedService } from '../services/seedService';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// POST /api/seed/all - Seed all data (admin only)
router.post('/all', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    const result = await SeedService.seedAll();
    res.json({
      success: true,
      data: result,
      message: 'Database seeded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to seed database',
      details: error
    });
  }
});

// POST /api/seed/locations - Seed locations only
router.post('/locations', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    const result = await SeedService.seedLocations();
    res.json({
      success: true,
      data: result,
      message: 'Locations seeded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to seed locations',
      details: error
    });
  }
});

// POST /api/seed/categories - Seed categories only
router.post('/categories', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    const result = await SeedService.seedCategories();
    res.json({
      success: true,
      data: result,
      message: 'Categories seeded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to seed categories',
      details: error
    });
  }
});

export default router;