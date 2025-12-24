import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
  active: boolean;
}

const roleLabels = {
  admin: 'Administrador',
  editor: 'Editor',
  viewer: 'Visualizador',
};

const roleDescriptions = {
  admin: 'Acceso total a todos los módulos',
  editor: 'Puede editar promociones y sucursales',
  viewer: 'Solo puede ver, no editar',
};

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [formPermissions, setFormPermissions] = useState<string[]>(['promociones', 'sucursales']);
  const [formActive, setFormActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const stored = localStorage.getItem('admin_users');
      if (stored) {
        const users: StoredUser[] = JSON.parse(stored);
        const user = users.find(u => u.id === id);
        if (user) {
          setFormName(user.name);
          setFormEmail(user.email);
          setFormRole(user.role);
          setFormPermissions(user.permissions);
          setFormActive(user.active);
        }
      }
    }
  }, [id, isEdit]);

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormPermissions([...formPermissions, permission]);
    } else {
      setFormPermissions(formPermissions.filter(p => p !== permission));
    }
  };

  const handleSave = () => {
    if (!formName.trim() || !formEmail.trim()) {
      toast.error('Nombre y email son requeridos');
      return;
    }
    if (!isEdit && !formPassword.trim()) {
      toast.error('La contraseña es requerida');
      return;
    }

    const stored = localStorage.getItem('admin_users');
    const users: StoredUser[] = stored ? JSON.parse(stored) : [];

    if (users.some(u => u.email === formEmail && (!isEdit || u.id !== id)) || formEmail === 'admin@alavar.com') {
      toast.error('Email ya en uso');
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const userData: StoredUser = {
        id: isEdit && id ? id : Date.now().toString(),
        name: formName,
        email: formEmail,
        password: formPassword || (isEdit ? users.find(u => u.id === id)?.password || '' : ''),
        role: formRole,
        permissions: formRole === 'admin' ? ['promociones', 'sucursales', 'usuarios'] : formPermissions,
        active: formActive,
      };

      if (isEdit && id) {
        const updated = users.map(u => (u.id === id ? userData : u));
        localStorage.setItem('admin_users', JSON.stringify(updated));
        toast.success('Usuario actualizado');
      } else {
        localStorage.setItem('admin_users', JSON.stringify([...users, userData]));
        toast.success('Usuario invitado');
      }

      setSaving(false);
      navigate('/admin/usuarios');
    }, 500);
  };

  return (
    <AdminLayout
      title={isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
      description="Invita a un nuevo usuario al panel de administrador y asigna sus permisos"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/usuarios')}
        className="flex items-center gap-2 text-accent hover:text-primary transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        <span>Volver a Usuarios</span>
      </button>

      {/* Form Card */}
      <div className="max-w-[800px] mx-auto">
        <div className="admin-card p-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Nombre completo *</Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Juan Pérez"
                className="h-12 rounded-[10px] border-[1.5px]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Correo electrónico *</Label>
              <Input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="email@ejemplo.com"
                className="h-12 rounded-[10px] border-[1.5px]"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">
                Contraseña {isEdit ? '(dejar vacío para mantener)' : '*'}
              </Label>
              <Input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-[10px] border-[1.5px]"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Rol del usuario *</Label>
              <Select value={formRole} onValueChange={(v: 'admin' | 'editor' | 'viewer') => setFormRole(v)}>
                <SelectTrigger className="h-12 rounded-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <span className="font-medium">{label}</span>
                        <p className="text-xs text-secondary">
                          {roleDescriptions[key as keyof typeof roleDescriptions]}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Permissions */}
            {formRole !== 'admin' && (
              <div className="space-y-3">
                <Label className="font-semibold text-foreground">Permisos de acceso</Label>
                <div className="space-y-3 p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="perm-promociones"
                      checked={formPermissions.includes('promociones')}
                      onCheckedChange={(checked) => handlePermissionChange('promociones', !!checked)}
                    />
                    <label htmlFor="perm-promociones" className="text-sm font-medium cursor-pointer">
                      Promociones (ver/editar)
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="perm-sucursales"
                      checked={formPermissions.includes('sucursales')}
                      onCheckedChange={(checked) => handlePermissionChange('sucursales', !!checked)}
                    />
                    <label htmlFor="perm-sucursales" className="text-sm font-medium cursor-pointer">
                      Sucursales (ver/editar)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
              <Label className="text-foreground font-medium cursor-pointer">Usuario activo</Label>
              <Switch checked={formActive} onCheckedChange={setFormActive} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/usuarios')}
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
                'Enviar Invitación'
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserForm;
