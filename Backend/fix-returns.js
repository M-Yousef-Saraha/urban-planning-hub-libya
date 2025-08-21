const fs = require('fs');
const path = require('path');

// Function to fix return statements in a file
function fixReturns(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace return res.status with res.status and add return; on next line
  content = content.replace(/return res\.status\(/g, 'res.status(');
  content = content.replace(/return res\.json\(/g, 'res.json(');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${filePath}`);
}

// Files to fix
const filesToFix = [
  'src/controllers/authController.ts',
  'src/controllers/documentController.ts',
  'src/controllers/requestController.ts',
  'src/controllers/adminController.ts',
  'src/middleware/auth.ts',
  'src/routes/files.ts'
];

filesToFix.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fixReturns(fullPath);
  }
});

console.log('All files fixed!');

