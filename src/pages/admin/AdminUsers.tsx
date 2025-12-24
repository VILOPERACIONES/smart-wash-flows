import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
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

  const handleDelete = () => {
    if (selectedUser) {
      saveUsers(users.filter((u) => u.id !== selectedUser.id));
      toast.success('Usuario eliminado');
      setDeleteOpen(false);
      setSelectedUser(null);
    }
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

      {/* Desktop Table */}
      <div className="admin-table hidden md:block">
        <div 
          className="grid gap-6 px-6 py-4 border-b-2 font-semibold text-[0.875rem]"
          style={{ 
            gridTemplateColumns: '18% 23% 13% 23% 10% 13%',
            background: 'hsl(210 20% 98%)',
            borderColor: 'hsl(220 13% 91%)',
            color: 'hsl(218 100% 31%)'
          }}
        >
          <span>Usuario</span>
          <span>Email</span>
          <span>Rol</span>
          <span>Permisos</span>
          <span>Estado</span>
          <span className="text-center">Acciones</span>
        </div>
        {allUsers.map((user) => (
          <div
            key={user.id}
            className="grid gap-6 px-6 py-5 border-b last:border-0 items-center transition-colors duration-200 hover:bg-muted/50"
            style={{ 
              gridTemplateColumns: '18% 23% 13% 23% 10% 13%',
              borderColor: 'hsl(220 14% 96%)'
            }}
          >
            {/* Usuario - Solo nombre, sin avatar */}
            <span className="font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {user.name}
            </span>

            {/* Email */}
            <span 
              className="text-[0.9rem] truncate"
              style={{ color: 'hsl(218 100% 31%)' }}
            >
              {user.email}
            </span>

            {/* Rol */}
            <span>
              <span
                className="px-3.5 py-1.5 rounded-full text-[0.8rem] font-semibold"
                style={{
                  background: user.role === 'admin' 
                    ? 'hsl(240 100% 50% / 0.1)' 
                    : user.role === 'editor' 
                      ? 'hsl(218 69% 58% / 0.1)' 
                      : 'hsl(220 13% 95%)',
                  color: user.role === 'admin' 
                    ? 'hsl(240 100% 50%)' 
                    : user.role === 'editor' 
                      ? 'hsl(218 69% 58%)' 
                      : 'hsl(220 9% 46%)',
                }}
              >
                {roleLabels[user.role]}
              </span>
            </span>

            {/* Permisos */}
            <div className="flex flex-wrap gap-2 items-start" style={{ marginRight: '32px' }}>
              {user.permissions.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-2xl text-[0.8rem] font-medium whitespace-nowrap"
                  style={{
                    background: 'hsl(218 69% 58% / 0.1)',
                    color: 'hsl(218 69% 58%)',
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              ))}
            </div>

            {/* Estado */}
            <span>
              <span
                className="px-3 py-1.5 rounded-full text-[0.8rem] font-semibold"
                style={{
                  background: user.active ? 'hsl(142 76% 91%)' : 'hsl(0 93% 94%)',
                  color: user.active ? 'hsl(153 61% 36%)' : 'hsl(0 72% 51%)',
                }}
              >
                {user.active ? 'Activo' : 'Inactivo'}
              </span>
            </span>

            {/* Acciones */}
            <div className="flex items-center justify-start gap-2">
              {user.id !== 'default' ? (
                <>
                  <button
                    onClick={() => navigate(`/admin/usuarios/editar/${user.id}`)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ background: 'hsl(218 69% 58% / 0.1)' }}
                    title="Editar usuario"
                  >
                    <Pencil size={18} style={{ color: 'hsl(218 69% 58%)' }} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteOpen(true);
                    }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ background: 'hsl(0 84% 60% / 0.1)' }}
                    title="Eliminar usuario"
                  >
                    <Trash2 size={18} style={{ color: 'hsl(0 72% 51%)' }} />
                  </button>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Principal</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {allUsers.map((user) => (
          <div key={user.id} className="admin-card p-5">
            <div className="mb-3">
              <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
              <p className="text-sm" style={{ color: 'hsl(218 100% 31%)' }}>{user.email}</p>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: user.role === 'admin' 
                    ? 'hsl(240 100% 50% / 0.1)' 
                    : user.role === 'editor' 
                      ? 'hsl(218 69% 58% / 0.1)' 
                      : 'hsl(220 13% 95%)',
                  color: user.role === 'admin' 
                    ? 'hsl(240 100% 50%)' 
                    : user.role === 'editor' 
                      ? 'hsl(218 69% 58%)' 
                      : 'hsl(220 9% 46%)',
                }}
              >
                {roleLabels[user.role]}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: user.active ? 'hsl(142 76% 91%)' : 'hsl(0 93% 94%)',
                  color: user.active ? 'hsl(153 61% 36%)' : 'hsl(0 72% 51%)',
                }}
              >
                {user.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {user.permissions.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium"
                  style={{
                    background: 'hsl(218 69% 58% / 0.1)',
                    color: 'hsl(218 69% 58%)',
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              ))}
            </div>

            {user.id !== 'default' && (
              <div className="flex gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => navigate(`/admin/usuarios/editar/${user.id}`)}
                  className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-medium text-sm"
                  style={{ background: 'hsl(218 69% 58% / 0.1)', color: 'hsl(218 69% 58%)' }}
                >
                  <Pencil size={16} />
                  Editar
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setDeleteOpen(true);
                  }}
                  className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-medium text-sm"
                  style={{ background: 'hsl(0 84% 60% / 0.1)', color: 'hsl(0 72% 51%)' }}
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent 
          className="max-w-[480px] p-0 overflow-hidden"
          style={{ 
            borderRadius: '16px',
            boxShadow: '0 25px 80px hsl(0 0% 0% / 0.3)'
          }}
        >
          <div 
            className="fixed inset-0 -z-10"
            style={{ 
              background: 'hsl(0 0% 0% / 0.6)',
              backdropFilter: 'blur(4px)'
            }}
          />
          <div className="p-8 text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'hsl(0 84% 60% / 0.1)' }}
            >
              <AlertTriangle size={32} style={{ color: 'hsl(0 72% 51%)' }} />
            </div>
            <AlertDialogTitle 
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'hsl(0 0% 0%)' }}
            >
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription 
              className="text-base mb-8"
              style={{ color: 'hsl(218 100% 31%)' }}
            >
              Esta acción eliminará permanentemente a{' '}
              <strong>{selectedUser?.name}</strong> del panel de administrador.
            </AlertDialogDescription>
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteOpen(false)}
                className="h-11 px-8 rounded-lg font-semibold transition-all duration-200 hover:bg-muted"
                style={{ 
                  background: 'hsl(0 0% 100%)',
                  border: '1.5px solid hsl(220 13% 91%)',
                  color: 'hsl(218 100% 31%)'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="h-11 px-8 rounded-lg font-bold transition-all duration-200"
                style={{ 
                  background: 'hsl(0 72% 51%)',
                  color: 'hsl(0 0% 100%)',
                  boxShadow: '0 4px 12px hsl(0 72% 51% / 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'hsl(0 72% 45%)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'hsl(0 72% 51%)'}
              >
                Eliminar
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminUsers;
