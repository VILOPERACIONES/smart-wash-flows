import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Services from "@/components/Services";
import TechFeatures from "@/components/TechFeatures";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>A LAVAR | Lavandería Tecnológica - Rápido, Simple, Sin Complicaciones</title>
        <meta 
          name="description" 
          content="A LAVAR: lavandería urbana con tecnología de punta. Lavado por encargo $30/kg con entrega el mismo día. Autoservicio con equipos industriales. ¡Escríbenos por WhatsApp!" 
        />
        <meta name="keywords" content="lavandería, lavandería tecnológica, lavado por encargo, autoservicio lavandería, lavandería CDMX" />
        <link rel="canonical" href="https://alavar.mx" />
        
        {/* Open Graph */}
        <meta property="og:title" content="A LAVAR | Lavandería Tecnológica" />
        <meta property="og:description" content="Tecnología aplicada al lavado. Rápido, simple y sin complicaciones. Entrega el mismo día." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alavar.mx" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "A LAVAR",
            "description": "Lavandería tecnológica con servicio de lavado por encargo y autoservicio",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ciudad de México",
              "addressCountry": "MX"
            },
            "openingHours": ["Mo-Sa 07:00-21:00", "Su 08:00-18:00"],
            "telephone": "+525512345678"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <ValueProposition />
          <Services />
          <div id="tecnologia">
            <TechFeatures />
          </div>
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
