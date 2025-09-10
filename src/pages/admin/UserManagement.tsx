import React, { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  Edit,
  Shield,
  UserCheck,
  UserX,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [pagination, setPagination] = useState<any>({});

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, searchTerm]);

  const fetchUsers = async (page = 1) => {
    try {
      setIsLoading(true);
      const params: any = { page, limit: 20 };
      if (roleFilter) params.role = roleFilter;
      if (searchTerm) params.search = searchTerm;
      
      const response = await adminAPI.getAllUsers(params);
      if (response.success) {
        setUsers(response.data.users || []);
        setPagination(response.data.pagination || {});
      }
    } catch (error) {
      toast.error('فشل في تحميل المستخدمين');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      setIsUpdating(true);
      const response = await adminAPI.updateUserRole(userId, newRole);
      if (response.success) {
        toast.success('تم تحديث دور المستخدم بنجاح');
        fetchUsers();
        setSelectedUser(null);
      }
    } catch (error) {
      toast.error('فشل في تحديث دور المستخدم');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      setIsUpdating(true);
      const response = await adminAPI.toggleUserStatus(userId);
      if (response.success) {
        toast.success(response.message);
        fetchUsers();
      }
    } catch (error) {
      toast.error('فشل في تحديث حالة المستخدم');
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      ADMIN: { label: 'مدير', variant: 'default' as const, icon: Shield },
      USER: { label: 'مستخدم', variant: 'secondary' as const, icon: UserCheck },
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.USER;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">إدارة المستخدمين</h1>
        <p className="text-gray-600">إدارة المستخدمين وأدوارهم في النظام</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            البحث والتصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">البحث</label>
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث بالاسم أو البريد الإلكتروني"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الدور</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الأدوار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الأدوار</SelectItem>
                  <SelectItem value="USER">مستخدم</SelectItem>
                  <SelectItem value="ADMIN">مدير</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => fetchUsers()} className="w-full">
                تحديث القائمة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            قائمة المستخدمين ({pagination.totalItems || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-3">جاري التحميل...</span>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم والبريد</TableHead>
                    <TableHead>رقم الهاتف</TableHead>
                    <TableHead>الدور</TableHead>
                    <TableHead>عدد الطلبات</TableHead>
                    <TableHead>تاريخ التسجيل</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span dir="ltr">{user.phone || '-'}</span>
                      </TableCell>
                      <TableCell>
                        {getRoleBadge(user.role)}
                      </TableCell>
                      <TableCell>
                        <span dir="ltr">{user._count?.requests || 0}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span dir="ltr">{formatDate(user.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Edit className="w-4 h-4 ml-1" />
                                تعديل الدور
                              </Button>
                            </DialogTrigger>
                            <DialogContent dir="rtl">
                              <DialogHeader>
                                <DialogTitle>تعديل دور المستخدم</DialogTitle>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="font-medium">المستخدم:</label>
                                    <p>{selectedUser.name} ({selectedUser.email})</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">الدور الحالي:</label>
                                    <p>{getRoleBadge(selectedUser.role)}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">الدور الجديد:</label>
                                    <div className="flex gap-2 mt-2">
                                      <Button
                                        variant={selectedUser.role === 'USER' ? 'default' : 'outline'}
                                        onClick={() => handleRoleUpdate(selectedUser.id, 'USER')}
                                        disabled={isUpdating}
                                      >
                                        <UserCheck className="w-4 h-4 ml-1" />
                                        مستخدم
                                      </Button>
                                      <Button
                                        variant={selectedUser.role === 'ADMIN' ? 'default' : 'outline'}
                                        onClick={() => handleRoleUpdate(selectedUser.id, 'ADMIN')}
                                        disabled={isUpdating}
                                      >
                                        <Shield className="w-4 h-4 ml-1" />
                                        مدير
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    صفحة {pagination.currentPage} من {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchUsers(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                    >
                      السابق
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchUsers(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                    >
                      التالي
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;