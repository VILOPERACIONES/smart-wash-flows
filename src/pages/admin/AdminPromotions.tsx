import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, RefreshCw, Trash2, ImagePlus, Calendar, Monitor, Smartphone, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const AdminPromotions = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const stored = localStorage.getItem('admin_promotions');
    return stored ? JSON.parse(stored) : [];
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  // Check if any promotions need migration
  const hasLegacyPromotions = promotions.some(p => p.image && !p.imagenes);

  const savePromotions = (newPromotions: Promotion[]) => {
    setPromotions(newPromotions);
    localStorage.setItem('admin_promotions', JSON.stringify(newPromotions));
  };

  const handleDelete = () => {
    if (selectedPromotion) {
      const filtered = promotions.filter(p => p.id !== selectedPromotion.id);
      savePromotions(filtered);
      toast.success('Promoción eliminada');
      setDeleteOpen(false);
      setSelectedPromotion(null);
    }
  };

  const toggleActive = (promotion: Promotion) => {
    const updated = promotions.map(p =>
      p.id === promotion.id ? { ...p, active: !p.active } : p
    );
    savePromotions(updated);
    toast.success(promotion.active ? 'Promoción desactivada' : 'Promoción activada');
  };

  // Helper to get the display image (desktop first, then mobile, then legacy)
  const getDisplayImage = (promotion: Promotion): string | null => {
    if (promotion.imagenes?.desktop?.url) return promotion.imagenes.desktop.url;
    if (promotion.imagenes?.mobile?.url) return promotion.imagenes.mobile.url;
    if (promotion.image) return promotion.image;
    return null;
  };

  // Helper to check if images exist
  const hasDesktopImage = (promotion: Promotion): boolean => {
    return !!(promotion.imagenes?.desktop?.url || promotion.image);
  };

  const hasMobileImage = (promotion: Promotion): boolean => {
    return !!(promotion.imagenes?.mobile?.url || promotion.image);
  };

  return (
    <AdminLayout
      title="Gestión de Promociones"
      description="Administra las imágenes del carrusel de promociones en la página de inicio"
    >
      {/* Legacy promotions warning */}
      {hasLegacyPromotions && (
        <div className="flex items-start gap-3 p-4 rounded-xl mb-6" style={{ 
          background: 'rgba(234, 179, 8, 0.1)', 
          borderLeft: '4px solid #EAB308' 
        }}>
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm" style={{ color: '#92400E' }}>
            <strong>Nota:</strong> Las promociones antiguas usan la misma imagen para desktop y mobile. 
            Edítalas para cargar imágenes optimizadas.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div />
        <Button
          onClick={() => navigate('/admin/promociones/nueva')}
          className="admin-btn-primary h-12 px-7 rounded-[10px] font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Añadir nueva promoción
        </Button>
      </div>

      {/* Grid */}
      {promotions.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'hsl(218 69% 58% / 0.1)' }}
          >
            <ImagePlus className="text-accent" size={40} style={{ opacity: 0.5 }} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No hay promociones creadas</h3>
          <p className="text-secondary mb-8 max-w-md mx-auto">
            Añade tu primera promoción para mostrar en el carrusel de la página principal
          </p>
          <Button
            onClick={() => navigate('/admin/promociones/nueva')}
            className="admin-btn-primary h-12 px-8 rounded-[10px] font-semibold"
          >
            Crear primera promoción
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => {
            const displayImage = getDisplayImage(promotion);
            const hasDesktop = hasDesktopImage(promotion);
            const hasMobile = hasMobileImage(promotion);
            
            return (
              <div key={promotion.id} className="admin-card overflow-hidden group">
                <div className="aspect-video relative bg-muted overflow-hidden">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={promotion.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImagePlus className="text-muted-foreground" size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye
                      className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      size={32}
                    />
                  </div>
                  
                  {/* Device indicators */}
                  <div className="absolute bottom-2 right-2 flex gap-1.5 px-2.5 py-1.5 rounded-tl-lg" style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
                    <Monitor 
                      size={16} 
                      className="text-white transition-opacity"
                      style={{ opacity: hasDesktop ? 1 : 0.3 }}
                    />
                    <Smartphone 
                      size={16} 
                      className="text-white transition-opacity"
                      style={{ opacity: hasMobile ? 1 : 0.3 }}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground truncate text-[0.95rem]">{promotion.name}</p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-secondary">
                        <Calendar size={14} />
                        <span className="text-xs">
                          {new Date(promotion.createdAt).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                        promotion.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {promotion.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>

                  {/* Image status badges */}
                  <div className="flex gap-2 mb-4">
                    <span 
                      className={`px-2.5 py-1 rounded-xl text-xs font-medium ${
                        hasDesktop 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      Desktop: {hasDesktop ? '✓' : '✗'}
                    </span>
                    <span 
                      className={`px-2.5 py-1 rounded-xl text-xs font-medium ${
                        hasMobile 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      Mobile: {hasMobile ? '✓' : '✗'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPromotion(promotion);
                          setPreviewOpen(true);
                        }}
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'hsl(218 69% 58% / 0.1)' }}
                      >
                        <Eye size={18} className="text-accent" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/promociones/editar/${promotion.id}`)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'hsl(240 100% 50% / 0.1)' }}
                      >
                        <RefreshCw size={18} className="text-primary" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPromotion(promotion);
                          setDeleteOpen(true);
                        }}
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'hsl(0 84% 60% / 0.1)' }}
                      >
                        <Trash2 size={18} className="text-destructive" />
                      </button>
                    </div>
                    <Switch checked={promotion.active} onCheckedChange={() => toggleActive(promotion)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal with Tabs */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-[900px] admin-modal p-0">
          <DialogHeader className="p-6 border-b border-border">
            <DialogTitle className="text-xl font-bold">{selectedPromotion?.name}</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {selectedPromotion && (
              <Tabs defaultValue="desktop" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="desktop" className="flex items-center gap-2">
                    <Monitor size={16} />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="flex items-center gap-2">
                    <Smartphone size={16} />
                    Mobile
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="desktop" className="mt-0">
                  {selectedPromotion.imagenes?.desktop?.url || selectedPromotion.image ? (
                    <img
                      src={selectedPromotion.imagenes?.desktop?.url || selectedPromotion.image}
                      alt={selectedPromotion.name}
                      className="w-full rounded-xl"
                    />
                  ) : (
                    <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                      <p className="text-muted-foreground">No hay imagen de desktop</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="mobile" className="mt-0">
                  {selectedPromotion.imagenes?.mobile?.url || selectedPromotion.image ? (
                    <img
                      src={selectedPromotion.imagenes?.mobile?.url || selectedPromotion.image}
                      alt={selectedPromotion.name}
                      className="max-w-[400px] mx-auto rounded-xl"
                    />
                  ) : (
                    <div className="aspect-[2/3] max-w-[400px] mx-auto bg-muted rounded-xl flex items-center justify-center">
                      <p className="text-muted-foreground">No hay imagen de mobile</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="admin-modal">
          <AlertDialogHeader className="p-8">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-destructive" size={32} />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-center">
              ¿Estás seguro de eliminar esta promoción?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-secondary">
              Esta acción no se puede deshacer. La promoción será eliminada permanentemente del
              carrusel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="p-6 border-t border-border bg-muted">
            <AlertDialogCancel className="h-11 px-6 font-semibold">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-11 px-6 font-bold bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminPromotions;
