import { useState } from 'react';
import { Plus, Shield, Trash2, Users as UsersIcon } from 'lucide-react';
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
import { useAdminAuth, AdminUser } from '@/contexts/AdminAuthContext';

interface StoredUser extends AdminUser {
  password: string;
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

const roleColors = {
  admin: 'bg-electric-blue',
  editor: 'bg-andrea-blue',
  viewer: 'bg-gray-400',
};

const AdminUsers = () => {
  const { user: currentUser } = useAdminAuth();
  const [users, setUsers] = useState<StoredUser[]>(() => {
    const stored = localStorage.getItem('admin_users');
    return stored ? JSON.parse(stored) : [];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);
  const [editMode, setEditMode] = useState(false);
  
  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [formPermissions, setFormPermissions] = useState<string[]>(['promociones', 'sucursales']);
  const [formActive, setFormActive] = useState(true);

  const saveUsers = (newUsers: StoredUser[]) => {
    setUsers(newUsers);
    localStorage.setItem('admin_users', JSON.stringify(newUsers));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormRole('editor');
    setFormPermissions(['promociones', 'sucursales']);
    setFormActive(true);
  };

  const openAddModal = () => {
    setEditMode(false);
    resetForm();
    setSelectedUser(null);
    setModalOpen(true);
  };

  const openEditModal = (user: StoredUser) => {
    setEditMode(true);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormPassword('');
    setFormRole(user.role);
    setFormPermissions(user.permissions);
    setFormActive(user.active);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim()) {
      toast.error('El nombre es requerido');
      return;
    }
    if (!formEmail.trim()) {
      toast.error('El email es requerido');
      return;
    }
    if (!editMode && !formPassword.trim()) {
      toast.error('La contraseña es requerida');
      return;
    }

    // Check for duplicate email
    const emailExists = users.some(u => 
      u.email === formEmail && (!editMode || u.id !== selectedUser?.id)
    );
    if (emailExists || formEmail === 'admin@alavar.com') {
      toast.error('Este email ya está en uso');
      return;
    }

    const userData: StoredUser = {
      id: editMode && selectedUser ? selectedUser.id : Date.now().toString(),
      name: formName,
      email: formEmail,
      password: formPassword || (editMode && selectedUser ? selectedUser.password : ''),
      role: formRole,
      permissions: formRole === 'admin' ? ['promociones', 'sucursales', 'usuarios'] : formPermissions,
      active: formActive,
    };

    if (editMode && selectedUser) {
      const updated = users.map(u => u.id === selectedUser.id ? userData : u);
      saveUsers(updated);
      toast.success('Usuario actualizado');
    } else {
      saveUsers([...users, userData]);
      toast.success('Usuario invitado');
    }
    
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedUser) {
      const filtered = users.filter(u => u.id !== selectedUser.id);
      saveUsers(filtered);
      toast.success('Usuario eliminado');
      setDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  const toggleUserActive = (user: StoredUser) => {
    const updated = users.map(u => 
      u.id === user.id ? { ...u, active: !u.active } : u
    );
    saveUsers(updated);
    toast.success(user.active ? 'Usuario desactivado' : 'Usuario activado');
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormPermissions([...formPermissions, permission]);
    } else {
      setFormPermissions(formPermissions.filter(p => p !== permission));
    }
  };

  // Default admin user for display
  const defaultAdmin: StoredUser = {
    id: 'default',
    name: 'Administrador',
    email: 'admin@alavar.com',
    password: '',
    role: 'admin',
    permissions: ['promociones', 'sucursales', 'usuarios'],
    active: true,
  };

  const allUsers = [defaultAdmin, ...users];

  return (
    <AdminLayout 
      title="Gestión de Usuarios"
      description="Administra quién tiene acceso al panel y sus permisos"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div />
        <Button onClick={openAddModal} className="bg-electric-blue hover:bg-dark-powder-blue">
          <Plus size={20} className="mr-2" />
          Invitar usuario
        </Button>
      </div>

      {/* Users List */}
      {allUsers.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No hay usuarios</h3>
          <p className="text-dark-powder-blue mb-6">Invita a tu primer usuario al panel</p>
          <Button onClick={openAddModal} className="bg-electric-blue hover:bg-dark-powder-blue">
            Invitar usuario
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-dark-powder-blue">Usuario</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-dark-powder-blue">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-dark-powder-blue">Rol</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-dark-powder-blue">Permisos</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-dark-powder-blue">Estado</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-dark-powder-blue">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${roleColors[user.role]} flex items-center justify-center`}>
                          <span className="text-white font-medium text-sm">
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span className="font-bold text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-dark-powder-blue">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${roleColors[user.role]}`}>
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.map(p => (
                          <span key={p} className="px-2 py-0.5 bg-andrea-blue/10 text-dark-powder-blue rounded text-xs">
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {user.id !== 'default' && (
                          <>
                            <button 
                              onClick={() => openEditModal(user)}
                              className="p-2 rounded-lg hover:bg-gray-100 text-electric-blue"
                            >
                              <Shield size={18} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedUser(user);
                                setDeleteOpen(true);
                              }}
                              className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                            <Switch 
                              checked={user.active}
                              onCheckedChange={() => toggleUserActive(user)}
                            />
                          </>
                        )}
                        {user.id === 'default' && (
                          <span className="text-xs text-gray-400">Usuario principal</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {allUsers.map((user) => (
              <div key={user.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full ${roleColors[user.role]} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-medium">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">{user.name}</p>
                    <p className="text-sm text-dark-powder-blue truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${roleColors[user.role]}`}>
                        {roleLabels[user.role]}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                </div>
                {user.id !== 'default' && (
                  <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => openEditModal(user)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-electric-blue"
                    >
                      <Shield size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                    <Switch 
                      checked={user.active}
                      onCheckedChange={() => toggleUserActive(user)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Editar usuario' : 'Invitar usuario'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ej: Juan Pérez"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="email@ejemplo.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Contraseña {editMode ? '(dejar vacío para mantener)' : '*'}
              </Label>
              <Input
                id="password"
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>Rol del usuario *</Label>
              <Select value={formRole} onValueChange={(v: 'admin' | 'editor' | 'viewer') => setFormRole(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <span className="font-medium">{label}</span>
                        <p className="text-xs text-dark-powder-blue">
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
                <Label>Permisos de acceso</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="perm-promociones"
                      checked={formPermissions.includes('promociones')}
                      onCheckedChange={(checked) => handlePermissionChange('promociones', checked as boolean)}
                    />
                    <label htmlFor="perm-promociones" className="text-sm text-foreground">
                      Promociones (ver/editar)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="perm-sucursales"
                      checked={formPermissions.includes('sucursales')}
                      onCheckedChange={(checked) => handlePermissionChange('sucursales', checked as boolean)}
                    />
                    <label htmlFor="perm-sucursales" className="text-sm text-foreground">
                      Sucursales (ver/editar)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Usuario activo</Label>
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
              {editMode ? 'Guardar cambios' : 'Enviar invitación'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar este usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El usuario perderá acceso al panel.
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

export default AdminUsers;
