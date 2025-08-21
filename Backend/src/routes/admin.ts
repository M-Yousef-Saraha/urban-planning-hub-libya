import express from 'express';
import { body } from 'express-validator';
import {
  getAllRequests,
  updateRequestStatus,
  getRequestStats,
  getDocumentStats,
  getDownloads,
} from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Validation rules
const updateRequestStatusValidation = [
  body('status')
    .isIn(['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'])
    .withMessage('Invalid status'),
  body('adminNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Admin notes must not exceed 1000 characters'),
];

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

// Routes
router.get('/requests', getAllRequests);
router.put('/requests/:id/status', updateRequestStatusValidation, updateRequestStatus);
router.get('/stats/requests', getRequestStats);
router.get('/stats/documents', getDocumentStats);
router.get('/downloads', getDownloads);

export default router;

