import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Users, Zap, Clock, TrendingUp, DollarSign, Package, Calculator } from 'lucide-react';
import { toast } from 'sonner';

// Placeholder para gráficos (se for integrar alguma lib de chart)
const PlaceholderChart = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-48 bg-gray-100 rounded-md dark:bg-gray-800">
    <p className="text-gray-500 dark:text-gray-400">Gráfico de {title}</p>
  </div>
);

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
}

const MetricCard = ({ icon, title, value, description }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export function AnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    activeUsersToday: 0,
    avgSessionDuration: '0s',
    calculationsPerformed: 0,
    totalRevenue: 'R$ 0,00',
    premiumPlanSubscriptions: 0,
    dailyUsers: Array(7).fill(0), // last 7 days
    calculationTypes: {},
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        setAnalyticsData({
          totalUsers: 1250,
          activeUsersToday: 120,
          avgSessionDuration: '05min 30s',
          calculationsPerformed: 8760,
          totalRevenue: 'R$ 15.230,50',
          premiumPlanSubscriptions: 345,
          dailyUsers: [90, 110, 100, 130, 120, 140, 120], // Simulated daily active users
          calculationTypes: {
            Rescisão: 4500,
            HorasExtras: 2500,
            Férias: 1000,
            FGTS: 760,
          },
        });
        toast.success('Dados de analytics carregados!');
      } catch (error) {
        toast.error('Erro ao carregar dados de analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-500">Carregando dados de analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          title="Total de Usuários"
          value={analyticsData.totalUsers}
          description="+20.1% desde o mês passado"
        />
        <MetricCard
          icon={<Zap className="h-4 w-4 text-muted-foreground" />}
          title="Usuários Ativos Hoje"
          value={analyticsData.activeUsersToday}
          description="+10.5% desde ontem"
        />
        <MetricCard
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          title="Duração Média da Sessão"
          value={analyticsData.avgSessionDuration}
          description="+5% desde o mês passado"
        />
        <MetricCard
          icon={<Calculator className="h-4 w-4 text-muted-foreground" />}
          title="Cálculos Realizados"
          value={analyticsData.calculationsPerformed}
          description="+15% desde o mês passado"
        />
        <MetricCard
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          title="Receita Total"
          value={analyticsData.totalRevenue}
          description="+25% desde o mês passado"
        />
        <MetricCard
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          title="Assinaturas Premium"
          value={analyticsData.premiumPlanSubscriptions}
          description="+8% desde o mês passado"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atividade Diária de Usuários</CardTitle>
          <CardDescription>Usuários ativos nos últimos 7 dias.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderChart title="Atividade Diária de Usuários" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tipos de Cálculos Mais Realizados</CardTitle>
          <CardDescription>Distribuição dos tipos de cálculos.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderChart title="Tipos de Cálculos" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral de Performance</CardTitle>
          <CardDescription>Métricas chave de performance do sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderChart title="Performance do Sistema" />
        </CardContent>
      </Card>
    </div>
  );
} 