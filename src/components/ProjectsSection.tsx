
import React from 'react';
import { MapPin, Calendar, Users, TrendingUp } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'مشروع تطوير الساحل الغربي',
      location: 'الساحل الغربي - ليبيا',
      description: 'مشروع شامل لتطوير المنطقة الساحلية الغربية يشمل تطوير البنية التحتية والمرافق السياحية والسكنية بمعايير عالمية.',
      status: 'قيد التنفيذ',
      progress: 65,
      startDate: '2024-03-15',
      beneficiaries: '50,000'
    },
    {
      title: 'توسعة النطاق الحضري لطرابلس',
      location: 'طرابلس الكبرى',
      description: 'خطة شاملة لتوسعة النطاق الحضري لمدينة طرابلس لاستيعاب النمو السكاني المتزايد مع تحسين الخدمات والمرافق.',
      status: 'مرحلة التصميم',
      progress: 40,
      startDate: '2024-06-01',
      beneficiaries: '200,000'
    },
    {
      title: 'مدينة بنغازي الذكية',
      location: 'بنغازي',
      description: 'مبادرة لتحويل مدينة بنغازي إلى مدينة ذكية باستخدام أحدث التقنيات في إدارة المرافق والخدمات العامة.',
      status: 'مرحلة الدراسة',
      progress: 20,
      startDate: '2024-09-01',
      beneficiaries: '120,000'
    }
  ];

  return (
    <section id="projects" className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">مشاريعنا</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نعمل على تنفيذ مشاريع عمرانية رائدة تهدف إلى تطوير المدن الليبية وتحسين جودة الحياة
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover-lift p-8"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <h4 className="text-2xl font-bold text-gray-800">{project.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'قيد التنفيذ' ? 'bg-green-100 text-green-800' :
                      project.status === 'مرحلة التصميم' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="ml-2" />
                    <span>{project.location}</span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">مستوى الإنجاز</span>
                      <span className="text-sm font-medium text-blue-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">تاريخ البدء</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(project.startDate).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Users size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">المستفيدون</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{project.beneficiaries}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <TrendingUp size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">الحالة</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
