
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Clock, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Calculator,
      title: 'Calculadora Trabalhista',
      description: 'Realize cálculos trabalhistas precisos e detalhados',
      action: 'Calcular Agora',
      link: '/calculadora'
    },
    {
      icon: Clock,
      title: 'Histórico de Cálculos',
      description: 'Acesse seus cálculos salvos anteriormente',
      action: 'Ver Histórico',
      link: '/historico'
    },
    {
      icon: Trophy,
      title: 'Plano Premium',
      description: 'Acesse recursos avançados e cálculos ilimitados',
      action: user?.plan === 'premium' ? 'Gerenciar Plano' : 'Fazer Upgrade',
      link: '/planos'
    }
  ];

  const trialDaysLeft = user?.trial_end_date 
    ? Math.max(0, Math.ceil((new Date(user.trial_end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-juriscalc-navy mb-2">
          Bem-vindo, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Acesse suas ferramentas de cálculo trabalhista
        </p>
      </div>

      {user?.plan === 'standard' && trialDaysLeft > 0 && (
        <Card className="mb-6 border-juriscalc-gold bg-juriscalc-gold/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-juriscalc-gold">Período de Avaliação</h3>
                <p className="text-sm text-gray-600">
                  {trialDaysLeft} dias restantes no seu período de avaliação gratuito
                </p>
              </div>
              <Button className="bg-juriscalc-gold hover:bg-juriscalc-gold/90">
                Fazer Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="juriscalc-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <feature.icon className="w-10 h-10 text-juriscalc-blue mb-2" />
              <CardTitle className="text-juriscalc-navy">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy">
                <Link to={feature.link}>{feature.action}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="juriscalc-card">
          <CardHeader>
            <CardTitle className="text-juriscalc-navy">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cálculos realizados</span>
                <span className="font-semibold text-juriscalc-blue">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Último acesso</span>
                <span className="font-semibold">Hoje</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plano atual</span>
                <span className="font-semibold capitalize">{user?.plan}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="juriscalc-card">
          <CardHeader>
            <CardTitle className="text-juriscalc-navy">Recursos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Nova atualização da CLT</p>
                <p className="text-gray-500">Valores atualizados para 2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Cálculo de férias aprimorado</p>
                <p className="text-gray-500">Maior precisão nos cálculos</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Export para PDF</p>
                <p className="text-gray-500">Baixe seus cálculos em PDF</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
