import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
  active: boolean;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Default admin user
const DEFAULT_ADMIN: AdminUser = {
  id: '1',
  name: 'Administrador',
  email: 'admin@alavar.com',
  role: 'admin',
  permissions: ['promociones', 'sucursales', 'usuarios'],
  active: true,
};

// Default credentials
const DEFAULT_CREDENTIALS = {
  email: 'admin@alavar.com',
  password: 'Admin123!',
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Get users from localStorage or use default
    const storedUsers = localStorage.getItem('admin_users');
    let users: (AdminUser & { password: string })[] = [];
    
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    }

    // Check default admin credentials first
    if (email === DEFAULT_CREDENTIALS.email && password === DEFAULT_CREDENTIALS.password) {
      setUser(DEFAULT_ADMIN);
      localStorage.setItem('admin_user', JSON.stringify(DEFAULT_ADMIN));
      return { success: true };
    }

    // Check stored users
    const foundUser = users.find(u => u.email === email && u.password === password && u.active);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('admin_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { success: false, error: 'Credenciales incorrectas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
