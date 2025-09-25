
import React from 'react';
import { MapPin, Calendar, Users, TrendingUp } from 'lucide-react';

const ProjectsSection = () => {
  const statusStyles: Record<string, string> = {
    'قيد التنفيذ': 'bg-[hsla(var(--success)/0.12)] text-[hsl(var(--success))] border border-[hsla(var(--success)/0.25)]',
    'مرحلة التصميم': 'bg-[hsla(var(--primary)/0.12)] text-primary border border-[hsla(var(--primary)/0.25)]',
    'مرحلة الدراسة': 'bg-[hsla(var(--warning)/0.12)] text-[hsl(var(--warning))] border border-[hsla(var(--warning)/0.25)]',
    default: 'bg-[hsla(var(--primary)/0.12)] text-primary border border-[hsla(var(--primary)/0.2)]',
  };

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
    <section id="projects" className="py-16 bg-background" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">مشاريعنا</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نعمل على تنفيذ مشاريع عمرانية رائدة تهدف إلى تطوير المدن الليبية وتحسين جودة الحياة
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl shadow-lg hover-lift p-8"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <h4 className="text-2xl font-bold text-foreground">{project.title}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusStyles[project.status] ?? statusStyles.default
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin size={16} className="ml-2" />
                    <span>{project.location}</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-muted-foreground">مستوى الإنجاز</span>
                      <span className="text-sm font-medium text-primary" dir="ltr">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-[hsla(var(--primary)/0.85)] h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="space-y-6">
                  <div className="bg-[hsla(var(--primary)/0.06)] p-4 rounded-xl border border-[hsla(var(--primary)/0.1)]">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Calendar size={16} className="text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">تاريخ البدء</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      <span dir="ltr">{new Date(project.startDate).toLocaleDateString('en-GB')}</span>
                    </p>
                  </div>
                  
                  <div className="bg-[hsla(var(--primary)/0.06)] p-4 rounded-xl border border-[hsla(var(--primary)/0.1)]">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Users size={16} className="text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">المستفيدون</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground" dir="ltr">{project.beneficiaries}</p>
                  </div>
                  
                  <div className="bg-[hsla(var(--primary)/0.06)] p-4 rounded-xl border border-[hsla(var(--primary)/0.1)]">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <TrendingUp size={16} className="text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">الحالة</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{project.status}</p>
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
