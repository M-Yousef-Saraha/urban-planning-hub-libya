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
import {
  approveRequest,
  rejectRequest,
  getRequestDetails,
} from '../controllers/requestController';
import {
  generateDownloadLink,
} from '../controllers/downloadController';
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

const approveRequestValidation = [
  body('adminNotes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Admin notes must not exceed 500 characters'),
];

const rejectRequestValidation = [
  body('adminNotes')
    .notEmpty()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Rejection reason is required and must be between 10-500 characters'),
];

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

// Routes

// Request Management
router.get('/requests', getAllRequests);
router.get('/requests/:id', getRequestDetails);
router.put('/requests/:id/status', updateRequestStatusValidation, updateRequestStatus);
router.put('/requests/:id/approve', approveRequestValidation, approveRequest);
router.put('/requests/:id/reject', rejectRequestValidation, rejectRequest);
router.post('/requests/:id/download-link', generateDownloadLink);
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

