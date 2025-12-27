import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Facturacion from "./pages/Facturacion";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPromotions from "./pages/admin/AdminPromotions";
import AdminBranches from "./pages/admin/AdminBranches";
import AdminUsers from "./pages/admin/AdminUsers";
import PromotionForm from "./pages/admin/PromotionForm";
import BranchForm from "./pages/admin/BranchForm";
import UserForm from "./pages/admin/UserForm";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/facturacion" element={<Facturacion />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/promociones" element={<AdminPromotions />} />
            <Route path="/admin/promociones/nueva" element={<PromotionForm />} />
            <Route path="/admin/promociones/editar/:id" element={<PromotionForm />} />
            <Route path="/admin/sucursales" element={<AdminBranches />} />
            <Route path="/admin/sucursales/nueva" element={<BranchForm />} />
            <Route path="/admin/sucursales/editar/:id" element={<BranchForm />} />
            <Route path="/admin/usuarios" element={<AdminUsers />} />
            <Route path="/admin/usuarios/nuevo" element={<UserForm />} />
            <Route path="/admin/usuarios/editar/:id" element={<UserForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
