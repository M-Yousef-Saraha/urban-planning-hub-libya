import express from 'express';
import {
  getCategories,
  getCategoryTree,
  getCategoryBySlug,
  getCategoriesForFilter,
} from '../controllers/categoryController';

const router = express.Router();

// GET /api/categories - Get categories with optional hierarchy
router.get('/', getCategories);

// GET /api/categories/tree - Get full category tree
router.get('/tree', getCategoryTree);

// GET /api/categories/filter - Get categories for filtering with document counts
router.get('/filter', getCategoriesForFilter);

// GET /api/categories/:slug - Get category by slug with breadcrumb path
router.get('/:slug', getCategoryBySlug);

export default router;