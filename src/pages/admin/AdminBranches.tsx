import { useState, useRef, useCallback } from 'react';
import { Plus, Edit, Trash2, MapPin, Upload, X, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

interface Branch {
  id: string;
  name: string;
  status: 'active' | 'upcoming';
  address?: string;
  hours?: string;
  mapsUrl?: string;
  zone?: string;
  image: string;
  createdAt: string;
}

const AdminBranches = () => {
  const [branches, setBranches] = useState<Branch[]>(() => {
    const stored = localStorage.getItem('admin_branches');
    return stored ? JSON.parse(stored) : [];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  
  // Form state
  const [formName, setFormName] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'upcoming'>('active');
  const [formAddress, setFormAddress] = useState('');
  const [formHours, setFormHours] = useState('');
  const [formMapsUrl, setFormMapsUrl] = useState('');
  const [formZone, setFormZone] = useState('');
  const [formImage, setFormImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeBranches = branches.filter(b => b.status === 'active');
  const upcomingBranches = branches.filter(b => b.status === 'upcoming');

  const saveBranches = (newBranches: Branch[]) => {
    setBranches(newBranches);
    localStorage.setItem('admin_branches', JSON.stringify(newBranches));
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

  const resetForm = () => {
    setFormName('');
    setFormStatus('active');
    setFormAddress('');
    setFormHours('');
    setFormMapsUrl('');
    setFormZone('');
    setFormImage('');
  };

  const openAddModal = () => {
    setEditMode(false);
    resetForm();
    setSelectedBranch(null);
    setModalOpen(true);
  };

  const openEditModal = (branch: Branch) => {
    setEditMode(true);
    setFormName(branch.name);
    setFormStatus(branch.status);
    setFormAddress(branch.address || '');
    setFormHours(branch.hours || '');
    setFormMapsUrl(branch.mapsUrl || '');
    setFormZone(branch.zone || '');
    setFormImage(branch.image);
    setSelectedBranch(branch);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim()) {
      toast.error('El nombre es requerido');
      return;
    }
    if (!formImage) {
      toast.error('La imagen es requerida');
      return;
    }
    if (formStatus === 'active') {
      if (!formAddress.trim()) {
        toast.error('La dirección es requerida para sucursales activas');
        return;
      }
      if (!formHours.trim()) {
        toast.error('El horario es requerido para sucursales activas');
        return;
      }
      if (!formMapsUrl.trim()) {
        toast.error('El link de Google Maps es requerido para sucursales activas');
        return;
      }
    }

    const branchData: Branch = {
      id: editMode && selectedBranch ? selectedBranch.id : Date.now().toString(),
      name: formName,
      status: formStatus,
      address: formStatus === 'active' ? formAddress : undefined,
      hours: formStatus === 'active' ? formHours : undefined,
      mapsUrl: formStatus === 'active' ? formMapsUrl : undefined,
      zone: formStatus === 'upcoming' ? formZone : undefined,
      image: formImage,
      createdAt: editMode && selectedBranch ? selectedBranch.createdAt : new Date().toISOString(),
    };

    if (editMode && selectedBranch) {
      const updated = branches.map(b => b.id === selectedBranch.id ? branchData : b);
      saveBranches(updated);
      toast.success('Sucursal actualizada');
    } else {
      saveBranches([...branches, branchData]);
      toast.success('Sucursal creada');
    }
    
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedBranch) {
      const filtered = branches.filter(b => b.id !== selectedBranch.id);
      saveBranches(filtered);
      toast.success('Sucursal eliminada');
      setDeleteOpen(false);
      setSelectedBranch(null);
    }
  };

  const BranchCard = ({ branch }: { branch: Branch }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0">
          <img 
            src={branch.image} 
            alt={branch.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-foreground">{branch.name}</h3>
              {branch.status === 'active' ? (
                <p className="text-sm text-dark-powder-blue line-clamp-2 mt-1">
                  {branch.address}
                </p>
              ) : (
                <p className="text-sm text-dark-powder-blue mt-1">
                  {branch.zone || 'Zona por definir'}
                </p>
              )}
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
              branch.status === 'active' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-andrea-blue/20 text-dark-powder-blue'
            }`}>
              {branch.status === 'active' ? 'Activa' : 'Próximamente'}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <button 
              onClick={() => openEditModal(branch)}
              className="p-2 rounded-lg hover:bg-gray-100 text-electric-blue"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={() => {
                setSelectedBranch(branch);
                setDeleteOpen(true);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
            >
              <Trash2 size={18} />
            </button>
            {branch.mapsUrl && (
              <a 
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 text-andrea-blue"
              >
                <MapPin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout 
      title="Gestión de Sucursales"
      description="Administra la información de tus sucursales activas y próximas"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              Activas
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                {activeBranches.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="gap-2">
              Próximamente
              <span className="bg-andrea-blue/20 text-dark-powder-blue px-2 py-0.5 rounded-full text-xs">
                {upcomingBranches.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={openAddModal} className="bg-electric-blue hover:bg-dark-powder-blue">
          <Plus size={20} className="mr-2" />
          Añadir nueva sucursal
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'active' ? (
          activeBranches.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-gray-400" size={40} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">No hay sucursales activas</h3>
              <p className="text-dark-powder-blue mb-6">Añade tu primera sucursal</p>
              <Button onClick={openAddModal} className="bg-electric-blue hover:bg-dark-powder-blue">
                Crear primera sucursal
              </Button>
            </div>
          ) : (
            activeBranches.map(branch => <BranchCard key={branch.id} branch={branch} />)
          )
        ) : (
          upcomingBranches.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-gray-400" size={40} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">No hay sucursales próximas</h3>
              <p className="text-dark-powder-blue mb-6">Añade una sucursal con estado "Próximamente"</p>
              <Button onClick={openAddModal} className="bg-electric-blue hover:bg-dark-powder-blue">
                Añadir sucursal
              </Button>
            </div>
          ) : (
            upcomingBranches.map(branch => <BranchCard key={branch.id} branch={branch} />)
          )
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Editar sucursal' : 'Nueva sucursal'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la sucursal *</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ej: Plaza Polígono"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Estado de la sucursal *</Label>
              <Select value={formStatus} onValueChange={(v: 'active' | 'upcoming') => setFormStatus(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="upcoming">Próximamente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active-only fields */}
            {formStatus === 'active' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección completa *</Label>
                  <Textarea
                    id="address"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Calle X #123, Col. Centro, Mérida, Yuc."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Horario de atención *</Label>
                  <Input
                    id="hours"
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    placeholder="Lun - Dom: 8:00 AM - 10:00 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mapsUrl">Link de Google Maps *</Label>
                  <Input
                    id="mapsUrl"
                    type="url"
                    value={formMapsUrl}
                    onChange={(e) => setFormMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                  />
                </div>
              </>
            )}

            {/* Upcoming-only fields */}
            {formStatus === 'upcoming' && (
              <div className="space-y-2">
                <Label htmlFor="zone">Zona o colonia</Label>
                <Input
                  id="zone"
                  value={formZone}
                  onChange={(e) => setFormZone(e.target.value)}
                  placeholder="Ej: Zona Norte"
                />
              </div>
            )}

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Imagen de sucursal *</Label>
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
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-electric-blue hover:bg-dark-powder-blue">
              Guardar sucursal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar esta sucursal?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La sucursal será eliminada permanentemente.
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

export default AdminBranches;
