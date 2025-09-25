import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Building2, Map as MapIcon } from 'lucide-react';

// Data model for a branch office (فرع) and its subordinate planning offices (مكاتب التخطيط)
interface PlanningOffice {
  name: string;
  coverage: string[]; // مناطق أو أحياء تحت نطاق عمل المكتب
  note?: string;
}

interface RegionalBranch {
  branchName: string; // اسم الفرع (مثلاً فرع طرابلس)
  jurisdiction: string; // نطاق عمل الفرع (مثلاً بلدية طرابلس)
  offices: PlanningOffice[];
}

// فرع طرابلس وفق البيانات المرسلة
const tripoliBranch: RegionalBranch[] = [
  {
    branchName: 'فرع طرابلس',
    jurisdiction: 'بلدية طرابلس',
    offices: [
      {
        name: 'طرابلس المدينة',
        coverage: ['فشلوم', 'الظهرة', 'المنشية', 'المسيرة الكبرى', 'الميدان']
      },
      {
        name: 'حي الأندلس (المقر حي الأندلس)',
        coverage: ['الشارع الغربي', 'الكرامة', 'الحي الصناعي', 'غوط الشعال', '2 مارس', 'غوط الديس', 'حي الأندلس', 'قرقارش', 'السياحية']
      },
      {
        name: 'أبوسليم (المقر أبوسليم)',
        coverage: ['أبوسليم', 'الإعتاق', 'الهضبة', 'باب عكارة', 'باب بن غشير', 'حي دمشق', 'سيدي سليم', 'المشروع الزراعي']
      },
      {
        name: 'سوق الجمعة (المقر سوق الجمعة)',
        coverage: ['سوق الجمعة']
      },
      {
        name: 'عين زارة (المقر عين زارة)',
        coverage: ['عين زارة', 'الحي الجامعي', 'القدس', 'شهداء عين زارة الشمالي']
      },
      {
        name: 'تاجوراء (المقر تاجوراء)',
        coverage: ['عقبة بن نافع', 'تاجوراء المدينة', 'شهداء تاجوراء', 'تاجوراء الجنوبي', 'شهداء عين زارة', 'عين زارة الجنوبية']
      },
      {
        name: 'جنزور (المقر جنزور)',
        coverage: ['الغيران الشرقية', 'سيدي عبد الجليل', 'جنزور المدينة', 'سيدي عبداللطيف', 'صياد', 'جنزور الوسط', 'حي المجاهد', 'الحشان']
      }
    ]
  },
  {
    branchName: 'فرع طرابلس - نطاق الجفارة',
    jurisdiction: 'الجفارة',
    offices: [
      {
        name: 'السواني (المقر السواني)',
        coverage: ['السواني المدينة', 'سواني بني آدم', 'السواني الكريمية']
      },
      {
        name: 'العزيزية (المقر العزيزية)',
        coverage: ['العزيزية']
      },
      {
        name: 'قصر بن غشير (المقر بن غشير)',
        coverage: ['قصر بن غشير', 'سيدي السائح', 'سوق الخميس', 'العواتة', 'السبيعة']
      },
      {
        name: 'الزهراء (المقر الزهراء)',
        coverage: ['الزهراء المدينة', 'الغربية', 'الناصرية', 'الشرقية', 'المعمورة']
      }
    ]
  }
];

// قائمة الفروع الأخرى (بدون تفاصيل حالياً)
const otherBranches = [
  'فرع البطنان',
  'فرع الجبل الأخضر',
  'فرع الجبل الغربي',
  'فرع الجفرة',
  'فرع الزاوية',
  'فرع المرقب',
  'فرع الواحات',
  'فرع بتغازي',
  'فرع سبها',
  'فرع طبرق',
  'فرع مصراته'
];

const Branches: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      <main className="flex-1 pt-32 md:pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-primary/10 rounded-full px-6 py-2 mb-6 ring-1 ring-primary/20">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">فروعنا</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">مكاتب و فروع الهيئة</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              اكتشف مواقع فروع الهيئة الوطنية للتخطيط العمراني في مختلف المدن الليبية والتواصل مع أقرب مكتب إليك.
            </p>
          </div>

          {/* Tripoli Branch Structured Data */}
          <div className="space-y-16">
            {tripoliBranch.map(section => (
              <div key={section.branchName} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.branchName}</h2>
                    <p className="text-sm text-primary font-medium mt-1 flex items-center gap-2">
                      <MapIcon className="w-4 h-4" /> نطاق العمل: {section.jurisdiction}
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr className="text-right">
                        <th className="p-4 font-semibold w-1/3">مكتب التخطيط</th>
                        <th className="p-4 font-semibold">نطاق عمل المكتب</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {section.offices.map(office => (
                        <tr key={office.name} className="align-top hover:bg-gray-50/80">
                          <td className="p-4 font-medium text-gray-900 text-sm w-1/3">
                            {office.name}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                              {office.coverage.map(area => (
                                <span key={area} className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Other Branches Placeholder */}
          <div className="mt-24">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">الفروع الأخرى</h2>
            <div className="flex flex-wrap gap-3">
              {otherBranches.map(b => (
                <span key={b} className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 text-sm hover:border-primary/30 hover:shadow transition-colors">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-20 max-w-3xl mx-auto text-center">
            <p className="text-gray-500 leading-relaxed text-sm">
              سيتم تحديث الصفحة تباعاً بإضافة تفاصيل الفروع الأخرى حال توفر البيانات الرسمية.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Branches;
