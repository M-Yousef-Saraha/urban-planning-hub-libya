import React, { useState, useEffect } from 'react';
import { Building, Map, Calendar, Users, TrendingUp, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  useEffect(() => {
    // TODO: Replace with actual API call when backend is ready
    // const fetchProjects = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await projectsService.getAll();
    //     if (response.success) {
    //       setProjects(response.data);
    //     }
    //   } catch (err) {
    //     setError('Failed to load projects');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchProjects();
    
    // For now, set empty array and loading to false
    setTimeout(() => {
      setProjects([]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
      case 'قيد التنفيذ':
        return 'bg-green-50 text-green-800';
      case 'planning':
      case 'مرحلة التصميم':
        return 'bg-primary/10 text-primary';
      case 'on_hold':
      case 'مرحلة الدراسة':
        return 'bg-yellow-50 text-yellow-800';
      case 'completed':
      case 'مكتمل':
        return 'bg-gray-50 text-gray-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'قيد التنفيذ';
      case 'planning':
        return 'مرحلة التصميم';
      case 'on_hold':
        return 'مرحلة الدراسة';
      case 'completed':
        return 'مكتمل';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-100">
        <PageContainer className="max-w-4xl text-center">
          <div className={`inline-flex items-center ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'} bg-primary/10 rounded-full px-6 py-2 mb-8`}>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-semibold" dir={isRTL ? 'rtl' : 'ltr'}>{t('projects.subtitle')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>{t('projects.title')}</h1>
          <p className="text-xl text-gray-600 mb-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('projects.description')}
          </p>
        </PageContainer>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16">
        <PageContainer>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">جاري تحميل المشاريع...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Building className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">حدث خطأ في تحميل المشاريع</h2>
              <p className="text-lg text-gray-600 mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id || index}
                  className="modern-card overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={project.image_url || 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Project+Image'}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="ml-2" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 space-x-reverse mb-1">
                          <Calendar size={14} className="text-primary" />
                          <span className="text-xs font-medium text-gray-700">تاريخ البدء</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800" dir="ltr">
                          {new Date(project.start_date).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 space-x-reverse mb-1">
                          <Users size={14} className="text-primary" />
                          <span className="text-xs font-medium text-gray-700">المستفيدون</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800" dir="ltr">{project.beneficiaries?.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 space-x-reverse group">
                      <span>تفاصيل المشروع</span>
                      <Building size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Building className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('projects.empty_state.title')}</h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('projects.empty_state.description')}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('common:buttons.refresh')}
              </button>
            </div>
          )}
        </PageContainer>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
