import { Link } from 'react-router-dom';
import { Zap, Shirt, Edit2, CheckCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const getServiciosData = () => {
  const defaultData = {
    autoservicio: {
      titulo: "Autoservicio",
      subtitulo: "Tú controlas tu tiempo",
      descripcion: "Equipos comerciales modernos a tu disposición. Rápido, autónomo y sin esperas innecesarias.",
      caracteristicas: [
        "Equipos comerciales modernos",
        "Proceso visible y entendible",
        "Sin filas, sin fricción",
        "Espacios limpios y ordenados"
      ],
      precios: {
        maquinasChicas: 80,
        maquinasGrandes: 125
      },
      tiempoCiclo: 80
    },
    lavadoPorEncargo: {
      titulo: "Lavado por encargo",
      subtitulo: "Nosotros nos encargamos",
      descripcion: "La solución perfecta para gente ocupada. Delega sin culpa y recibe tu ropa impecable el mismo día.",
      caracteristicas: [
        "Precio claro: $30/kg",
        "Entrega el mismo día",
        "Lavado + secado + doblado",
        "Seguimiento por WhatsApp"
      ],
      precioBase: 30,
      preciosEspeciales: {
        min: 80,
        max: 175,
        etiqueta: "Edredones y Hamacas"
      },
      mostrarBadgePopular: true
    }
  };

  const stored = localStorage.getItem('admin_servicios');
  return stored ? JSON.parse(stored) : defaultData;
};

const AdminServicios = () => {
  const servicios = getServiciosData();

  return (
    <AdminLayout 
      title="Gestión de Servicios" 
      description="Administra la información y precios de tus servicios"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Autoservicio */}
        <div 
          className="bg-card rounded-2xl p-7"
          style={{
            border: '1px solid hsl(220 13% 91%)',
            boxShadow: '0 2px 12px hsl(0 0% 0% / 0.06)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'hsl(240 100% 50% / 0.1)' }}
              >
                <Zap size={24} style={{ color: 'hsl(240 100% 50%)' }} />
              </div>
              <span className="font-bold text-lg text-foreground">Autoservicio</span>
            </div>
            <span 
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ 
                background: 'hsl(142 76% 36% / 0.1)', 
                color: 'hsl(142 76% 36%)' 
              }}
            >
              Activo
            </span>
          </div>

          {/* Preview Data */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Título y subtítulo</p>
              <p className="font-semibold text-foreground">{servicios.autoservicio.titulo}</p>
              <p className="text-secondary text-sm">{servicios.autoservicio.subtitulo}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Descripción</p>
              <p className="text-foreground text-sm line-clamp-2">
                {servicios.autoservicio.descripcion}
              </p>
            </div>

            <div 
              className="rounded-xl p-4"
              style={{ background: 'hsl(240 100% 50% / 0.04)' }}
            >
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Precios</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: 'hsl(218 69% 58%)' }} />
                  <span className="text-sm text-foreground">
                    Máquinas chicas: <strong>${servicios.autoservicio.precios.maquinasChicas} MXN</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: 'hsl(218 69% 58%)' }} />
                  <span className="text-sm text-foreground">
                    Máquinas grandes: <strong>${servicios.autoservicio.precios.maquinasGrandes} MXN</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: 'hsl(218 69% 58%)' }} />
                  <span className="text-sm text-foreground">
                    Tiempo: <strong>~{servicios.autoservicio.tiempoCiclo} min</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to="/admin/servicios/autoservicio/editar"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-primary-foreground transition-all hover:opacity-90"
            style={{ background: 'hsl(240 100% 50%)' }}
          >
            <Edit2 size={18} />
            Editar información
          </Link>
        </div>

        {/* Card Lavado por Encargo */}
        <div 
          className="rounded-2xl p-7"
          style={{
            background: 'linear-gradient(135deg, hsl(240 100% 50% / 0.03) 0%, hsl(218 69% 58% / 0.05) 100%)',
            border: '2px solid hsl(240 100% 50% / 0.15)',
            boxShadow: '0 2px 12px hsl(240 100% 50% / 0.1)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'hsl(218 69% 58% / 0.15)' }}
              >
                <Shirt size={24} style={{ color: 'hsl(218 69% 58%)' }} />
              </div>
              <span className="font-bold text-lg text-foreground">Lavado por encargo</span>
            </div>
            <span 
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ 
                background: 'hsl(240 100% 50%)', 
                color: 'hsl(0 0% 100%)' 
              }}
            >
              Más popular
            </span>
          </div>

          {/* Preview Data */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Título y subtítulo</p>
              <p className="font-semibold text-foreground">{servicios.lavadoPorEncargo.titulo}</p>
              <p className="text-secondary text-sm">{servicios.lavadoPorEncargo.subtitulo}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Descripción</p>
              <p className="text-foreground text-sm line-clamp-2">
                {servicios.lavadoPorEncargo.descripcion}
              </p>
            </div>

            <div 
              className="rounded-xl p-4"
              style={{ background: 'hsl(240 100% 50% / 0.06)' }}
            >
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Precios</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: 'hsl(218 69% 58%)' }} />
                  <span className="text-sm text-foreground">
                    Precio base: <strong>${servicios.lavadoPorEncargo.precioBase}/kg MXN</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: 'hsl(218 69% 58%)' }} />
                  <span className="text-sm text-foreground">
                    {servicios.lavadoPorEncargo.preciosEspeciales.etiqueta}: <strong>${servicios.lavadoPorEncargo.preciosEspeciales.min}-${servicios.lavadoPorEncargo.preciosEspeciales.max} MXN</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to="/admin/servicios/lavado-por-encargo/editar"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-primary-foreground transition-all hover:opacity-90"
            style={{ background: 'hsl(240 100% 50%)' }}
          >
            <Edit2 size={18} />
            Editar información
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServicios;
