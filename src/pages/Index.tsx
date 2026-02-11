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
      <div>
        <Header />
      </div>
      <main>
        <div>
          <Hero />
        </div>
        <div>
          <Promotions />
        </div>
        <div>
          <Services />
        </div>
        <div>
          <Facilities />
        </div>
        <div>
          <WhatsAppNotificationsSection />
        </div>
        <div>
          <Billing />
        </div>
        <div>
          <Branches />
        </div>
        <div>
          <WhatsAppCTA />
        </div>
        <div>
          <TerminosCondiciones
            message={
              "*[1]: El servicio de lavado por encargo con entrega el mismo día está disponible de lunes a viernes para pedidos recibidos antes de las 11:00 a. m."
            }
          />
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
