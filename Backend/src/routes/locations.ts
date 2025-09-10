import express from 'express';
import {
  getLocations,
  getLocationTree,
  getCities,
  getLocationById,
  getLocationsForFilter,
} from '../controllers/locationController';

const router = express.Router();

// GET /api/locations - Get locations with optional hierarchy and filtering
router.get('/', getLocations);

// GET /api/locations/tree - Get full location tree
router.get('/tree', getLocationTree);

// GET /api/locations/cities - Get cities and governorates for quick access
router.get('/cities', getCities);

// GET /api/locations/filter - Get locations for filtering with document counts
router.get('/filter', getLocationsForFilter);

// GET /api/locations/:id - Get location by ID with breadcrumb path
router.get('/:id', getLocationById);

export default router;