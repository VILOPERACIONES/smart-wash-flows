import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Image, 
  MapPin, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Image, label: 'Promociones', path: '/admin/promociones' },
  { icon: MapPin, label: 'Sucursales', path: '/admin/sucursales' },
  { icon: Users, label: 'Usuarios', path: '/admin/usuarios' },
];

const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-[250px] flex flex-col transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar Header */}
        <div className="bg-electric-blue px-5 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <span className="text-white font-bold">A LAVAR Admin</span>
            </div>
            <button 
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 bg-dark-powder-blue py-5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors",
                  isActive && "bg-electric-blue text-white border-l-4 border-white"
                )}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="ml-auto" size={16} />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="bg-dark-powder-blue border-t border-white/10 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-andrea-blue flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user ? getInitials(user.name) : 'AD'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {user?.name || 'Administrador'}
              </p>
              <p className="text-white/60 text-xs truncate">
                {user?.email || 'admin@alavar.com'}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} className="mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="font-bold text-xl text-foreground">{title}</h1>
              {description && (
                <p className="text-dark-powder-blue text-sm mt-0.5">{description}</p>
              )}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-foreground font-medium text-sm">
              {user?.name || 'Administrador'}
            </span>
            <div className="w-10 h-10 rounded-full bg-andrea-blue flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user ? getInitials(user.name) : 'AD'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
