import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import config from './config';
import rateLimit from 'express-rate-limit';
import path from 'path';
import logger, { morganStream } from './utils/logger';

// Import routes
import authRoutes from './routes/auth';
import documentRoutes from './routes/documents';
import requestRoutes from './routes/requests';
import adminRoutes from './routes/admin';
import fileRoutes from './routes/files';
import newsRoutes from './routes/news';
import categoryRoutes from './routes/categories';
import locationRoutes from './routes/locations';
import seedRoutes from './routes/seed';
import { secureDownload } from './controllers/downloadController';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Load environment variables via config
// config will throw if required env vars are missing
const app = express();
const PORT = config.PORT;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true,
}));
app.use(morgan('combined', { stream: morganStream }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Urban Planning Hub Libya API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/seed', seedRoutes);

// Secure download endpoint (public, token-based authentication)
app.get('/api/download/:token', secureDownload);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📚 Urban Planning Hub Libya API`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

