import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Promotions from '@/components/Promotions';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Billing from '@/components/Billing';
import Branches from '@/components/Branches';
import Footer from '@/components/Footer';
import TerminosCondiciones from '@/components/TerminosCondiciones';
import WhatsAppNotificationsSection from '@/components/WhatsAppNotificationsSection';
import WhatsAppCTA from '@/components/WhatsAppCTA';

const Index: React.FC = () => {
  return (
    <div className="w-full relative bg-white">
      <Header />
      <main>
        <Hero />
        <Promotions />
        <Benefits />
        <Services />
        <TerminosCondiciones message={"*[1]: El servicio de lavado por encargo con entrega el mismo día está disponible de lunes a viernes para pedidos recibidos antes de las 11:00 a. m."} />
        <WhatsAppNotificationsSection />
        <Billing />
        <Branches />
        <WhatsAppCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
