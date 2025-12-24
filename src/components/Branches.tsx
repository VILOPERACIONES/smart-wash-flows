import { MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import branchImage from '@/assets/branch-1.jpg';

interface Branch {
  id: number;
  name: string;
  status: 'open' | 'coming-soon';
  address?: string;
  schedule?: string;
  zone?: string;
  mapUrl?: string;
}

const branches: Branch[] = [
  {
    id: 1,
    name: 'Sucursal Centro',
    status: 'open',
    address: 'Calle X #123, Col. Centro, Mérida, Yuc.',
    schedule: 'Lun - Dom: 8:00 AM - 10:00 PM',
    mapUrl: 'https://maps.google.com',
  },
  {
    id: 2,
    name: 'Sucursal Norte',
    status: 'coming-soon',
    zone: 'Zona Norte',
  },
  {
    id: 3,
    name: 'Sucursal Poniente',
    status: 'coming-soon',
    zone: 'Zona Poniente',
  },
];

const BranchCard = ({ branch }: { branch: Branch }) => {
  const isOpen = branch.status === 'open';

  return (
    <div className="bg-background border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col h-full">
      {/* Badge - Electric Blue for open, Dark Powder Blue for coming soon */}
      <div className="mb-4">
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium text-primary-foreground ${
            isOpen ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          {isOpen ? 'ABIERTO' : 'PRÓXIMAMENTE'}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-video rounded-xl mb-6 overflow-hidden">
        <img 
          src={branchImage} 
          alt={`Sucursal ${branch.name} de A LAVAR`}
          className="w-full h-full object-cover"
        />
        {!isOpen && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-lg">
              Próximamente
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-xl text-foreground mb-4">
          {branch.name}
        </h3>

        {isOpen ? (
          <>
            {/* Andrea Blue icons */}
            <div className="flex items-start gap-3 mb-3">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-secondary text-sm">{branch.address}</p>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-secondary text-sm">{branch.schedule}</p>
            </div>
          </>
        ) : (
          <p className="text-secondary text-sm mb-6">
            Muy pronto en {branch.zone}
          </p>
        )}

        <div className="mt-auto">
          {isOpen ? (
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                Ver en Google Maps
              </a>
            </Button>
          ) : (
            <Button disabled className="w-full bg-muted text-muted-foreground cursor-not-allowed">
              Próximamente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Branches = () => {
  return (
    <section id="sucursales" className="w-full bg-background py-[60px] md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-[2rem] md:text-[2.5rem] text-foreground mb-3">
            Nuestras Sucursales
          </h2>
          <p className="text-secondary text-lg">
            Encuentra la más cercana a ti
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;