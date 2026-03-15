import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Empresa from "./pages/Empresa";
import Configuracoes from "./pages/Configuracoes";
import Campanhas from "./pages/Campanhas";
import Cardapio from "./pages/Cardapio";
import Relatorios from "./pages/Relatorios";
import MetricasVendas from "./pages/MetricasVendas";
import Clientes from "./pages/Clientes";
import Pedidos from "./pages/Pedidos";
import Horarios from "./pages/Horarios";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/campanhas" element={<Campanhas />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/metricas" element={<MetricasVendas />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/auth" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
