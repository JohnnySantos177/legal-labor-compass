import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Settings,
  Calculator,
  FileText,
  Link,
  AlertTriangle,
  Save,
} from 'lucide-react';

export function SystemSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // Configurações Gerais
    systemName: 'IusCalc',
    maintenanceMode: false,
    allowNewRegistrations: true,
    defaultUserPlan: 'standard',
    
    // Configurações de Cálculo
    inssTable: '2024',
    fgtsRate: '8',
    irrfTable: '2024',
    
    // Configurações de Integração
    enableWhatsAppIntegration: true,
    enableEmailIntegration: true,
    enablePdfExport: true,
    
    // Configurações de Segurança
    passwordMinLength: '8',
    requireStrongPassword: true,
    sessionTimeout: '30',
  });

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulação de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSetting = (key: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações Gerais
          </CardTitle>
          <CardDescription>
            Configurações básicas do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="systemName">Nome do Sistema</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={e => handleUpdateSetting('systemName', e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode">Modo de Manutenção</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={checked => handleUpdateSetting('maintenanceMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allowNewRegistrations">Permitir Novos Registros</Label>
              <Switch
                id="allowNewRegistrations"
                checked={settings.allowNewRegistrations}
                onCheckedChange={checked => handleUpdateSetting('allowNewRegistrations', checked)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="defaultUserPlan">Plano Padrão para Novos Usuários</Label>
              <Select
                value={settings.defaultUserPlan}
                onValueChange={value => handleUpdateSetting('defaultUserPlan', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o plano padrão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Padrão</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Cálculo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Configurações de Cálculo
          </CardTitle>
          <CardDescription>
            Parâmetros para cálculos trabalhistas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="inssTable">Tabela INSS</Label>
              <Select
                value={settings.inssTable}
                onValueChange={value => handleUpdateSetting('inssTable', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a tabela INSS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fgtsRate">Taxa FGTS (%)</Label>
              <Input
                id="fgtsRate"
                type="number"
                value={settings.fgtsRate}
                onChange={e => handleUpdateSetting('fgtsRate', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="irrfTable">Tabela IRRF</Label>
              <Select
                value={settings.irrfTable}
                onValueChange={value => handleUpdateSetting('irrfTable', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a tabela IRRF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Integração */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Configurações de Integração
          </CardTitle>
          <CardDescription>
            Gerenciar integrações com outros serviços
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableWhatsAppIntegration">Integração com WhatsApp</Label>
              <Switch
                id="enableWhatsAppIntegration"
                checked={settings.enableWhatsAppIntegration}
                onCheckedChange={checked => handleUpdateSetting('enableWhatsAppIntegration', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enableEmailIntegration">Integração com E-mail</Label>
              <Switch
                id="enableEmailIntegration"
                checked={settings.enableEmailIntegration}
                onCheckedChange={checked => handleUpdateSetting('enableEmailIntegration', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enablePdfExport">Exportação PDF</Label>
              <Switch
                id="enablePdfExport"
                checked={settings.enablePdfExport}
                onCheckedChange={checked => handleUpdateSetting('enablePdfExport', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Configurações de Segurança
          </CardTitle>
          <CardDescription>
            Parâmetros de segurança do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={settings.passwordMinLength}
                onChange={e => handleUpdateSetting('passwordMinLength', e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="requireStrongPassword">Exigir Senha Forte</Label>
              <Switch
                id="requireStrongPassword"
                checked={settings.requireStrongPassword}
                onCheckedChange={checked => handleUpdateSetting('requireStrongPassword', checked)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sessionTimeout">Tempo de Sessão (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={e => handleUpdateSetting('sessionTimeout', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-juriscalc-blue hover:bg-juriscalc-navy"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
} 