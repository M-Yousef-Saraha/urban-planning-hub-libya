import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User, authAPI, LoginRequest, RegisterRequest } from '@/lib/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Load user from cookies on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = Cookies.get('authToken');
        const savedUser = Cookies.get('user');
        
        if (token && savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Verify token is still valid
          try {
            const response = await authAPI.getProfile();
            if (response.success) {
              setUser(response.data);
              Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
            }
          } catch (error) {
            // Token is invalid, clear auth data
            logout();
          }
        }
      } catch (error) {
        // User loading failed - token may be expired
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(data);
      
      if (response.success) {
        const { user: userData, token } = response.data;
        
        // Save to cookies
        Cookies.set('authToken', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        
        setUser(userData);
        toast.success('تم تسجيل الدخول بنجاح');
      } else {
        throw new Error(response.error || 'فشل في تسجيل الدخول');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'فشل في تسجيل الدخول';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(data);
      
      if (response.success) {
        const { user: userData, token } = response.data;
        
        // Save to cookies
        Cookies.set('authToken', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        
        setUser(userData);
        toast.success('تم إنشاء الحساب بنجاح');
      } else {
        throw new Error(response.error || 'فشل في إنشاء الحساب');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'فشل في إنشاء الحساب';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('user');
    setUser(null);
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

