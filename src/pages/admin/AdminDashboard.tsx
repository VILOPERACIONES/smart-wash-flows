import { Link } from 'react-router-dom';
import { Image, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
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
    },
    {
      icon: MapPin,
      value: activeBranches.length,
      label: 'Sucursales activas',
      subtitle: `${upcomingBranches.length} próximamente`,
      link: '/admin/sucursales',
      linkText: 'Ver todas',
    },
    {
      icon: Clock,
      value: upcomingBranches.length,
      label: 'Próximas aperturas',
    },
    {
      icon: Users,
      value: users.length + 1, // +1 for default admin
      label: 'Usuarios con acceso',
      link: '/admin/usuarios',
      linkText: 'Gestionar',
    },
  ];

  const quickAccess = [
    {
      icon: Image,
      title: 'Promociones',
      description: 'Gestiona el carrusel de promociones',
      link: '/admin/promociones',
      color: 'bg-electric-blue',
    },
    {
      icon: MapPin,
      title: 'Sucursales',
      description: 'Administra tus ubicaciones',
      link: '/admin/sucursales',
      color: 'bg-andrea-blue',
    },
    {
      icon: Users,
      title: 'Usuarios',
      description: 'Gestiona permisos de acceso',
      link: '/admin/usuarios',
      color: 'bg-dark-powder-blue',
    },
  ];

  return (
    <AdminLayout title="Panel de Control">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border-t-[3px] border-electric-blue"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center">
                <stat.icon className="text-electric-blue" size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-dark-powder-blue text-sm font-medium">{stat.label}</p>
            {stat.subtitle && (
              <p className="text-andrea-blue text-xs mt-1">{stat.subtitle}</p>
            )}
            {stat.link && (
              <Link 
                to={stat.link}
                className="inline-flex items-center gap-1 text-electric-blue text-sm font-medium mt-3 hover:underline"
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
        <h2 className="text-lg font-bold text-foreground mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickAccess.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                <item.icon className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-electric-blue transition-colors">
                {item.title}
              </h3>
              <p className="text-dark-powder-blue text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
