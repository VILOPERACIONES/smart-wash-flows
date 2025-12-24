import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Shield, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
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

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
  active: boolean;
}

const roleLabels = { admin: 'Administrador', editor: 'Editor', viewer: 'Visualizador' };
const roleColors = {
  admin: 'hsl(240 100% 50%)',
  editor: 'hsl(218 69% 58%)',
  viewer: 'hsl(0 0% 60%)',
};

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<StoredUser[]>(() =>
    JSON.parse(localStorage.getItem('admin_users') || '[]')
  );
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);

  const saveUsers = (newUsers: StoredUser[]) => {
    setUsers(newUsers);
    localStorage.setItem('admin_users', JSON.stringify(newUsers));
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const handleDelete = () => {
    if (selectedUser) {
      saveUsers(users.filter((u) => u.id !== selectedUser.id));
      toast.success('Usuario eliminado');
      setDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  const toggleUserActive = (user: StoredUser) => {
    saveUsers(users.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u)));
    toast.success(user.active ? 'Usuario desactivado' : 'Usuario activado');
  };

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
      <div className="flex justify-end mb-8">
        <Button
          onClick={() => navigate('/admin/usuarios/nuevo')}
          className="admin-btn-primary h-12 px-7 rounded-[10px] font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Invitar usuario
        </Button>
      </div>

      <div className="admin-table">
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-muted border-b-2 border-border font-semibold text-sm text-secondary">
          <span>Usuario</span>
          <span>Email</span>
          <span>Rol</span>
          <span>Permisos</span>
          <span>Estado</span>
          <span className="text-right">Acciones</span>
        </div>
        {allUsers.map((user) => (
          <div
            key={user.id}
            className="grid md:grid-cols-6 gap-4 p-5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors items-center"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm"
                style={{
                  background: roleColors[user.role],
                  border: '2px solid hsl(0 0% 100%)',
                  boxShadow: '0 2px 8px hsl(0 0% 0% / 0.1)',
                }}
              >
                {getInitials(user.name)}
              </div>
              <span className="font-bold text-foreground">{user.name}</span>
            </div>
            <span className="text-secondary hidden md:block">{user.email}</span>
            <span className="hidden md:block">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground"
                style={{ background: roleColors[user.role] }}
              >
                {roleLabels[user.role]}
              </span>
            </span>
            <div className="hidden md:flex flex-wrap gap-1">
              {user.permissions.map((p) => (
                <span
                  key={p}
                  className="px-2 py-0.5 rounded-xl text-xs font-medium"
                  style={{
                    background: 'hsl(218 69% 58% / 0.1)',
                    color: 'hsl(218 100% 31%)',
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              ))}
            </div>
            <span className="hidden md:block">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.active ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                }`}
              >
                {user.active ? 'Activo' : 'Inactivo'}
              </span>
            </span>
            <div className="flex items-center justify-end gap-2">
              {user.id !== 'default' ? (
                <>
                  <button
                    onClick={() => navigate(`/admin/usuarios/editar/${user.id}`)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(240 100% 50% / 0.1)' }}
                  >
                    <Shield size={18} className="text-primary" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteOpen(true);
                    }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(0 84% 60% / 0.1)' }}
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </button>
                  <Switch checked={user.active} onCheckedChange={() => toggleUserActive(user)} />
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Principal</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="admin-modal">
          <AlertDialogHeader className="p-8">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-destructive" size={32} />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-center">
              ¿Eliminar usuario?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-secondary">
              Esta acción no se puede deshacer.
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

export default AdminUsers;
