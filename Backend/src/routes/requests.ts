import express from 'express';
import { body } from 'express-validator';
import {
  createRequest,
  getUserRequests,
  getRequest,
  cancelRequest,
} from '../controllers/requestController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Validation rules
const createRequestValidation = [
  body('documentId')
    .notEmpty()
    .withMessage('Document ID is required'),
  body('purpose')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Purpose must be between 10 and 500 characters'),
  body('urgency')
    .isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
    .withMessage('Invalid urgency level'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes must not exceed 1000 characters'),
];

// All routes require authentication
router.use(authenticate);

// Routes
router.post('/', createRequestValidation, createRequest);
router.get('/', getUserRequests);
router.get('/:id', getRequest);
router.put('/:id/cancel', cancelRequest);

export default router;

