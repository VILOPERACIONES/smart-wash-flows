import { useState, useRef, useCallback } from 'react';
import { Plus, Eye, RefreshCw, Trash2, Upload, X, ImagePlus, Loader2, Calendar } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface Promotion {
  id: string;
  name: string;
  image: string;
  active: boolean;
  createdAt: string;
}

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const stored = localStorage.getItem('admin_promotions');
    return stored ? JSON.parse(stored) : [];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [editMode, setEditMode] = useState(false);
  
  // Form state
  const [formName, setFormName] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const savePromotions = (newPromotions: Promotion[]) => {
    setPromotions(newPromotions);
    localStorage.setItem('admin_promotions', JSON.stringify(newPromotions));
  };

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
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const openAddModal = () => {
    setEditMode(false);
    setFormName('');
    setFormImage('');
    setFormActive(true);
    setSelectedPromotion(null);
    setModalOpen(true);
  };

  const openEditModal = (promotion: Promotion) => {
    setEditMode(true);
    setFormName(promotion.name);
    setFormImage(promotion.image);
    setFormActive(promotion.active);
    setSelectedPromotion(promotion);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formImage) {
      toast.error('Por favor, sube una imagen');
      return;
    }

    if (editMode && selectedPromotion) {
      const updated = promotions.map(p => 
        p.id === selectedPromotion.id 
          ? { ...p, name: formName, image: formImage, active: formActive }
          : p
      );
      savePromotions(updated);
      toast.success('Promoción actualizada');
    } else {
      const newPromotion: Promotion = {
        id: Date.now().toString(),
        name: formName || `Promoción ${promotions.length + 1}`,
        image: formImage,
        active: formActive,
        createdAt: new Date().toISOString(),
      };
      savePromotions([...promotions, newPromotion]);
      toast.success('Promoción creada');
    }
    
    setModalOpen(false);
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

  return (
    <AdminLayout 
      title="Gestión de Promociones"
      description="Administra las imágenes del carrusel de promociones en la página de inicio"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div />
        <Button 
          onClick={openAddModal} 
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
          <p className="text-secondary mb-8 max-w-md mx-auto">Añade tu primera promoción para mostrar en el carrusel de la página principal</p>
          <Button 
            onClick={openAddModal} 
            className="admin-btn-primary h-12 px-8 rounded-[10px] font-semibold"
          >
            Crear primera promoción
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <div key={promotion.id} className="admin-card overflow-hidden group">
              <div className="aspect-video relative bg-muted overflow-hidden">
                <img 
                  src={promotion.image} 
                  alt={promotion.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                  <Eye className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground truncate text-[0.95rem]">{promotion.name}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-secondary">
                      <Calendar size={14} />
                      <span className="text-xs">
                        {new Date(promotion.createdAt).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    promotion.active 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {promotion.active ? 'Activa' : 'Inactiva'}
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
                      onClick={() => openEditModal(promotion)}
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
                  <Switch 
                    checked={promotion.active}
                    onCheckedChange={() => toggleActive(promotion)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[600px] admin-modal">
          <DialogHeader className="p-8 pb-6 border-b border-border">
            <DialogTitle className="text-[1.75rem] font-bold">
              {editMode ? 'Editar promoción' : 'Nueva promoción'}
            </DialogTitle>
            <p className="text-secondary text-[0.95rem] mt-2">
              {editMode ? 'Actualiza los detalles de la promoción' : 'Añade una nueva imagen al carrusel de promociones'}
            </p>
          </DialogHeader>
          
          <div className="p-8 space-y-6">
            {/* Image Upload */}
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

          <div className="p-6 border-t border-border bg-muted flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setModalOpen(false)}
              className="h-11 px-6 font-semibold rounded-lg"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              className="admin-btn-primary h-11 px-8 font-bold rounded-lg"
            >
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-[800px] admin-modal">
          <DialogHeader className="p-6 border-b border-border">
            <DialogTitle className="text-xl font-bold">{selectedPromotion?.name}</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {selectedPromotion && (
              <img 
                src={selectedPromotion.image} 
                alt={selectedPromotion.name}
                className="w-full rounded-xl"
              />
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
              Esta acción no se puede deshacer. La promoción será eliminada permanentemente del carrusel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="p-6 border-t border-border bg-muted">
            <AlertDialogCancel className="h-11 px-6 font-semibold">
              Cancelar
            </AlertDialogCancel>
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
