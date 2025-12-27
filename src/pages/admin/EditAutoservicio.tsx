import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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

const EditAutoservicio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    caracteristicas: ['', '', '', ''],
    precioChicas: 0,
    precioGrandes: 0,
    tiempoCiclo: 0
  });

  useEffect(() => {
    const data = getServiciosData();
    setFormData({
      titulo: data.autoservicio.titulo,
      subtitulo: data.autoservicio.subtitulo,
      descripcion: data.autoservicio.descripcion,
      caracteristicas: data.autoservicio.caracteristicas,
      precioChicas: data.autoservicio.precios.maquinasChicas,
      precioGrandes: data.autoservicio.precios.maquinasGrandes,
      tiempoCiclo: data.autoservicio.tiempoCiclo
    });
  }, []);

  const handleCaracteristicaChange = (index: number, value: string) => {
    const newCaracteristicas = [...formData.caracteristicas];
    newCaracteristicas[index] = value;
    setFormData({ ...formData, caracteristicas: newCaracteristicas });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.titulo.trim()) {
      toast({ title: "Error", description: "El título es requerido", variant: "destructive" });
      return;
    }
    if (formData.precioChicas <= 0 || formData.precioGrandes <= 0) {
      toast({ title: "Error", description: "Los precios deben ser mayores a 0", variant: "destructive" });
      return;
    }

    const allData = getServiciosData();
    allData.autoservicio = {
      titulo: formData.titulo,
      subtitulo: formData.subtitulo,
      descripcion: formData.descripcion,
      caracteristicas: formData.caracteristicas.filter(c => c.trim()),
      precios: {
        maquinasChicas: formData.precioChicas,
        maquinasGrandes: formData.precioGrandes
      },
      tiempoCiclo: formData.tiempoCiclo
    };

    localStorage.setItem('admin_servicios', JSON.stringify(allData));
    toast({ title: "Éxito", description: "Servicio actualizado correctamente" });
    navigate('/admin/servicios');
  };

  return (
    <AdminLayout title="Editar Autoservicio">
      <Link 
        to="/admin/servicios"
        className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Volver a Servicios</span>
      </Link>

      <form onSubmit={handleSubmit}>
        <div 
          className="bg-card rounded-2xl p-8 lg:p-10 max-w-4xl"
          style={{
            border: '1px solid hsl(220 13% 91%)',
            boxShadow: '0 2px 12px hsl(0 0% 0% / 0.06)'
          }}
        >
          {/* Section 1: Main Texts */}
          <div className="mb-8">
            <h3 className="font-bold text-lg text-foreground mb-5">Textos principales</h3>
            <div className="space-y-5">
              <div>
                <Label htmlFor="titulo">Título del servicio *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subtitulo">Subtítulo</Label>
                <Input
                  id="subtitulo"
                  value={formData.subtitulo}
                  onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="mt-1.5"
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.descripcion.length}/200 caracteres
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Features */}
          <div className="mb-8 pt-6 border-t border-border">
            <h3 className="font-bold text-lg text-foreground mb-5">Características del servicio</h3>
            <div className="space-y-4">
              {formData.caracteristicas.map((carac, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle size={20} style={{ color: 'hsl(218 69% 58%)' }} className="flex-shrink-0" />
                  <Input
                    value={carac}
                    onChange={(e) => handleCaracteristicaChange(index, e.target.value)}
                    placeholder={`Característica ${index + 1}`}
                    maxLength={60}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Prices */}
          <div className="mb-8 pt-6 border-t border-border">
            <h3 className="font-bold text-lg text-foreground mb-5">Precios y Tiempos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <Label htmlFor="precioChicas">Precio máquinas chicas (MXN) *</Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="precioChicas"
                    type="number"
                    value={formData.precioChicas}
                    onChange={(e) => setFormData({ ...formData, precioChicas: Number(e.target.value) })}
                    className="pl-7"
                    min={1}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="precioGrandes">Precio máquinas grandes (MXN) *</Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="precioGrandes"
                    type="number"
                    value={formData.precioGrandes}
                    onChange={(e) => setFormData({ ...formData, precioGrandes: Number(e.target.value) })}
                    className="pl-7"
                    min={1}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="max-w-xs">
              <Label htmlFor="tiempoCiclo">Tiempo de ciclo (minutos)</Label>
              <div className="relative mt-1.5">
                <Input
                  id="tiempoCiclo"
                  type="number"
                  value={formData.tiempoCiclo}
                  onChange={(e) => setFormData({ ...formData, tiempoCiclo: Number(e.target.value) })}
                  min={1}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">min</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/admin/servicios')}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              style={{ background: 'hsl(240 100% 50%)' }}
              className="text-primary-foreground hover:opacity-90"
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditAutoservicio;
