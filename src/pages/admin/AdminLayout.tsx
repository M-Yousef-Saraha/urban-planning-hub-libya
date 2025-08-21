import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <aside className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold mb-4">لوحة الإدارة</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/admin" className="text-sm py-2 px-3 rounded hover:bg-gray-100">نظرة عامة</Link>
              <Link to="/admin/documents" className="text-sm py-2 px-3 rounded hover:bg-gray-100">الوثائق</Link>
              <Link to="/admin/media" className="text-sm py-2 px-3 rounded hover:bg-gray-100">الوسائط</Link>
              <Link to="/admin/news" className="text-sm py-2 px-3 rounded hover:bg-gray-100">الأخبار</Link>
              <Link to="/admin/downloads" className="text-sm py-2 px-3 rounded hover:bg-gray-100">التنزيلات</Link>
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mt-4 text-sm">العودة للوحة المستخدم</Button>
            </nav>
          </aside>

          <main className="lg:col-span-5">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
