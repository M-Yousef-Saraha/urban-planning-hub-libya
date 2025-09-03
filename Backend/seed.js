const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Hash the password properly
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'TempAdmin2024!', 12);
  
  await prisma.user.create({
    data: {
  name: 'Admin User',
  email: 'admin@urbanplanninghub.ly',
  password: hashedPassword,
  role: 'ADMIN',
    },
  });
  // Add sample documents for development
  const existingDocs = await prisma.document.findMany({ take: 1 });
  if (existingDocs.length === 0) {
    await prisma.document.createMany({
      data: [
        {
          title: 'دليل التخطيط العمراني - الإصدار الأول',
          description: 'دليل إرشادي حول التخطيط العمراني الحديث',
          category: 'GUIDES',
          filePath: '/lovable-uploads/926954d9-d0f5-4d6a-9a97-ec24b5fdf369.png',
          fileName: 'urban-planning-guide.pdf',
          fileSize: 1024000,
          mimeType: 'application/pdf'
        },
        {
          title: 'قوانين البناء والإنشاء',
          description: 'قوانين تنظيم البناء والاشتراطات',
          category: 'LAWS',
          filePath: '/lovable-uploads/sample-law.pdf',
          fileName: 'building-laws.pdf',
          fileSize: 2048000,
          mimeType: 'application/pdf'
        }
      ]
    });
  }
  // Database seeded successfully
}

main()
  .catch(e => { throw new Error('Database seed failed: ' + e.message); })
  .finally(async () => await prisma.$disconnect());