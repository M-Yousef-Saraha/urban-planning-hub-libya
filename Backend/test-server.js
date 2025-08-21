const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Urban Planning Hub Libya API is running',
    timestamp: new Date().toISOString(),
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working correctly',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Test server is running on port ${PORT}`);
  console.log(`📚 Urban Planning Hub Libya API Test`);
  console.log(`🌍 Environment: test`);
});

// Graceful shutdown after 10 seconds
setTimeout(() => {
  console.log('✅ Test server is working correctly');
  process.exit(0);
}, 5000);

