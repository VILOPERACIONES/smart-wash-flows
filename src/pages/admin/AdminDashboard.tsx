import { Link } from 'react-router-dom';
import { Image, MapPin, Clock, Users, ArrowRight, Zap } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  // Get data from localStorage
  const promotions = JSON.parse(localStorage.getItem('admin_promotions') || '[]');
  const branches = JSON.parse(localStorage.getItem('admin_branches') || '[]');
  const users = JSON.parse(localStorage.getItem('admin_users') || '[]');

  const activeBranches = branches.filter((b: any) => b.status === 'active');
  const upcomingBranches = branches.filter((b: any) => b.status === 'upcoming');
  const activePromotions = promotions.filter((p: any) => p.active);

  const stats = [
    {
      icon: Image,
      value: activePromotions.length,
      label: 'Promociones activas',
      link: '/admin/promociones',
      linkText: 'Ver todas',
      color: 'primary',
      borderColor: 'hsl(240 100% 50%)',
      bgColor: 'hsl(240 100% 50% / 0.1)',
      iconColor: 'hsl(240 100% 50%)',
    },
    {
      icon: Zap,
      value: 2,
      label: 'Servicios configurados',
      link: '/admin/servicios',
      linkText: 'Gestionar',
      color: 'accent',
      borderColor: 'hsl(218 69% 58%)',
      bgColor: 'hsl(218 69% 58% / 0.1)',
      iconColor: 'hsl(218 69% 58%)',
    },
    {
      icon: MapPin,
      value: activeBranches.length,
      label: 'Sucursales activas',
      subtitle: `${upcomingBranches.length} próximamente`,
      link: '/admin/sucursales',
      linkText: 'Ver todas',
      color: 'secondary',
      borderColor: 'hsl(218 100% 31%)',
      bgColor: 'hsl(218 100% 31% / 0.1)',
      iconColor: 'hsl(218 100% 31%)',
    },
    {
      icon: Users,
      value: users.length + 1, // +1 for default admin
      label: 'Usuarios con acceso',
      link: '/admin/usuarios',
      linkText: 'Gestionar',
      color: 'foreground',
      borderColor: 'hsl(0 0% 0%)',
      bgColor: 'hsl(0 0% 0% / 0.08)',
      iconColor: 'hsl(0 0% 0%)',
    },
  ];

  const quickAccess = [
    {
      icon: Image,
      title: 'Promociones',
      description: 'Gestiona el carrusel de promociones',
      link: '/admin/promociones',
      gradient: 'linear-gradient(135deg, hsl(240 100% 50%) 0%, hsl(218 100% 31%) 100%)',
    },
    {
      icon: Zap,
      title: 'Servicios',
      description: 'Administra información y precios',
      link: '/admin/servicios',
      gradient: 'linear-gradient(135deg, hsl(218 69% 58%) 0%, hsl(218 100% 31%) 100%)',
    },
    {
      icon: MapPin,
      title: 'Sucursales',
      description: 'Administra tus ubicaciones',
      link: '/admin/sucursales',
      gradient: 'linear-gradient(135deg, hsl(218 100% 31%) 0%, hsl(218 100% 20%) 100%)',
    },
  ];

  return (
    <AdminLayout title="Panel de Control">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="admin-stat-card group"
            style={{ borderTop: `4px solid ${stat.borderColor}` }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: stat.bgColor }}
            >
              <stat.icon size={24} style={{ color: stat.iconColor }} />
            </div>
            <p className="text-[3rem] font-bold text-foreground leading-none mb-2">{stat.value}</p>
            <p className="text-secondary font-medium text-[0.95rem] mb-1">{stat.label}</p>
            {stat.subtitle && (
              <p className="text-accent text-sm mt-2">{stat.subtitle}</p>
            )}
            {stat.link && (
              <Link 
                to={stat.link}
                className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-4 hover:underline group-hover:gap-2 transition-all"
              >
                {stat.linkText}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-5">Accesos rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickAccess.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="admin-card p-7 group cursor-pointer"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: item.gradient }}
              >
                <item.icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-secondary text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
