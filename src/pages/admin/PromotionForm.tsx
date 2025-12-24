import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Promotion {
  id: string;
  name: string;
  image: string;
  active: boolean;
  createdAt: string;
}

const PromotionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formName, setFormName] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && id) {
      const stored = localStorage.getItem('admin_promotions');
      if (stored) {
        const promotions: Promotion[] = JSON.parse(stored);
        const promotion = promotions.find(p => p.id === id);
        if (promotion) {
          setFormName(promotion.name);
          setFormImage(promotion.image);
          setFormActive(promotion.active);
        }
      }
    }
  }, [id, isEdit]);

  const handleFileChange = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('El archivo es demasiado grande (máx. 5MB)');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Formato no soportado. Usa JPG, PNG o WEBP');
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormImage(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  }, []);

  const handleSave = () => {
    if (!formImage) {
      toast.error('Por favor, sube una imagen');
      return;
    }

    setSaving(true);
    
    setTimeout(() => {
      const stored = localStorage.getItem('admin_promotions');
      const promotions: Promotion[] = stored ? JSON.parse(stored) : [];

      if (isEdit && id) {
        const updated = promotions.map(p =>
          p.id === id
            ? { ...p, name: formName, image: formImage, active: formActive }
            : p
        );
        localStorage.setItem('admin_promotions', JSON.stringify(updated));
        toast.success('Promoción actualizada');
      } else {
        const newPromotion: Promotion = {
          id: Date.now().toString(),
          name: formName || `Promoción ${promotions.length + 1}`,
          image: formImage,
          active: formActive,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('admin_promotions', JSON.stringify([...promotions, newPromotion]));
        toast.success('Promoción creada');
      }

      setSaving(false);
      navigate('/admin/promociones');
    }, 500);
  };

  return (
    <AdminLayout
      title={isEdit ? 'Editar Promoción' : 'Nueva Promoción'}
      description="Sube una imagen para el carrusel de promociones en la página de inicio"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/promociones')}
        className="flex items-center gap-2 text-accent hover:text-primary transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        <span>Volver a Promociones</span>
      </button>

      {/* Form Card */}
      <div className="max-w-[800px] mx-auto">
        <div className="admin-card p-10">
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Imagen de promoción *</Label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`admin-dropzone ${dragActive ? 'drag-active' : ''}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  className="hidden"
                />

                {uploading ? (
                  <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
                ) : formImage ? (
                  <div className="relative">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-xl"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormImage('');
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-16 h-16 mx-auto text-accent mb-4" />
                    <p className="text-foreground font-semibold text-lg mb-1">
                      Arrastra una imagen aquí
                    </p>
                    <p className="text-secondary text-[0.95rem] mb-3">
                      o haz clic para seleccionar
                    </p>
                    <p className="text-muted-foreground text-sm">
                      JPG, PNG, WEBP • Máx 5MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-semibold">
                Nombre de la promoción (opcional)
              </Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ej: Promoción Diciembre"
                className="h-12 rounded-[10px] border-[1.5px]"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
              <Label htmlFor="active" className="text-foreground font-medium cursor-pointer">
                Publicar inmediatamente
              </Label>
              <Switch
                id="active"
                checked={formActive}
                onCheckedChange={setFormActive}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/promociones')}
              className="h-11 px-6 font-semibold rounded-lg order-2 sm:order-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="admin-btn-primary h-11 px-8 font-bold rounded-lg order-1 sm:order-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : isEdit ? (
                'Guardar Cambios'
              ) : (
                'Crear Promoción'
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PromotionForm;
