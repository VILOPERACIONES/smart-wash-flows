import { useState, useRef, useCallback } from 'react';
import { Plus, Eye, RefreshCw, Trash2, Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div />
        <Button onClick={openAddModal} className="bg-electric-blue hover:bg-dark-powder-blue">
          <Plus size={20} className="mr-2" />
          Añadir nueva promoción
        </Button>
      </div>

      {/* Grid */}
      {promotions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No hay promociones creadas</h3>
          <p className="text-dark-powder-blue mb-6">Añade tu primera promoción para mostrar en el carrusel</p>
          <Button onClick={openAddModal} className="bg-electric-blue hover:bg-dark-powder-blue">
            Crear primera promoción
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <div key={promotion.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={promotion.image} 
                  alt={promotion.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-foreground truncate">{promotion.name}</p>
                  <p className="text-xs text-dark-powder-blue">
                    {new Date(promotion.createdAt).toLocaleDateString('es-MX')}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  promotion.active 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {promotion.active ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setSelectedPromotion(promotion);
                      setPreviewOpen(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 text-andrea-blue"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => openEditModal(promotion)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-electric-blue"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedPromotion(promotion);
                      setDeleteOpen(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <Switch 
                  checked={promotion.active}
                  onCheckedChange={() => toggleActive(promotion)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Editar promoción' : 'Nueva promoción'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Image Upload */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                dragActive 
                  ? 'border-electric-blue bg-electric-blue/5' 
                  : 'border-andrea-blue hover:bg-andrea-blue/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                className="hidden"
              />
              
              {uploading ? (
                <Loader2 className="w-10 h-10 mx-auto text-electric-blue animate-spin" />
              ) : formImage ? (
                <div className="relative">
                  <img 
                    src={formImage} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormImage('');
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 mx-auto text-andrea-blue mb-3" />
                  <p className="text-foreground font-medium mb-1">
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-dark-powder-blue">
                    JPG, PNG o WEBP • Máx. 5MB
                  </p>
                </>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la promoción (opcional)</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ej: Promoción Diciembre"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Publicar inmediatamente</Label>
              <Switch 
                id="active"
                checked={formActive}
                onCheckedChange={setFormActive}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-electric-blue hover:bg-dark-powder-blue">
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedPromotion?.name}</DialogTitle>
          </DialogHeader>
          {selectedPromotion && (
            <img 
              src={selectedPromotion.image} 
              alt={selectedPromotion.name}
              className="w-full rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar esta promoción?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La promoción será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
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
