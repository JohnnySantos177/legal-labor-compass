import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navigation } from "@/components/Navigation";
import { AuthPage } from "@/pages/AuthPage";
import { HomePage } from "@/pages/HomePage";
import { CalculadoraPage } from "@/pages/CalculadoraPage";
import { MinhaContaPage } from "@/pages/MinhaContaPage";
import { SuperAdminPanel } from "@/pages/SuperAdminPanel";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  // Efeito para carregar o tema salvo no localStorage ao abrir o app
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          {/* Esta div garante que o fundo e o texto mudem em todas as páginas */}
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/cadastro" element={<AuthPage />} />
              <Route 
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <Navigation />
                    <SuperAdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calculadora" 
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <CalculadoraPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/minha-conta" 
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <MinhaContaPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/index" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;