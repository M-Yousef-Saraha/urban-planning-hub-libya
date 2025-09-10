import express from 'express';
import { body } from 'express-validator';
import {
  getAllRequests,
  updateRequestStatus,
  getRequestStats,
  getDocumentStats,
  getDownloads,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getSystemSettings,
  updateSystemSettings,
  getMediaFiles,
  deleteMediaFile,
  bulkUpdateRequests,
  bulkUpdateDocuments,
  getAnalytics,
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

const updateUserRoleValidation = [
  body('role')
    .isIn(['USER', 'ADMIN'])
    .withMessage('Invalid role'),
];

const bulkUpdateValidation = [
  body('requestIds')
    .optional()
    .isArray()
    .withMessage('Request IDs must be an array'),
  body('documentIds')
    .optional()
    .isArray()
    .withMessage('Document IDs must be an array'),
  body('action')
    .notEmpty()
    .withMessage('Action is required'),
];

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

// Routes

// Request Management
router.get('/requests', getAllRequests);
router.put('/requests/:id/status', updateRequestStatusValidation, updateRequestStatus);
router.put('/requests/bulk', bulkUpdateValidation, bulkUpdateRequests);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRoleValidation, updateUserRole);
router.put('/users/:id/toggle-status', toggleUserStatus);

// Document Management
router.put('/documents/bulk', bulkUpdateValidation, bulkUpdateDocuments);

// Media Management
router.get('/media', getMediaFiles);
router.delete('/media/:filename', deleteMediaFile);

// System Settings
router.get('/settings', getSystemSettings);
router.put('/settings', updateSystemSettings);

// Statistics and Analytics
router.get('/stats/requests', getRequestStats);
router.get('/stats/documents', getDocumentStats);
router.get('/analytics', getAnalytics);

// Downloads
router.get('/downloads', getDownloads);

export default router;

