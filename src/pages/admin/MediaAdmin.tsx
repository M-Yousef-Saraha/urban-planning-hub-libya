import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

const MediaAdmin = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // list uploads directory via admin API (not yet implemented)
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">إدارة الوسائط</h2>
        <Button onClick={() => alert('Media upload UI to implement')}>رفع وسائط</Button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <p className="text-sm text-gray-600">قائمة الملفات والوسائط ستظهر هنا.</p>
      </div>
    </div>
  );
};

export default MediaAdmin;
