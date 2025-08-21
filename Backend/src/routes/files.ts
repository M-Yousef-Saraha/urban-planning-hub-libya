import express from 'express';
import path from 'path';
import fs from 'fs';
import { authenticate, authorize } from '../middleware/auth';
import prisma from '../utils/prisma';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}
const downloadsLog = path.join(logsDir, 'downloads.jsonl');

const router = express.Router();

// Serve uploaded files
router.get('/:filename', async (req, res): Promise<void> => {
  try {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        error: 'File not found',
      });
      return;
    }

    // Get file stats
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    // Set appropriate headers
    res.setHeader('Content-Length', fileSize);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream the file and log the download
    const fileStream = fs.createReadStream(filePath);
    // Find document metadata if available
    try {
      const doc = await prisma.document.findFirst({ where: { fileName: filename } });
      const logEntry = {
        timestamp: new Date().toISOString(),
        filename,
        documentId: doc?.id || null,
        documentTitle: doc?.title || null,
        remoteAddr: req.ip || req.connection.remoteAddress || null,
        userAgent: req.headers['user-agent'] || null,
      };
      fs.appendFileSync(downloadsLog, JSON.stringify(logEntry) + '\n');
    } catch (err) {
      console.error('Failed to log download:', err);
    }

    fileStream.pipe(res);
  } catch (error) {
    console.error('File serve error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// Delete uploaded file (admin only)
router.delete('/:filename', authenticate, authorize('ADMIN'), (req, res): void => {
  try {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('File delete error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router;

