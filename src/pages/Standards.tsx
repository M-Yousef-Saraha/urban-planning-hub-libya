import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';

// Article-style standards page (RTL-first) using site's neutral theme.
// Content sourced from "Urban standers.txt" (summarized with key tables/sections).

const Standards: React.FC = () => {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="bg-white header-safe-padding py-10 border-b border-gray-200">
        <PageContainer withHeaderSpacing={false} className="max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">معايير التخطيط العمراني</h1>
          <p className="text-gray-600">دليل شامل لمعايير التخطيط العمراني في ليبيا</p>
        </PageContainer>
      </section>

      {/* Article Content */}
  <PageContainer className="max-w-5xl" withHeaderSpacing={false}>
        {/* Introduction */}
        <section aria-labelledby="intro-title" className="prose prose-gray max-w-none rtl:prose-p:text-right">
          <h2 id="intro-title" className="text-2xl font-bold text-gray-900 mb-3">المقدمة</h2>
          <p>
            تُعد معايير التخطيط العمراني أدوات أساسية لإعداد وتنفيذ خطط التنمية الحضرية. تعمل هذه المعايير كدليل إرشادي لمساعدة السلطات والمخططين في عدة مجالات رئيسية:
          </p>
          <ul className="list-disc pr-6 space-y-1 text-gray-700">
            <li>إعداد برامج وخطط التطوير: وضع إطار عمل لمشاريع التنمية المستقبلية.</li>
            <li>تحسين مستوى المعيشة: رفع جودة الحياة في جميع التجمعات السكنية.</li>
            <li>تطوير التجمعات السكانية: الارتقاء بالإسكان والمرافق الاجتماعية والبنية التحتية الفنية وفقًا لاحتياجات المواطنين.</li>
            <li>توفير خدمات متساوية: ضمان وصول جميع المواطنين إلى المرافق والخدمات الأساسية بشكل عادل في كافة أنحاء البلاد.</li>
            <li>تقليل الفوارق: الحد من الاختلافات غير المقبولة في معايير الإسكان والخدمات الأساسية الأخرى بين مناطق البلاد.</li>
            <li>تخطيط استخدام الأراضي: تقدير احتياجات الأراضي اللازمة لتوفير الخدمات بمعايير مقبولة على المدى الطويل والمحافظة عليها.</li>
          </ul>
          <p className="mt-3">
            ينقسم هذا الدليل إلى جزأين. يقدم الجزء الأول معلومات عامة عن حجم السكان والكثافة السكانية في أقاليم ليبيا الأربعة حتى عام 2000، بينما يقدم الجزء الثاني معايير التخطيط المقترحة.
          </p>
        </section>

        {/* Part 1: General Information */}
        <section className="mt-10" aria-labelledby="part1-title">
          <h2 id="part1-title" className="text-2xl font-bold text-gray-900 mb-4">الجزء الأول: معلومات عامة</h2>

          {/* Population size table */}
          <article className="mb-8" aria-labelledby="pop-title">
            <h3 id="pop-title" className="text-xl font-bold text-gray-900 mb-3">1) حجم السكان</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-right border-b">المؤشر</th>
                    <th className="px-3 py-2 text-right border-b">إقليم طرابلس</th>
                    <th className="px-3 py-2 text-right border-b">إقليم بنغازي</th>
                    <th className="px-3 py-2 text-right border-b">إقليم الخليج</th>
                    <th className="px-3 py-2 text-right border-b">إقليم سبها</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">متوسط حجم الأسرة</td><td className="px-3 py-2 border-b">5.5</td><td className="px-3 py-2 border-b">5.34</td><td className="px-3 py-2 border-b">5.5</td><td className="px-3 py-2 border-b">5.5</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">متوسط معدل النمو السنوي (1980-2000)</td><td className="px-3 py-2 border-b">3.8%</td><td className="px-3 py-2 border-b">3.94%</td><td className="px-3 py-2 border-b">4.0%</td><td className="px-3 py-2 border-b">3.09% - 3.13%</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">إجمالي عدد السكان المتوقع</td><td className="px-3 py-2 border-b">3,700,000</td><td className="px-3 py-2 border-b">1,042,000</td><td className="px-3 py-2 border-b">393,000</td><td className="px-3 py-2 border-b">334,500 - 366,500</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">المواطنون الليبيون</td><td className="px-3 py-2 border-b">3,550,000</td><td className="px-3 py-2 border-b">1,000,000</td><td className="px-3 py-2 border-b">328,000</td><td className="px-3 py-2 border-b">311,000 - 341,000</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">المقيمون غير الليبيين</td><td className="px-3 py-2 border-b">150,000</td><td className="px-3 py-2 border-b">42,000</td><td className="px-3 py-2 border-b">64,500</td><td className="px-3 py-2 border-b">23,500 - 25,500</td></tr>
                </tbody>
              </table>
            </div>
          </article>

          {/* Age groups table */}
          <article className="mb-8" aria-labelledby="age-title">
            <h3 id="age-title" className="text-xl font-bold text-gray-900 mb-3">2) السكان حسب الفئات العمرية</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-right border-b">الفئة العمرية</th>
                    <th className="px-3 py-2 text-right border-b">إقليم طرابلس (%)</th>
                    <th className="px-3 py-2 text-right border-b">إقليم بنغازي والخليج (%)</th>
                    <th className="px-3 py-2 text-right border-b">إقليم سبها (%)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">0-5 سنوات</td><td className="px-3 py-2 border-b">22.15%</td><td className="px-3 py-2 border-b">17.38%</td><td className="px-3 py-2 border-b">21.0% - 24.4%</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">6-11 سنة</td><td className="px-3 py-2 border-b">18.85%</td><td className="px-3 py-2 border-b">16.1%</td><td className="px-3 py-2 border-b">19.0%</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">12-14 سنة</td><td className="px-3 py-2 border-b">7.60%</td><td className="px-3 py-2 border-b">12.5%</td><td className="px-3 py-2 border-b">8.0%</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">15-17 سنة</td><td className="px-3 py-2 border-b">4.80%</td><td className="px-3 py-2 border-b">11.0%</td><td className="px-3 py-2 border-b">41.4% - 44.0%</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">18-65 سنة</td><td className="px-3 py-2 border-b">43.4%</td><td className="px-3 py-2 border-b">38.3%</td><td className="px-3 py-2 border-b">2.9% - 20.2%</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">أكثر من 65 سنة</td><td className="px-3 py-2 border-b">3.2%</td><td className="px-3 py-2 border-b">3.22%</td><td className="px-3 py-2 border-b">100%</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الإجمالي</td><td className="px-3 py-2 border-b">100%</td><td className="px-3 py-2 border-b">100%</td><td className="px-3 py-2 border-b">100%</td></tr>
                </tbody>
              </table>
            </div>
          </article>

          {/* Housing density table */}
          <article className="mb-6" aria-labelledby="density-title">
            <h3 id="density-title" className="text-xl font-bold text-gray-900 mb-3">3) الكثافة السكنية والإسكان</h3>
            <p className="text-gray-700 mb-2">تشمل الكثافة الصافية القطع السكنية وطرق الوصول إليها، بينما تشمل الكثافة الإجمالية الخدمات المحلية والمساحات المفتوحة.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-right border-b">الإقليم</th>
                    <th className="px-3 py-2 text-right border-b">نوع الكثافة</th>
                    <th className="px-3 py-2 text-right border-b">وحدات لكل هكتار</th>
                    <th className="px-3 py-2 text-right border-b">سكان لكل هكتار</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">طرابلس</td><td className="px-3 py-2 border-b">منخفضة الكثافة (وحدات منفصلة)</td><td className="px-3 py-2 border-b">12 - 24</td><td className="px-3 py-2 border-b">60 - 120</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">طرابلس</td><td className="px-3 py-2 border-b">متوسطة الكثافة (أحياء سكنية)</td><td className="px-3 py-2 border-b">26</td><td className="px-3 py-2 border-b">180</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">طرابلس</td><td className="px-3 py-2 border-b">عالية الكثافة (وحدات مجمعة)</td><td className="px-3 py-2 border-b">50 - 196</td><td className="px-3 py-2 border-b">200 - 930</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">بنغازي</td><td className="px-3 py-2 border-b">منخفضة الكثافة</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">125 - 288</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">بنغازي</td><td className="px-3 py-2 border-b">متوسطة الكثافة</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">52 - 255</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">بنغازي</td><td className="px-3 py-2 border-b">عالية الكثافة</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">255 - 422</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الخليج</td><td className="px-3 py-2 border-b">منخفضة إلى متوسطة الكثافة</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">128 - 212</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">سبها</td><td className="px-3 py-2 border-b">منخفضة الكثافة</td><td className="px-3 py-2 border-b">20 - 26</td><td className="px-3 py-2 border-b">80 - 100</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">سبها</td><td className="px-3 py-2 border-b">متوسطة الكثافة</td><td className="px-3 py-2 border-b">45 - 50</td><td className="px-3 py-2 border-b">200 - 250</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">سبها</td><td className="px-3 py-2 border-b">عالية الكثافة</td><td className="px-3 py-2 border-b">50 - 75</td><td className="px-3 py-2 border-b">250 - 300</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-2">الحد الأدنى للمساحة المغطاة للفرد: 20 م² في إقليمي طرابلس وبنغازي. البيانات غير متوفرة لإقليمي الخليج وسبها.</p>
          </article>
        </section>

        {/* Part 2: Planning Standards */}
        <section className="mt-10" aria-labelledby="part2-title">
          <h2 id="part2-title" className="text-2xl font-bold text-gray-900 mb-4">الجزء الثاني: معايير التخطيط</h2>

          {/* How to use standards */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4" open>
            <summary className="cursor-pointer font-semibold text-gray-900">1) كيفية استخدام هذه المعايير</summary>
            <ul className="list-disc pr-6 mt-3 text-gray-700 space-y-1">
              <li><strong>المرونة:</strong> ليست قواعد جامدة ويجب تعديلها تدريجيًا بناءً على الموارد والأولويات.</li>
              <li><strong>التطبيق:</strong> تُطبق كاملة في المشاريع الجديدة؛ في المناطق القائمة يمكن تعديلها حسب توفر الأراضي (غالبًا بزيادة الكثافة).</li>
              <li><strong>تحديد الأولويات:</strong> لا يمكن تحقيق كل المعايير دفعة واحدة؛ يجب ترتيب الاحتياجات حسب الظروف المحلية.</li>
            </ul>
          </details>

          {/* Housing */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">2) المناطق السكنية والإسكان</summary>
            <div className="mt-3 text-gray-700">
              <p className="font-semibold">مؤشرات الإسكان الرئيسية:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>متوسط حجم الأسرة: 5.5 شخص.</li>
                <li>متوسط الإشغال: 1.1 أسرة لكل مسكن.</li>
                <li>متوسط المساحة الصافية المسقوفة للفرد: 20 م².</li>
              </ul>
              <p className="mt-3 font-semibold">معدلات الكثافة السكانية الصافية (مقترحة):</p>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-3 py-2 text-right border-b">نوع السكن</th>
                      <th className="px-3 py-2 text-right border-b">وحدات لكل هكتار</th>
                      <th className="px-3 py-2 text-right border-b">سكان لكل هكتار</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">وحدات سكنية منفردة (فئة 1-2)</td><td className="px-3 py-2 border-b">10 - 20</td><td className="px-3 py-2 border-b">50 - 100</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">وحدات سكنية منفردة (فئة 3-4)</td><td className="px-3 py-2 border-b">21 - 40</td><td className="px-3 py-2 border-b">105 - 200</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">وحدات سكنية مجمعة (فئة 5)</td><td className="px-3 py-2 border-b">40 - 80</td><td className="px-3 py-2 border-b">160 - 380</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">وحدات سكنية مجمعة (فئة 6-7)</td><td className="px-3 py-2 border-b">80 - 100+</td><td className="px-3 py-2 border-b">380 - 400+</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>

          {/* Education */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">3) المرافق التعليمية</summary>
            <div className="mt-3 text-gray-700 space-y-2">
              <p className="font-semibold">رياض الأطفال (أعمار 4-5 سنوات)</p>
              <ul className="list-disc pr-6">
                <li>روضة أطفال واحدة لكل 4,000 شخص.</li>
                <li>إجمالي مساحة الموقع: 25-30 م² لكل طفل.</li>
                <li>حجم الفصل: 15-25 طفلاً.</li>
                <li>الموقع: على بعد 500 متر سيرًا على الأقدام.</li>
              </ul>
              <p className="font-semibold">المدارس الابتدائية (6-11 سنة)</p>
              <ul className="list-disc pr-6">
                <li>مدرسة لكل 1,000-5,000 شخص (19% من إجمالي السكان).</li>
                <li>المساحة المبنية: 6-7 م²/طالب؛ إجمالي الموقع: 20-30 م²/طالب.</li>
                <li>حجم الفصل: 25-30 طالبًا؛ موقع قريب وسهل الوصول.</li>
              </ul>
              <p className="font-semibold">المدارس الإعدادية (12-16 سنة)</p>
              <ul className="list-disc pr-6">
                <li>تجمعات 5,000 - 15,000 نسمة (8%).</li>
                <li>المساحة المبنية: 18-20 م²/طالب؛ إجمالي الموقع: 30-40 م²/طالب.</li>
                <li>حجم الفصل: 25-35 طالبًا.</li>
              </ul>
              <p className="font-semibold">الثانوية العامة (15-17 سنة)</p>
              <ul className="list-disc pr-6">
                <li>تجمعات 20,000 - 48,000 نسمة (3.7%).</li>
                <li>المساحة المبنية: 10-12 م²/طالب؛ إجمالي الموقع: 20-30 م²/طالب.</li>
                <li>حجم الفصل: 20-25 طالبًا.</li>
              </ul>
              <p className="font-semibold">الثانوية المهنية (15-18 سنة)</p>
              <ul className="list-disc pr-6">
                <li>تجمعات 10,000 - 27,000 نسمة (3.2%).</li>
                <li>المعايير الأخرى مشابهة للثانوية العامة.</li>
              </ul>
            </div>
          </details>

          {/* Healthcare */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">4) المرافق الصحية</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-right border-b">نوع المرفق</th>
                    <th className="px-3 py-2 text-right border-b">عدد السكان المستفيدين</th>
                    <th className="px-3 py-2 text-right border-b">المساحة المبنية لكل مواطن</th>
                    <th className="px-3 py-2 text-right border-b">إجمالي مساحة الموقع لكل مواطن</th>
                    <th className="px-3 py-2 text-right border-b">ملاحظات</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الوحدة الصحية الأساسية</td><td className="px-3 py-2 border-b">2,000 - 5,000</td><td className="px-3 py-2 border-b">0.8 م²</td><td className="px-3 py-2 border-b">2.2 - 5 م²</td><td className="px-3 py-2 border-b">تقع في القرى الكبيرة والعيادات الحضرية.</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">المركز الصحي الأولي</td><td className="px-3 py-2 border-b">15,000 - 20,000</td><td className="px-3 py-2 border-b">0.37 م²</td><td className="px-3 py-2 border-b">0.62 م²</td><td className="px-3 py-2 border-b">في القرى الكبيرة والأحياء الحضرية.</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">العيادة المجمعة</td><td className="px-3 py-2 border-b">20,000 - 60,000</td><td className="px-3 py-2 border-b">0.4 م²</td><td className="px-3 py-2 border-b">0.62 م²</td><td className="px-3 py-2 border-b">للمدن التي يزيد عدد سكانها عن 40,000.</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">المستشفى العام</td><td className="px-3 py-2 border-b">20,000+</td><td className="px-3 py-2 border-b">2-3 أسرة/1000 شخص</td><td className="px-3 py-2 border-b">0.36 م²</td><td className="px-3 py-2 border-b">للمدن 20,000+.</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">المستشفى التخصصي</td><td className="px-3 py-2 border-b">65,000+</td><td className="px-3 py-2 border-b">سريران/1000 شخص</td><td className="px-3 py-2 border-b">0.16 م²</td><td className="px-3 py-2 border-b">للمدن 150,000+.</td></tr>
                  <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الصيدليات</td><td className="px-3 py-2 border-b">8,000 - 9,000</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">صيدلية واحدة لكل نطاق سكاني.</td></tr>
                </tbody>
              </table>
            </div>
          </details>

          {/* Religion & Culture */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">5) المرافق الدينية والثقافية والاجتماعية</summary>
            <div className="mt-3 text-gray-700 space-y-2">
              <p className="font-semibold">المرافق الدينية</p>
              <ul className="list-disc pr-6">
                <li>مسجد الحي: 2% من سكان الحي، 2 م² أرض لكل مصلٍ (1.2 م² مسقوفة).</li>
                <li>المسجد الرئيسي (الجامع): 2% من سكان المنطقة، ويشمل مرافق داعمة.</li>
                <li>المقابر: مساحة تكفي 20 عامًا، 4 م² لكل قبر، خارج المخطط وبعيدة عن المياه الجوفية.</li>
              </ul>
              <p className="font-semibold">المرافق الثقافية والاجتماعية</p>
              <ul className="list-disc pr-6">
                <li>قاعة المؤتمرات الشعبية: تستوعب 15-25% من السكان بمعدل 1 م² للشخص.</li>
                <li>المراكز الثقافية: 3 - 4.2 م²/فرد للموقع، تشمل محاضرات ومكتبات ونوادٍ ومسارح.</li>
                <li>المكتبة الرئيسية: 0.5 هكتار لكل 30,000 شخص.</li>
              </ul>
            </div>
          </details>

          {/* Commercial */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">6) المرافق التجارية</summary>
            <ul className="list-disc pr-6 mt-3 text-gray-700 space-y-1">
              <li>المحلات والأسواق المحلية: 0.5-1.0 م² مسقوفة/فرد؛ مساحة الموقع = ضعفي المسقوفة.</li>
              <li>الأسواق المركزية: 0.2-0.3 م² مسقوفة/فرد؛ مساحة الموقع = ضعفي المسقوفة.</li>
              <li>الخدمات المتخصصة: 0.2 م²/فرد في مراكز الأحياء.</li>
              <li>المطاعم والمقاهي: ضمن المراكز التجارية.</li>
              <li>الفنادق: 3-7 أسرة لكل 1,000 شخص.</li>
              <li>التخزين والمستودعات: لتلبية الطلب لثلاثة أشهر؛ المواقع حسب نوع البضائع.</li>
            </ul>
          </details>

          {/* Green & Recreation */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">7) المناطق الخضراء والترفيه</summary>
            <ul className="list-disc pr-6 mt-3 text-gray-700 space-y-1">
              <li>ملاعب الأطفال: 3-4 ملاعب لكل منطقة مدرسة ابتدائية، 1.5-4.5 م² لكل طفل.</li>
              <li>المناطق الخضراء والحدائق: تنشأ حيثما تسمح الظروف وإمدادات المياه.</li>
              <li>المرافق الرياضية: أولوية للمرافق العامة (ملاعب، كرة قدم، مدن رياضية).</li>
              <li>الأحزمة الخضراء: شريط ساحلي ≥ 100م ومنع التوسع العشوائي.</li>
              <li>المعيار العام: متوسط 20% من مساحة التجمع، لا تقل عن 15%.</li>
            </ul>
          </details>

          {/* Roads & Transport */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">8) الطرق والمواصلات</summary>
            <div className="mt-3 space-y-3">
              <p className="font-semibold">شبكة الطرق بين المدن</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-3 py-2 text-right border-b">فئة الطريق ووظيفته</th>
                      <th className="px-3 py-2 text-right border-b">السرعة التصميمية (كم/ساعة)</th>
                      <th className="px-3 py-2 text-right border-b">المسارات</th>
                      <th className="px-3 py-2 text-right border-b">عرض المسار (م)</th>
                      <th className="px-3 py-2 text-right border-b">عرض الكتف (م)</th>
                      <th className="px-3 py-2 text-right border-b">الخلوص الرأسي (م)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الفئة 1: تربط المراكز الاقتصادية الرئيسية والمطارات والحدود الوطنية</td><td className="px-3 py-2 border-b">120</td><td className="px-3 py-2 border-b">2، 6، أو 7</td><td className="px-3 py-2 border-b">3.75</td><td className="px-3 py-2 border-b">3.0</td><td className="px-3 py-2 border-b">5.5</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الفئة 2: تربط مدينة رئيسية ببلدية</td><td className="px-3 py-2 border-b">100</td><td className="px-3 py-2 border-b">2 أو 3</td><td className="px-3 py-2 border-b">3.30</td><td className="px-3 py-2 border-b">1.5</td><td className="px-3 py-2 border-b">6.5</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الفئة 3: تربط المدن الرئيسية ببعضها</td><td className="px-3 py-2 border-b">80</td><td className="px-3 py-2 border-b">2</td><td className="px-3 py-2 border-b">3.5</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">5.0 - 7.5</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الفئة 4: تربط التجمعات المحلية بالمدن الرئيسية</td><td className="px-3 py-2 border-b">70</td><td className="px-3 py-2 border-b">2</td><td className="px-3 py-2 border-b">3.5</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">3.5</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">الفئة 5: طرق زراعية أو ثانوية</td><td className="px-3 py-2 border-b">60</td><td className="px-3 py-2 border-b">2</td><td className="px-3 py-2 border-b">3.5</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">3.5</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="font-semibold">شبكة الطرق الحضرية (داخل المدن)</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-3 py-2 text-right border-b">نوع الطريق</th>
                      <th className="px-3 py-2 text-right border-b">المسارات</th>
                      <th className="px-3 py-2 text-right border-b">السرعة التصميمية (كم/ساعة)</th>
                      <th className="px-3 py-2 text-right border-b">أدنى عرض جزيرة وسطية (م)</th>
                      <th className="px-3 py-2 text-right border-b">أدنى عرض رصيف (م)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">شرياني رئيسي/سريع</td><td className="px-3 py-2 border-b">4 (مفصولة)</td><td className="px-3 py-2 border-b">50-100</td><td className="px-3 py-2 border-b">6.0</td><td className="px-3 py-2 border-b">3.6</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">تجميعي/توزيعي</td><td className="px-3 py-2 border-b">4 (مفصولة)</td><td className="px-3 py-2 border-b">50</td><td className="px-3 py-2 border-b">4.5</td><td className="px-3 py-2 border-b">3.6</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">تجميعي داخلي</td><td className="px-3 py-2 border-b">2-4 (غير مفصولة)</td><td className="px-3 py-2 border-b">50</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">2.0</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">طريق وصول محلي</td><td className="px-3 py-2 border-b">2</td><td className="px-3 py-2 border-b">30</td><td className="px-3 py-2 border-b">-</td><td className="px-3 py-2 border-b">1.5</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="font-semibold">متطلبات مواقف السيارات</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-3 py-2 text-right border-b">استخدام الأرض</th>
                      <th className="px-3 py-2 text-right border-b">المواقف المطلوبة لكل...</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">سكني</td><td className="px-3 py-2 border-b">1-2 موقف لكل وحدة سكنية</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">تجاري (تجزئة)</td><td className="px-3 py-2 border-b">موقف واحد لكل 50-100 م² من المساحة الطابقية</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">مكاتب</td><td className="px-3 py-2 border-b">موقف واحد لكل 50-60 م² من المساحة الطابقية</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">فنادق</td><td className="px-3 py-2 border-b">موقف واحد لكل 5-8 أسرة</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">مدارس ثانوية</td><td className="px-3 py-2 border-b">موقف واحد لكل 5 فصول دراسية</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">مستشفيات</td><td className="px-3 py-2 border-b">موقف واحد لكل 10-12 سريرًا</td></tr>
                    <tr className="odd:bg-white even:bg-gray-50"><td className="px-3 py-2 border-b">صناعي / ورش</td><td className="px-3 py-2 border-b">موقف واحد لكل 1-10 موظفين</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>

          {/* Utilities */}
          <details className="border border-gray-200 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-900">9) المرافق العامة</summary>
            <div className="mt-3 text-gray-700 space-y-2">
              <p className="font-semibold">إمدادات المياه</p>
              <ul className="list-disc pr-6">
                <li>معيار الاستهلاك: 200-250 لترًا/فرد/يوميًا (الساحلية والجنوبية)؛ 150 لترًا/فرد/يوميًا (أخرى).</li>
                <li>حماية المصادر: 10م مباشرة + 50م غير مباشرة لمنع التلوث.</li>
                <li>المعالجة: كلور متبقٍ 0.5-0.8 ملغم/لتر.</li>
                <li>التخزين: سعة 24 ساعة + مكافحة حرائق.</li>
              </ul>
              <p className="font-semibold">الصرف الصحي وإدارة النفايات</p>
              <ul className="list-disc pr-6">
                <li>التدفق التصميمي: 75% من استهلاك المياه؛ أقصى تدفق 3× متوسط الطقس الجاف.</li>
                <li>المعالجة: محطات للتجمعات &gt; 2,000؛ مناطق عازلة 200-1,500م.</li>
                <li>الجمع: يوميًا في الصيف، يوم بعد يوم في الشتاء للمراكز &gt; 5,000.</li>
                <li>التخلص: مواقع دفن ≥ 1كم؛ محارق طبية/صناعية في مناطق صناعية.</li>
              </ul>
              <p className="font-semibold">إمدادات الطاقة</p>
              <ul className="list-disc pr-6">
                <li>الاستهلاك المنزلي: 2,500 ك.و.س/فرد/سنة؛ قدرة 15-20 ك.و./منزل.</li>
                <li>محطات الطاقة: متطلبات أراضٍ 9-250 هكتارًا حسب النوع.</li>
                <li>خطوط الجهد العالي: خلوص أرضي ≥ 6م؛ ارتداد المباني 7م (11 ك.ف) إلى 20م (220 ك.ف).</li>
              </ul>
            </div>
          </details>

          {/* Telecom */}
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-900">10) الاتصالات</summary>
            <ul className="list-disc pr-6 mt-3 text-gray-700">
              <li>الهواتف: الهدف لعام 2000 توفير 25-35 خط هاتف لكل 100 شخص.</li>
            </ul>
          </details>
        </section>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default Standards;
