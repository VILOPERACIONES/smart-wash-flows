import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ImagePlus, 
  MapPin, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Bell,
  ChevronDown
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: ImagePlus, label: 'Promociones', path: '/admin/promociones' },
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
    <div className="min-h-screen flex bg-muted">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-[280px] flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: 'linear-gradient(180deg, hsl(218 100% 31%) 0%, hsl(218 100% 20%) 100%)',
          boxShadow: '2px 0 12px hsl(0 0% 0% / 0.15)'
        }}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-8 border-b border-primary-foreground/10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AL</span>
                </div>
                <span className="text-primary-foreground font-bold text-xl">A LAVAR</span>
              </div>
              <span className="text-primary-foreground/70 text-xs font-normal pl-[52px]">Admin Panel</span>
            </div>
            <button 
              className="lg:hidden text-primary-foreground p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3.5 px-5 py-3.5 rounded-[10px] text-primary-foreground/75 font-medium transition-all duration-200",
                    isActive 
                      ? "admin-nav-active text-primary-foreground scale-[1.02]" 
                      : "hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <item.icon size={20} strokeWidth={2} />
                  <span className="text-[0.95rem]">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-primary-foreground/10 bg-foreground/10">
          {/* User Card */}
          <div className="bg-primary-foreground/[0.08] rounded-xl p-3 flex items-center gap-3 mb-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'hsl(240 100% 50%)',
                border: '2px solid hsl(0 0% 100% / 0.2)'
              }}
            >
              <span className="text-primary-foreground font-bold text-sm">
                {user ? getInitials(user.name) : 'AD'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-primary-foreground font-semibold text-sm truncate">
                {user?.name || 'Administrador'}
              </p>
              <p className="text-primary-foreground/60 text-xs truncate">
                {user?.email || 'admin@alavar.com'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-colors"
            style={{
              background: 'hsl(0 84% 60% / 0.15)',
              color: 'hsl(0 84% 70%)'
            }}
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header 
          className="bg-card h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30"
          style={{
            borderBottom: '1px solid hsl(220 13% 91%)',
            boxShadow: '0 1px 3px hsl(0 0% 0% / 0.05)'
          }}
        >
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="font-bold text-[1.75rem] text-foreground tracking-tight">{title}</h1>
              {description && (
                <p className="text-secondary text-sm mt-0.5">{description}</p>
              )}
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-5">
            {/* Notifications (placeholder) */}
            <button className="relative p-2.5 rounded-xl bg-accent/10 text-accent hover:bg-primary/10 hover:text-primary transition-colors">
              <Bell size={20} />
            </button>
            
            {/* User */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-muted px-3 py-2 rounded-xl transition-colors">
              <div 
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'hsl(240 100% 50%)' }}
              >
                <span className="text-primary-foreground font-bold text-sm">
                  {user ? getInitials(user.name) : 'AD'}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="font-semibold text-[0.95rem] text-foreground">
                  {user?.name || 'Administrador'}
                </p>
                <p className="text-secondary text-xs">
                  {user?.role === 'admin' ? 'Administrador' : user?.role === 'editor' ? 'Editor' : 'Visualizador'}
                </p>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
