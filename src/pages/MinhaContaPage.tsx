
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Mail, Phone, User, Calendar } from 'lucide-react';

export const MinhaContaPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const trialDaysLeft = user.trial_end_date 
    ? Math.max(0, Math.ceil((new Date(user.trial_end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-juriscalc-navy mb-8">Minha Conta</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="juriscalc-card">
          <CardHeader>
            <CardTitle className="text-juriscalc-navy flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Gerencie suas informações de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="juriscalc-label">Nome Completo</Label>
              <Input
                id="name"
                value={user.name}
                className="juriscalc-input"
                readOnly
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="juriscalc-label">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                className="juriscalc-input"
                readOnly
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="juriscalc-label">Telefone</Label>
              <Input
                id="phone"
                value={user.phone || 'Não informado'}
                className="juriscalc-input"
                readOnly
              />
            </div>
            
            <Button className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy">
              Editar Informações
            </Button>
          </CardContent>
        </Card>

        <Card className="juriscalc-card">
          <CardHeader>
            <CardTitle className="text-juriscalc-navy flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Plano e Assinatura
            </CardTitle>
            <CardDescription>
              Informações sobre seu plano atual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Plano Atual</span>
              <Badge variant={user.plan === 'premium' ? 'default' : 'secondary'} className="capitalize">
                {user.plan === 'premium' ? 'Premium' : 'Padrão'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Ativo
              </Badge>
            </div>
            
            {user.plan === 'standard' && user.trial_end_date && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avaliação termina em</span>
                <span className="font-semibold text-juriscalc-gold">
                  {trialDaysLeft} dias
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Membro desde</span>
              <span className="font-semibold">
                {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
            
            {user.plan === 'standard' ? (
              <Button className="w-full bg-juriscalc-gold hover:bg-juriscalc-gold/90">
                <Crown className="w-4 h-4 mr-2" />
                Fazer Upgrade para Premium
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                Gerenciar Assinatura
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="juriscalc-card mt-6">
        <CardHeader>
          <CardTitle className="text-juriscalc-navy">Estatísticas de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-juriscalc-blue mb-2">12</div>
              <div className="text-sm text-gray-600">Cálculos realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-juriscalc-blue mb-2">5</div>
              <div className="text-sm text-gray-600">Cálculos salvos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-juriscalc-blue mb-2">8</div>
              <div className="text-sm text-gray-600">Exportações PDF</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
