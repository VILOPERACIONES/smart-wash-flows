import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2, RefreshCw, Trash2, Monitor, Smartphone, Info, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ImageData {
  url: string;
  nombre: string;
  tamaño: string;
  dimensiones: string;
}

interface Promotion {
  id: string;
  name: string;
  image?: string; // Legacy field
  imagenes?: {
    desktop: ImageData | null;
    mobile: ImageData | null;
  };
  active: boolean;
  createdAt: string;
}

const PromotionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formName, setFormName] = useState('');
  const [desktopImage, setDesktopImage] = useState<ImageData | null>(null);
  const [mobileImage, setMobileImage] = useState<ImageData | null>(null);
  const [formActive, setFormActive] = useState(true);
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragActiveDesktop, setDragActiveDesktop] = useState(false);
  const [dragActiveMobile, setDragActiveMobile] = useState(false);

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && id) {
      const stored = localStorage.getItem('admin_promotions');
      if (stored) {
        const promotions: Promotion[] = JSON.parse(stored);
        const promotion = promotions.find(p => p.id === id);
        if (promotion) {
          setFormName(promotion.name);
          setFormActive(promotion.active);
          
          // Handle both new and legacy format
          if (promotion.imagenes) {
            setDesktopImage(promotion.imagenes.desktop);
            setMobileImage(promotion.imagenes.mobile);
          } else if (promotion.image) {
            // Legacy format - use same image for both
            const legacyImage: ImageData = {
              url: promotion.image,
              nombre: 'promocion.jpg',
              tamaño: 'N/A',
              dimensiones: 'N/A'
            };
            setDesktopImage(legacyImage);
            setMobileImage(legacyImage);
          }
        }
      }
    }
  }, [id, isEdit]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFileChange = (file: File, type: 'desktop' | 'mobile') => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('El archivo es demasiado grande (máx. 5MB)');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Formato no soportado. Usa JPG, PNG o WEBP');
      return;
    }

    const setUploading = type === 'desktop' ? setUploadingDesktop : setUploadingMobile;
    const setImage = type === 'desktop' ? setDesktopImage : setMobileImage;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const imageData: ImageData = {
          url: reader.result as string,
          nombre: file.name,
          tamaño: formatFileSize(file.size),
          dimensiones: `${img.width}x${img.height}`
        };
        setImage(imageData);
        setUploading(false);
        toast.success(`Imagen de ${type} cargada`);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = useCallback((e: React.DragEvent, type: 'desktop' | 'mobile') => {
    e.preventDefault();
    e.stopPropagation();
    const setDragActive = type === 'desktop' ? setDragActiveDesktop : setDragActiveMobile;
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: 'desktop' | 'mobile') => {
    e.preventDefault();
    e.stopPropagation();
    const setDragActive = type === 'desktop' ? setDragActiveDesktop : setDragActiveMobile;
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0], type);
  }, []);

  const handleSave = () => {
    if (!desktopImage && !mobileImage) {
      toast.error('Debes cargar al menos una imagen (desktop o mobile)');
      return;
    }

    setSaving(true);
    
    setTimeout(() => {
      const stored = localStorage.getItem('admin_promotions');
      const promotions: Promotion[] = stored ? JSON.parse(stored) : [];

      const promotionData = {
        name: formName || `Promoción ${promotions.length + 1}`,
        imagenes: {
          desktop: desktopImage,
          mobile: mobileImage
        },
        active: formActive
      };

      if (isEdit && id) {
        const updated = promotions.map(p =>
          p.id === id
            ? { ...p, ...promotionData, image: undefined }
            : p
        );
        localStorage.setItem('admin_promotions', JSON.stringify(updated));
        
        if (!desktopImage || !mobileImage) {
          toast.success('Promoción actualizada. Considera añadir imagen para ' + (!desktopImage ? 'desktop' : 'mobile'));
        } else {
          toast.success('Promoción actualizada');
        }
      } else {
        const newPromotion: Promotion = {
          id: Date.now().toString(),
          ...promotionData,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('admin_promotions', JSON.stringify([...promotions, newPromotion]));
        
        if (!desktopImage || !mobileImage) {
          toast.success('Promoción creada. Considera añadir imagen para ' + (!desktopImage ? 'desktop' : 'mobile'));
        } else {
          toast.success('Promoción creada');
        }
      }

      setSaving(false);
      navigate('/admin/promociones');
    }, 500);
  };

  const renderImageUpload = (
    type: 'desktop' | 'mobile',
    image: ImageData | null,
    setImage: (img: ImageData | null) => void,
    inputRef: React.RefObject<HTMLInputElement>,
    uploading: boolean,
    dragActive: boolean
  ) => {
    const isDesktop = type === 'desktop';
    
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <span 
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
              isDesktop 
                ? 'bg-primary/10 text-primary' 
                : 'bg-accent/10 text-accent'
            }`}
          >
            {isDesktop ? 'Desktop' : 'Mobile'}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px]">
                <p>
                  {isDesktop 
                    ? 'Se mostrará en pantallas mayores a 768px'
                    : 'Se mostrará en pantallas menores a 768px'
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Label className="font-semibold text-foreground flex items-center gap-1">
          Imagen para {isDesktop ? 'Desktop' : 'Mobile'}
          <span className="text-destructive">*</span>
        </Label>
        
        <p className="text-sm text-muted-foreground">
          Recomendado: {isDesktop ? '1200 x 675 px (16:9)' : '600 x 900 px (2:3 vertical)'}
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0], type)}
          className="hidden"
        />

        {uploading ? (
          <div className="border-2 border-dashed border-accent rounded-xl p-10 bg-accent/5 flex flex-col items-center justify-center min-h-[240px]">
            <Loader2 className="w-12 h-12 text-accent animate-spin mb-3" />
            <p className="text-muted-foreground">Cargando imagen...</p>
          </div>
        ) : image ? (
          <div className="relative group">
            <img
              src={image.url}
              alt={`Preview ${type}`}
              className={`w-full object-cover rounded-xl shadow-lg ${
                isDesktop ? 'aspect-video' : 'aspect-[2/3] max-w-[320px] mx-auto'
              }`}
            />
            
            {/* Hover overlay with actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center gap-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <RefreshCw size={20} />
              </button>
              <button
                onClick={() => {
                  setImage(null);
                  toast.info('Imagen eliminada');
                }}
                className="w-10 h-10 bg-destructive text-white rounded-lg flex items-center justify-center hover:bg-destructive/80 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Image info */}
            <div className="flex items-center justify-between mt-3 text-sm">
              <span className="text-muted-foreground truncate max-w-[150px]">{image.nombre}</span>
              <span className="text-accent">{image.tamaño}</span>
            </div>
          </div>
        ) : (
          <div
            onDragEnter={(e) => handleDrag(e, type)}
            onDragLeave={(e) => handleDrag(e, type)}
            onDragOver={(e) => handleDrag(e, type)}
            onDrop={(e) => handleDrop(e, type)}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all min-h-[240px] flex flex-col items-center justify-center ${
              dragActive
                ? 'border-primary bg-primary/5 scale-[1.01]'
                : 'border-accent bg-accent/[0.03] hover:border-primary hover:bg-primary/5'
            }`}
          >
            <Upload className="w-12 h-12 text-accent mb-3" />
            <p className="text-foreground font-medium mb-1">Arrastra la imagen aquí</p>
            <p className="text-muted-foreground text-sm mb-2">o haz clic para seleccionar</p>
            <p className="text-accent text-xs">JPG, PNG, WEBP • Máx 5MB</p>
          </div>
        )}
      </div>
    );
  };

  const hasOnlyOneImage = (desktopImage && !mobileImage) || (!desktopImage && mobileImage);

  return (
    <AdminLayout
      title={isEdit ? 'Editar Promoción' : 'Nueva Promoción'}
      description="Sube imágenes para desktop y mobile del carrusel de promociones"
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
      <div className="max-w-[1000px] mx-auto">
        <div className="admin-card p-8 md:p-10">
          <div className="space-y-8">
            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderImageUpload(
                'desktop',
                desktopImage,
                setDesktopImage,
                desktopInputRef,
                uploadingDesktop,
                dragActiveDesktop
              )}
              {renderImageUpload(
                'mobile',
                mobileImage,
                setMobileImage,
                mobileInputRef,
                uploadingMobile,
                dragActiveMobile
              )}
            </div>

            {/* Warning if only one image */}
            {hasOnlyOneImage && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Solo has cargado una imagen. Para mejor experiencia, sube imágenes optimizadas para desktop y mobile.
                </p>
              </div>
            )}

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
