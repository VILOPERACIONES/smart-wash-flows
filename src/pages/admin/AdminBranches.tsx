import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
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
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>(() => {
    const stored = localStorage.getItem('admin_branches');
    return stored ? JSON.parse(stored) : [];
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming'>('active');

  const activeBranches = branches.filter((b) => b.status === 'active');
  const upcomingBranches = branches.filter((b) => b.status === 'upcoming');

  const saveBranches = (newBranches: Branch[]) => {
    setBranches(newBranches);
    localStorage.setItem('admin_branches', JSON.stringify(newBranches));
  };

  const handleDelete = () => {
    if (selectedBranch) {
      saveBranches(branches.filter((b) => b.id !== selectedBranch.id));
      toast.success('Sucursal eliminada');
      setDeleteOpen(false);
      setSelectedBranch(null);
    }
  };

  const displayBranches = activeTab === 'active' ? activeBranches : upcomingBranches;

  return (
    <AdminLayout
      title="Gestión de Sucursales"
      description="Administra la información de tus sucursales activas y próximas"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Premium Tabs */}
        <div
          className="inline-flex p-2 rounded-xl bg-card"
          style={{ boxShadow: '0 2px 8px hsl(0 0% 0% / 0.06)' }}
        >
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
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab ? 'bg-primary-foreground/30' : 'bg-accent/20 text-secondary'
                }`}
              >
                {tab === 'active' ? activeBranches.length : upcomingBranches.length}
              </span>
            </button>
          ))}
        </div>
        <Button
          onClick={() => navigate('/admin/sucursales/nueva')}
          className="admin-btn-primary h-12 px-7 rounded-[10px] font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Añadir nueva sucursal
        </Button>
      </div>

      {displayBranches.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'hsl(218 69% 58% / 0.1)' }}
          >
            <MapPin className="text-accent" size={40} style={{ opacity: 0.5 }} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            No hay sucursales {activeTab === 'active' ? 'activas' : 'próximas'}
          </h3>
          <p className="text-secondary mb-8">Añade tu primera sucursal</p>
          <Button
            onClick={() => navigate('/admin/sucursales/nueva')}
            className="admin-btn-primary h-12 px-8 rounded-[10px] font-semibold"
          >
            Crear sucursal
          </Button>
        </div>
      ) : (
        <div className="admin-table">
          {displayBranches.map((branch) => (
            <div
              key={branch.id}
              className="flex flex-col sm:flex-row border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
            >
              <div className="w-full sm:w-20 h-32 sm:h-20 flex-shrink-0">
                <img src={branch.image} alt={branch.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-foreground">{branch.name}</h3>
                  <p className="text-sm text-secondary mt-1 line-clamp-1">
                    {branch.status === 'active' ? branch.address : branch.zone || 'Zona por definir'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      branch.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-accent/20 text-secondary'
                    }`}
                  >
                    {branch.status === 'active' ? 'Activa' : 'Próximamente'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/sucursales/editar/${branch.id}`)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'hsl(240 100% 50% / 0.1)' }}
                    >
                      <Edit size={18} className="text-primary" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBranch(branch);
                        setDeleteOpen(true);
                      }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'hsl(0 84% 60% / 0.1)' }}
                    >
                      <Trash2 size={18} className="text-destructive" />
                    </button>
                    {branch.mapsUrl && (
                      <a
                        href={branch.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: 'hsl(218 69% 58% / 0.1)' }}
                      >
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

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="admin-modal">
          <AlertDialogHeader className="p-8">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-destructive" size={32} />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-center">
              ¿Eliminar sucursal?
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

export default AdminBranches;
