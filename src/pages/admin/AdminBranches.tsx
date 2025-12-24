import { useState, useRef, useCallback } from 'react';
import { Plus, Edit, Trash2, MapPin, Upload, X, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming'>('active');
  
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
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  }, []);

  const resetForm = () => {
    setFormName(''); setFormStatus('active'); setFormAddress('');
    setFormHours(''); setFormMapsUrl(''); setFormZone(''); setFormImage('');
  };

  const openAddModal = () => { setEditMode(false); resetForm(); setSelectedBranch(null); setModalOpen(true); };

  const openEditModal = (branch: Branch) => {
    setEditMode(true);
    setFormName(branch.name); setFormStatus(branch.status);
    setFormAddress(branch.address || ''); setFormHours(branch.hours || '');
    setFormMapsUrl(branch.mapsUrl || ''); setFormZone(branch.zone || '');
    setFormImage(branch.image); setSelectedBranch(branch); setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim()) { toast.error('El nombre es requerido'); return; }
    if (!formImage) { toast.error('La imagen es requerida'); return; }
    if (formStatus === 'active' && (!formAddress.trim() || !formHours.trim() || !formMapsUrl.trim())) {
      toast.error('Completa todos los campos requeridos para sucursales activas'); return;
    }

    const branchData: Branch = {
      id: editMode && selectedBranch ? selectedBranch.id : Date.now().toString(),
      name: formName, status: formStatus, image: formImage,
      address: formStatus === 'active' ? formAddress : undefined,
      hours: formStatus === 'active' ? formHours : undefined,
      mapsUrl: formStatus === 'active' ? formMapsUrl : undefined,
      zone: formStatus === 'upcoming' ? formZone : undefined,
      createdAt: editMode && selectedBranch ? selectedBranch.createdAt : new Date().toISOString(),
    };

    if (editMode && selectedBranch) {
      saveBranches(branches.map(b => b.id === selectedBranch.id ? branchData : b));
      toast.success('Sucursal actualizada');
    } else {
      saveBranches([...branches, branchData]);
      toast.success('Sucursal creada');
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedBranch) {
      saveBranches(branches.filter(b => b.id !== selectedBranch.id));
      toast.success('Sucursal eliminada');
      setDeleteOpen(false); setSelectedBranch(null);
    }
  };

  const displayBranches = activeTab === 'active' ? activeBranches : upcomingBranches;

  return (
    <AdminLayout title="Gestión de Sucursales" description="Administra la información de tus sucursales activas y próximas">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Premium Tabs */}
        <div className="inline-flex p-2 rounded-xl bg-card" style={{ boxShadow: '0 2px 8px hsl(0 0% 0% / 0.06)' }}>
          {(['active', 'upcoming'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold text-[0.95rem] transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              {tab === 'active' ? 'Activas' : 'Próximamente'}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab ? 'bg-primary-foreground/30' : 'bg-accent/20 text-secondary'
              }`}>
                {tab === 'active' ? activeBranches.length : upcomingBranches.length}
              </span>
            </button>
          ))}
        </div>
        <Button onClick={openAddModal} className="admin-btn-primary h-12 px-7 rounded-[10px] font-semibold">
          <Plus size={20} className="mr-2" />Añadir nueva sucursal
        </Button>
      </div>

      {displayBranches.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'hsl(218 69% 58% / 0.1)' }}>
            <MapPin className="text-accent" size={40} style={{ opacity: 0.5 }} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No hay sucursales {activeTab === 'active' ? 'activas' : 'próximas'}</h3>
          <p className="text-secondary mb-8">Añade tu primera sucursal</p>
          <Button onClick={openAddModal} className="admin-btn-primary h-12 px-8 rounded-[10px] font-semibold">Crear sucursal</Button>
        </div>
      ) : (
        <div className="admin-table">
          {displayBranches.map((branch) => (
            <div key={branch.id} className="flex flex-col sm:flex-row border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
              <div className="w-full sm:w-20 h-32 sm:h-20 flex-shrink-0">
                <img src={branch.image} alt={branch.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-foreground">{branch.name}</h3>
                  <p className="text-sm text-secondary mt-1 line-clamp-1">{branch.status === 'active' ? branch.address : branch.zone || 'Zona por definir'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${branch.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-accent/20 text-secondary'}`}>
                    {branch.status === 'active' ? 'Activa' : 'Próximamente'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(branch)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(240 100% 50% / 0.1)' }}>
                      <Edit size={18} className="text-primary" />
                    </button>
                    <button onClick={() => { setSelectedBranch(branch); setDeleteOpen(true); }} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 84% 60% / 0.1)' }}>
                      <Trash2 size={18} className="text-destructive" />
                    </button>
                    {branch.mapsUrl && (
                      <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(218 69% 58% / 0.1)' }}>
                        <MapPin size={18} className="text-accent" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto admin-modal">
          <DialogHeader className="p-8 pb-6 border-b border-border">
            <DialogTitle className="text-[1.75rem] font-bold">{editMode ? 'Editar sucursal' : 'Nueva sucursal'}</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="font-semibold">Nombre *</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Ej: Plaza Polígono" className="h-12 rounded-[10px] border-[1.5px]" />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Estado *</Label>
              <Select value={formStatus} onValueChange={(v: 'active' | 'upcoming') => setFormStatus(v)}>
                <SelectTrigger className="h-12 rounded-[10px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="upcoming">Próximamente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formStatus === 'active' && (
              <>
                <div className="space-y-2"><Label className="font-semibold">Dirección *</Label><Textarea value={formAddress} onChange={(e) => setFormAddress(e.target.value)} placeholder="Calle X #123..." rows={2} className="rounded-[10px] border-[1.5px]" /></div>
                <div className="space-y-2"><Label className="font-semibold">Horario *</Label><Input value={formHours} onChange={(e) => setFormHours(e.target.value)} placeholder="Lun - Dom: 8:00 AM - 10:00 PM" className="h-12 rounded-[10px] border-[1.5px]" /></div>
                <div className="space-y-2"><Label className="font-semibold">Link Google Maps *</Label><Input value={formMapsUrl} onChange={(e) => setFormMapsUrl(e.target.value)} placeholder="https://maps.google.com/..." className="h-12 rounded-[10px] border-[1.5px]" /></div>
              </>
            )}
            {formStatus === 'upcoming' && (
              <div className="space-y-2"><Label className="font-semibold">Zona</Label><Input value={formZone} onChange={(e) => setFormZone(e.target.value)} placeholder="Ej: Zona Norte" className="h-12 rounded-[10px] border-[1.5px]" /></div>
            )}
            <div className="space-y-2">
              <Label className="font-semibold">Imagen *</Label>
              <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={`admin-dropzone ${dragActive ? 'drag-active' : ''}`}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])} className="hidden" />
                {uploading ? <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" /> : formImage ? (
                  <div className="relative"><img src={formImage} alt="Preview" className="max-h-48 mx-auto rounded-xl" /><button onClick={(e) => { e.stopPropagation(); setFormImage(''); }} className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"><X size={16} /></button></div>
                ) : <><Upload className="w-16 h-16 mx-auto text-accent mb-4" /><p className="text-foreground font-semibold">Arrastra una imagen aquí</p><p className="text-secondary text-sm">o haz clic para seleccionar</p></>}
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-border bg-muted flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="h-11 px-6 font-semibold rounded-lg">Cancelar</Button>
            <Button onClick={handleSave} className="admin-btn-primary h-11 px-8 font-bold rounded-lg">Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="admin-modal">
          <AlertDialogHeader className="p-8">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4"><Trash2 className="text-destructive" size={32} /></div>
            <AlertDialogTitle className="text-xl font-bold text-center">¿Eliminar sucursal?</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-secondary">Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="p-6 border-t border-border bg-muted">
            <AlertDialogCancel className="h-11 px-6 font-semibold">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-11 px-6 font-bold bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminBranches;
