import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
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

const BranchForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formName, setFormName] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'upcoming'>('active');
  const [formAddress, setFormAddress] = useState('');
  const [formHours, setFormHours] = useState('');
  const [formMapsUrl, setFormMapsUrl] = useState('');
  const [formZone, setFormZone] = useState('');
  const [formImage, setFormImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && id) {
      const stored = localStorage.getItem('admin_branches');
      if (stored) {
        const branches: Branch[] = JSON.parse(stored);
        const branch = branches.find(b => b.id === id);
        if (branch) {
          setFormName(branch.name);
          setFormStatus(branch.status);
          setFormAddress(branch.address || '');
          setFormHours(branch.hours || '');
          setFormMapsUrl(branch.mapsUrl || '');
          setFormZone(branch.zone || '');
          setFormImage(branch.image);
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
    if (!formName.trim()) {
      toast.error('El nombre es requerido');
      return;
    }
    if (!formImage) {
      toast.error('La imagen es requerida');
      return;
    }
    if (formStatus === 'active' && (!formAddress.trim() || !formHours.trim() || !formMapsUrl.trim())) {
      toast.error('Completa todos los campos requeridos para sucursales activas');
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const stored = localStorage.getItem('admin_branches');
      const branches: Branch[] = stored ? JSON.parse(stored) : [];

      const branchData: Branch = {
        id: isEdit && id ? id : Date.now().toString(),
        name: formName,
        status: formStatus,
        image: formImage,
        address: formStatus === 'active' ? formAddress : undefined,
        hours: formStatus === 'active' ? formHours : undefined,
        mapsUrl: formStatus === 'active' ? formMapsUrl : undefined,
        zone: formStatus === 'upcoming' ? formZone : undefined,
        createdAt: isEdit ? branches.find(b => b.id === id)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      };

      if (isEdit && id) {
        const updated = branches.map(b => (b.id === id ? branchData : b));
        localStorage.setItem('admin_branches', JSON.stringify(updated));
        toast.success('Sucursal actualizada');
      } else {
        localStorage.setItem('admin_branches', JSON.stringify([...branches, branchData]));
        toast.success('Sucursal creada');
      }

      setSaving(false);
      navigate('/admin/sucursales');
    }, 500);
  };

  return (
    <AdminLayout
      title={isEdit ? 'Editar Sucursal' : 'Nueva Sucursal'}
      description="Agrega la información de tu sucursal para mostrarla en la página de inicio"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/sucursales')}
        className="flex items-center gap-2 text-accent hover:text-primary transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        <span>Volver a Sucursales</span>
      </button>

      {/* Form Card */}
      <div className="max-w-[900px] mx-auto">
        <div className="admin-card p-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Nombre de la sucursal *</Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ej: Plaza Polígono"
                className="h-12 rounded-[10px] border-[1.5px]"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Estado *</Label>
              <Select value={formStatus} onValueChange={(v: 'active' | 'upcoming') => setFormStatus(v)}>
                <SelectTrigger className="h-12 rounded-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="upcoming">Próximamente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Branch Fields */}
            {formStatus === 'active' && (
              <>
                <div className="space-y-2">
                  <Label className="font-semibold text-foreground">Dirección completa *</Label>
                  <Textarea
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Calle X #123, Colonia, Ciudad"
                    rows={2}
                    className="rounded-[10px] border-[1.5px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-foreground">Horario *</Label>
                  <Input
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    placeholder="Lun - Dom: 8:00 AM - 10:00 PM"
                    className="h-12 rounded-[10px] border-[1.5px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-foreground">Link Google Maps *</Label>
                  <Input
                    value={formMapsUrl}
                    onChange={(e) => setFormMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="h-12 rounded-[10px] border-[1.5px]"
                  />
                </div>
              </>
            )}

            {/* Upcoming Branch Fields */}
            {formStatus === 'upcoming' && (
              <div className="space-y-2">
                <Label className="font-semibold text-foreground">Zona o colonia</Label>
                <Input
                  value={formZone}
                  onChange={(e) => setFormZone(e.target.value)}
                  placeholder="Ej: Zona Norte"
                  className="h-12 rounded-[10px] border-[1.5px]"
                />
              </div>
            )}

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Imagen de la sucursal *</Label>
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
          </div>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/sucursales')}
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
                'Crear Sucursal'
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BranchForm;
