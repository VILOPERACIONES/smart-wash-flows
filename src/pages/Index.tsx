import React, { useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Promotions from "@/components/Promotions";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import WaitingRoom from "@/components/WaitingRoom";
import Facilities from "@/components/Facilities";
import Billing from "@/components/Billing";
import Branches from "@/components/Branches";
import Footer from "@/components/Footer";
import TerminosCondiciones from "@/components/TerminosCondiciones";
import WhatsAppNotificationsSection from "@/components/WhatsAppNotificationsSection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import gsap from "gsap";

const Index: React.FC = () => {
  return (
    <div className="w-full relative bg-white">
      <div ref={headerRef}>
        <Header />
      </div>
      <main>
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={promotionsRef}>
          <Promotions />
        </div>
        <div ref={servicesRef}>
          <Services />
        </div>
        <div ref={facilitiesRef}>
          <Facilities />
        </div>
        <div ref={whatsappNotifRef}>
          <WhatsAppNotificationsSection />
        </div>
        <div ref={billingRef}>
          <Billing />
        </div>
        <div ref={branchesRef}>
          <Branches />
        </div>
        <div ref={whatsappCtaRef}>
          <WhatsAppCTA />
        </div>
        <div ref={terminosRef}>
          <TerminosCondiciones
            message={
              "*[1]: El servicio de lavado por encargo con entrega el mismo día está disponible de lunes a viernes para pedidos recibidos antes de las 11:00 a. m."
            }
          />
        </div>
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
