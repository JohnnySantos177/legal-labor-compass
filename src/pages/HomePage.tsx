
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Users, TrendingUp, FileText, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

export function HomePage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Cálculos Realizados",
      value: "1,234",
      icon: Calculator,
      color: "text-blue-600"
    },
    {
      title: "Tempo Economizado",
      value: "45h",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Clientes Atendidos",
      value: "89",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Precisão",
      value: "99.9%",
      icon: Award,
      color: "text-orange-600"
    }
  ];

  const recentCalculations = [
    {
      id: 1,
      client: "João Silva vs. Empresa ABC",
      type: "Verbas Rescisórias",
      value: "R$ 15.420,00",
      date: "15/12/2024"
    },
    {
      id: 2,
      client: "Maria Santos vs. Indústria XYZ",
      type: "Horas Extras",
      value: "R$ 8.750,00",
      date: "14/12/2024"
    },
    {
      id: 3,
      client: "Pedro Costa vs. Comércio 123",
      type: "Adicional Noturno",
      value: "R$ 3.200,00",
      date: "13/12/2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-juriscalc-navy mb-2">
            Bem-vindo de volta, {user?.name || 'Usuário'}!
          </h1>
          <p className="text-gray-600">
            Aqui está o resumo da sua atividade hoje.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription>
                  Acesse rapidamente as funcionalidades principais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start">
                  <Link to="/calculadora">
                    <Calculator className="w-4 h-4 mr-2" />
                    Nova Calculadora
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Meus Cálculos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Gerenciar Clientes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Relatórios
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Calculations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cálculos Recentes</CardTitle>
                <CardDescription>
                  Seus últimos cálculos realizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCalculations.map((calc) => (
                    <div
                      key={calc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {calc.client}
                        </h4>
                        <p className="text-sm text-gray-600">{calc.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-juriscalc-navy">
                          {calc.value}
                        </p>
                        <p className="text-sm text-gray-500">{calc.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Todos os Cálculos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Banner */}
        <Card className="mt-8 bg-gradient-to-r from-juriscalc-navy to-juriscalc-blue text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Upgrade para Premium
                </h3>
                <p className="text-white/90">
                  Desbloqueie recursos avançados e tenha cálculos ilimitados
                </p>
              </div>
              <Button 
                className="bg-juriscalc-yellow text-juriscalc-navy hover:bg-yellow-300"
              >
                Assinar Agora
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
