import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import path from 'path';
import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../controllers/documentController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Allow common document types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only documents and images are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
  },
});

// Validation rules
const createDocumentValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('category')
    .isIn(['GUIDES', 'LAWS', 'STANDARDS', 'REPORTS', 'MAPS', 'STUDIES'])
    .withMessage('Invalid category'),
];

const updateDocumentValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('category')
    .isIn(['GUIDES', 'LAWS', 'STANDARDS', 'REPORTS', 'MAPS', 'STUDIES'])
    .withMessage('Invalid category'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
];

// Public routes
router.get('/', getDocuments);
router.get('/:id', getDocument);

// Admin only routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  upload.single('file'),
  createDocumentValidation,
  createDocument
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  upload.single('file'),
  updateDocumentValidation,
  updateDocument
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  deleteDocument
);

export default router;

