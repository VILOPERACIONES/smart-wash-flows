import { Helmet } from "react-helmet-async";
import { ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Facturacion = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Facturación | A LAVAR - Solicita tu CFDI</title>
        <meta 
          name="description" 
          content="Solicita tu factura electrónica (CFDI) de A LAVAR de manera fácil y rápida. Solo necesitas tu ticket de compra." 
        />
        <link rel="canonical" href="https://alavar.mx/facturacion" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20 md:py-32 bg-muted">
          <div className="container px-6 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Construction className="w-10 h-10 text-accent" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Página en construcción
              </h1>
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                Estamos trabajando en el sistema de facturación. Pronto podrás solicitar tu CFDI directamente desde aquí.
              </p>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Facturacion;
