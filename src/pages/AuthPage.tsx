import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen juriscalc-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="IusCalc" className="w-24 h-24 mx-auto mb-4" />
          {/* <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">IusCalc</h1> */}
          <p className="text-white drop-shadow-lg">Calculadora Jurídica Trabalhista</p>
        </div>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/20 backdrop-blur-sm text-white">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-white data-[state=active]:text-juriscalc-navy"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="data-[state=active]:bg-white data-[state=active]:text-juriscalc-navy"
            >
              Criar Conta
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
