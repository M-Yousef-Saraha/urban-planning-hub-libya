const fs = require('fs');
const path = require('path');

// Function to fix type issues in auth controller
function fixAuthController() {
  const filePath = path.join(__dirname, 'src/controllers/authController.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix user null checks
  content = content.replace(
    /if \(!user\) \{\s*res\.status\(401\)\.json\(\{\s*success: false,\s*error: 'Invalid credentials',\s*\}\);\s*return;\s*\}/g,
    `if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
      return;
    }`
  );
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed auth controller');
}

// Function to fix middleware
function fixMiddleware() {
  const filePath = path.join(__dirname, 'src/middleware/auth.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix JWT verification
  content = content.replace(
    'const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;',
    'const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;'
  );
  
  // Fix user assignment
  content = content.replace(
    'req.user = user;',
    'req.user = user as any;'
  );
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed middleware');
}

// Function to fix document controller
function fixDocumentController() {
  const filePath = path.join(__dirname, 'src/controllers/documentController.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix file destructuring
  content = content.replace(
    'const { filename, size, mimetype, path } = req.file;',
    'const { filename, size, mimetype, path } = req.file as any;'
  );
  
  // Also fix the update function
  content = content.replace(
    'const { filename, size, mimetype, path } = req.file;',
    'const { filename, size, mimetype, path } = req.file as any;'
  );
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed document controller');
}

fixAuthController();
fixMiddleware();
fixDocumentController();
console.log('All type issues fixed!');

