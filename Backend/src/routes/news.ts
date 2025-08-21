import express from 'express';
import {
  listNews,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Public list
router.get('/', listNews);

// Admin CRUD
router.use(authenticate);
router.use(authorize('ADMIN'));
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
