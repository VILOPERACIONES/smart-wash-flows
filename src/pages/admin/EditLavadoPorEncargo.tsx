import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

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

const EditLavadoPorEncargo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    caracteristicas: ['', '', '', ''],
    precioBase: 0,
    precioEspecialMin: 0,
    precioEspecialMax: 0,
    etiquetaEspecial: '',
    mostrarBadgePopular: true
  });

  useEffect(() => {
    const data = getServiciosData();
    setFormData({
      titulo: data.lavadoPorEncargo.titulo,
      subtitulo: data.lavadoPorEncargo.subtitulo,
      descripcion: data.lavadoPorEncargo.descripcion,
      caracteristicas: data.lavadoPorEncargo.caracteristicas,
      precioBase: data.lavadoPorEncargo.precioBase,
      precioEspecialMin: data.lavadoPorEncargo.preciosEspeciales.min,
      precioEspecialMax: data.lavadoPorEncargo.preciosEspeciales.max,
      etiquetaEspecial: data.lavadoPorEncargo.preciosEspeciales.etiqueta,
      mostrarBadgePopular: data.lavadoPorEncargo.mostrarBadgePopular
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
    if (formData.precioBase <= 0) {
      toast({ title: "Error", description: "El precio base debe ser mayor a 0", variant: "destructive" });
      return;
    }

    const allData = getServiciosData();
    allData.lavadoPorEncargo = {
      titulo: formData.titulo,
      subtitulo: formData.subtitulo,
      descripcion: formData.descripcion,
      caracteristicas: formData.caracteristicas.filter(c => c.trim()),
      precioBase: formData.precioBase,
      preciosEspeciales: {
        min: formData.precioEspecialMin,
        max: formData.precioEspecialMax,
        etiqueta: formData.etiquetaEspecial
      },
      mostrarBadgePopular: formData.mostrarBadgePopular
    };

    localStorage.setItem('admin_servicios', JSON.stringify(allData));
    toast({ title: "Éxito", description: "Servicio actualizado correctamente" });
    navigate('/admin/servicios');
  };

  return (
    <AdminLayout title="Editar Lavado por Encargo">
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
            <h3 className="font-bold text-lg text-foreground mb-5">Precios</h3>
            
            <div className="mb-6">
              <Label htmlFor="precioBase">Precio por kilogramo (MXN) *</Label>
              <div className="relative mt-1.5 max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="precioBase"
                  type="number"
                  value={formData.precioBase}
                  onChange={(e) => setFormData({ ...formData, precioBase: Number(e.target.value) })}
                  className="pl-7 pr-12"
                  min={1}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">/kg</span>
              </div>
            </div>

            <div className="pt-5 border-t border-border/50">
              <p className="font-semibold text-foreground mb-4">Precios especiales</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <Label htmlFor="precioMin">Mínimo (MXN)</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="precioMin"
                      type="number"
                      value={formData.precioEspecialMin}
                      onChange={(e) => setFormData({ ...formData, precioEspecialMin: Number(e.target.value) })}
                      className="pl-7"
                      min={0}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="precioMax">Máximo (MXN)</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="precioMax"
                      type="number"
                      value={formData.precioEspecialMax}
                      onChange={(e) => setFormData({ ...formData, precioEspecialMax: Number(e.target.value) })}
                      className="pl-7"
                      min={0}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="etiqueta">Etiqueta de precios especiales</Label>
                <Input
                  id="etiqueta"
                  value={formData.etiquetaEspecial}
                  onChange={(e) => setFormData({ ...formData, etiquetaEspecial: e.target.value })}
                  className="mt-1.5 max-w-md"
                  placeholder="Ej: Edredones y Hamacas"
                />
              </div>
            </div>
          </div>

          {/* Badge Toggle */}
          <div className="mb-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="badge">Mostrar badge "Más popular"</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Se mostrará en la landing page
                </p>
              </div>
              <Switch
                id="badge"
                checked={formData.mostrarBadgePopular}
                onCheckedChange={(checked) => setFormData({ ...formData, mostrarBadgePopular: checked })}
              />
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

export default EditLavadoPorEncargo;
