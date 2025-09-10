import prisma from '../utils/prisma';
import { LocationType } from '@prisma/client';

export class SeedService {
  static async seedLocations() {
    try {
      // Create Libya as the country - use findFirst/create pattern
      let libya = await prisma.location.findFirst({
        where: { name: 'Libya' },
      });
      
      if (!libya) {
        libya = await prisma.location.create({
          data: {
            name: 'Libya',
            nameAr: 'ليبيا',
            type: LocationType.COUNTRY,
            latitude: 26.3351,
            longitude: 17.2283,
            population: 6871000,
          },
        });
      }

      // Major Libyan Governorates
      const governorates = [
        { name: 'Tripoli', nameAr: 'طرابلس', lat: 32.8925, lng: 13.1802, pop: 1126000 },
        { name: 'Benghazi', nameAr: 'بنغازي', lat: 32.1195, lng: 20.0687, pop: 650629 },
        { name: 'Misrata', nameAr: 'مصراتة', lat: 32.3743, lng: 15.0919, pop: 550938 },
        { name: 'Bayda', nameAr: 'البيضاء', lat: 32.7569, lng: 21.7555, pop: 250000 },
        { name: 'Sabha', nameAr: 'سبها', lat: 27.0377, lng: 14.4283, pop: 130000 },
        { name: 'Al Zawiya', nameAr: 'الزاوية', lat: 32.7573, lng: 12.7277, pop: 200000 },
        { name: 'Ajdabiya', nameAr: 'أجدابيا', lat: 30.7554, lng: 20.2262, pop: 134400 },
        { name: 'Sirte', nameAr: 'سرت', lat: 31.2089, lng: 16.5887, pop: 128123 },
        { name: 'Tobruk', nameAr: 'طبرق', lat: 32.0840, lng: 23.9579, pop: 120000 },
        { name: 'Derna', nameAr: 'درنة', lat: 32.7674, lng: 22.6340, pop: 100000 },
      ];

      const createdGovernorates = [];
      for (const gov of governorates) {
        let governorate = await prisma.location.findFirst({
          where: { name: gov.name },
        });
        
        if (!governorate) {
          governorate = await prisma.location.create({
            data: {
              name: gov.name,
              nameAr: gov.nameAr,
              type: LocationType.GOVERNORATE,
              parentId: libya.id,
              latitude: gov.lat,
              longitude: gov.lng,
              population: gov.pop,
            },
          });
        }
        createdGovernorates.push(governorate);
      }

      // Add some districts for major cities
      const districts = [
        // Tripoli Districts
        { name: 'Tajoura', nameAr: 'تاجوراء', parent: 'Tripoli' },
        { name: 'Abu Salim', nameAr: 'أبو سليم', parent: 'Tripoli' },
        { name: 'Al-Andalus', nameAr: 'الأندلس', parent: 'Tripoli' },
        { name: 'Souq al-Juma', nameAr: 'سوق الجمعة', parent: 'Tripoli' },
        
        // Benghazi Districts
        { name: 'Al-Sabri', nameAr: 'الصابري', parent: 'Benghazi' },
        { name: 'Sidi Hussein', nameAr: 'سيدي حسين', parent: 'Benghazi' },
        { name: 'Al-Majouri', nameAr: 'الماجوري', parent: 'Benghazi' },
        
        // Misrata Districts
        { name: 'Al-Zarroug', nameAr: 'الزروق', parent: 'Misrata' },
        { name: 'Al-Ghiran', nameAr: 'الغيران', parent: 'Misrata' },
      ];

      for (const district of districts) {
        const parentGov = createdGovernorates.find(g => g.name === district.parent);
        if (parentGov) {
          const existingDistrict = await prisma.location.findFirst({
            where: { name: district.name },
          });
          
          if (!existingDistrict) {
            await prisma.location.create({
              data: {
                name: district.name,
                nameAr: district.nameAr,
                type: LocationType.DISTRICT,
                parentId: parentGov.id,
              },
            });
          }
        }
      }

      return { success: true, message: 'Locations seeded successfully' };
    } catch (error) {
      console.error('Error seeding locations:', error);
      return { success: false, error };
    }
  }

  static async seedCategories() {
    try {
      // Main Categories
      const mainCategories = [
        {
          name: 'Urban Planning Documents',
          nameAr: 'وثائق التخطيط العمراني',
          slug: 'urban-planning',
          icon: 'Building',
          color: '#3B82F6',
          description: 'Comprehensive urban planning documentation and guidelines',
        },
        {
          name: 'Legal Framework',
          nameAr: 'الإطار القانوني',
          slug: 'legal-framework',
          icon: 'Scale',
          color: '#DC2626',
          description: 'Laws, regulations, and legal documents',
        },
        {
          name: 'Environmental Studies',
          nameAr: 'الدراسات البيئية',
          slug: 'environmental-studies',
          icon: 'Leaf',
          color: '#059669',
          description: 'Environmental impact studies and sustainability reports',
        },
        {
          name: 'Infrastructure',
          nameAr: 'البنية التحتية',
          slug: 'infrastructure',
          icon: 'Road',
          color: '#7C2D12',
          description: 'Infrastructure development and management documents',
        },
        {
          name: 'Research & Studies',
          nameAr: 'البحوث والدراسات',
          slug: 'research-studies',
          icon: 'BookOpen',
          color: '#7C3AED',
          description: 'Academic research and analytical studies',
        },
        {
          name: 'Maps & GIS',
          nameAr: 'الخرائط ونظم المعلومات الجغرافية',
          slug: 'maps-gis',
          icon: 'Map',
          color: '#EA580C',
          description: 'Geographic information systems and mapping documents',
        },
      ];

      const createdMainCategories = [];
      for (const category of mainCategories) {
        const created = await prisma.category.upsert({
          where: { slug: category.slug },
          update: {},
          create: category,
        });
        createdMainCategories.push(created);
      }

      // Sub-categories
      const subCategories = [
        // Urban Planning sub-categories
        { name: 'Master Plans', nameAr: 'المخططات الهيكلية', slug: 'master-plans', parent: 'urban-planning' },
        { name: 'Zoning Regulations', nameAr: 'لوائح التقسيم', slug: 'zoning-regulations', parent: 'urban-planning' },
        { name: 'Building Codes', nameAr: 'أكواد البناء', slug: 'building-codes', parent: 'urban-planning' },
        { name: 'Development Guidelines', nameAr: 'إرشادات التطوير', slug: 'development-guidelines', parent: 'urban-planning' },
        
        // Legal Framework sub-categories
        { name: 'Planning Laws', nameAr: 'قوانين التخطيط', slug: 'planning-laws', parent: 'legal-framework' },
        { name: 'Building Regulations', nameAr: 'لوائح البناء', slug: 'building-regulations', parent: 'legal-framework' },
        { name: 'Environmental Laws', nameAr: 'القوانين البيئية', slug: 'environmental-laws', parent: 'legal-framework' },
        
        // Environmental sub-categories
        { name: 'EIA Reports', nameAr: 'تقارير تقييم الأثر البيئي', slug: 'eia-reports', parent: 'environmental-studies' },
        { name: 'Sustainability Plans', nameAr: 'خطط الاستدامة', slug: 'sustainability-plans', parent: 'environmental-studies' },
        { name: 'Climate Studies', nameAr: 'دراسات المناخ', slug: 'climate-studies', parent: 'environmental-studies' },
        
        // Infrastructure sub-categories
        { name: 'Transportation', nameAr: 'النقل والمواصلات', slug: 'transportation', parent: 'infrastructure' },
        { name: 'Utilities', nameAr: 'المرافق العامة', slug: 'utilities', parent: 'infrastructure' },
        { name: 'Housing Projects', nameAr: 'مشاريع الإسكان', slug: 'housing-projects', parent: 'infrastructure' },
        
        // Research sub-categories
        { name: 'Urban Studies', nameAr: 'الدراسات الحضرية', slug: 'urban-studies', parent: 'research-studies' },
        { name: 'Demographics', nameAr: 'الدراسات الديموغرافية', slug: 'demographics', parent: 'research-studies' },
        { name: 'Economic Analysis', nameAr: 'التحليل الاقتصادي', slug: 'economic-analysis', parent: 'research-studies' },
        
        // Maps & GIS sub-categories
        { name: 'Land Use Maps', nameAr: 'خرائط استخدام الأراضي', slug: 'land-use-maps', parent: 'maps-gis' },
        { name: 'Satellite Imagery', nameAr: 'صور الأقمار الصناعية', slug: 'satellite-imagery', parent: 'maps-gis' },
        { name: 'Survey Data', nameAr: 'بيانات المسح', slug: 'survey-data', parent: 'maps-gis' },
      ];

      for (const subCategory of subCategories) {
        const parentCategory = createdMainCategories.find(c => c.slug === subCategory.parent);
        if (parentCategory) {
          await prisma.category.upsert({
            where: { slug: subCategory.slug },
            update: {},
            create: {
              name: subCategory.name,
              nameAr: subCategory.nameAr,
              slug: subCategory.slug,
              parentId: parentCategory.id,
              icon: 'Folder',
              color: parentCategory.color,
            },
          });
        }
      }

      return { success: true, message: 'Categories seeded successfully' };
    } catch (error) {
      console.error('Error seeding categories:', error);
      return { success: false, error };
    }
  }

  static async seedAll() {
    const locationResult = await this.seedLocations();
    const categoryResult = await this.seedCategories();
    
    return {
      locations: locationResult,
      categories: categoryResult,
    };
  }
}