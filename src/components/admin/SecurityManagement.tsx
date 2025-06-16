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
import {
  Switch,
} from '@/components/ui/switch';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { toast } from 'sonner';
import {
  Key,
  ShieldCheck,
  Fingerprint,
  GanttChartSquare,
  PlusCircle,
  Trash2,
  RefreshCcw,
} from 'lucide-react';

interface ApiKey {
  id: string;
  key: string;
  name: string;
  createdAt: string;
  expiresAt?: string;
  status: 'active' | 'inactive' | 'revoked';
}

interface IpRestriction {
  id: string;
  ipAddress: string;
  description?: string;
  status: 'allowed' | 'blocked';
}

export function SecurityManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 'api_123',
      key: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      name: 'Aplicativo Principal',
      createdAt: '2023-01-15',
      expiresAt: '2024-01-15',
      status: 'active',
    },
    {
      id: 'api_456',
      key: 'sk-yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
      name: 'Integração com CRM',
      createdAt: '2023-06-01',
      status: 'active',
    },
  ]);

  const [ipRestrictions, setIpRestrictions] = useState<IpRestriction[]>([
    {
      id: 'ip_1',
      ipAddress: '192.168.1.1',
      description: 'Escritório Central',
      status: 'allowed',
    },
    {
      id: 'ip_2',
      ipAddress: '10.0.0.50',
      description: 'Servidor de Teste',
      status: 'blocked',
    },
  ]);

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [rbacEnabled, setRbacEnabled] = useState(true);

  const generateApiKey = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const newKey: ApiKey = {
        id: `api_${Date.now()}`,
        key: `sk-${Math.random().toString(36).substring(2, 40)}`,
        name: `Nova Chave ${apiKeys.length + 1}`,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      setApiKeys(prev => [...prev, newKey]);
      toast.success('Chave de API gerada com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar chave de API');
    } finally {
      setIsLoading(false);
    }
  };

  const revokeApiKey = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setApiKeys(prev =>
        prev.map(key => (key.id === id ? { ...key, status: 'revoked' } : key))
      );
      toast.success('Chave de API revogada com sucesso!');
    } catch (error) {
      toast.error('Erro ao revogar chave de API');
    } finally {
      setIsLoading(false);
    }
  };

  const addIpRestriction = async (ipAddress: string, description: string, status: 'allowed' | 'blocked') => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const newRestriction: IpRestriction = {
        id: `ip_${Date.now()}`,
        ipAddress,
        description,
        status,
      };
      setIpRestrictions(prev => [...prev, newRestriction]);
      toast.success('Restrição de IP adicionada com sucesso!');
    } catch (error) {
      toast.error('Erro ao adicionar restrição de IP');
    } finally {
      setIsLoading(false);
    }
  };

  const removeIpRestriction = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setIpRestrictions(prev => prev.filter(ip => ip.id !== id));
      toast.success('Restrição de IP removida com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover restrição de IP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMfaChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMfaEnabled(checked);
      toast.success(`Autenticação de Dois Fatores ${checked ? 'ativada' : 'desativada'}`);
    } catch (error) {
      toast.error('Erro ao atualizar MFA');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRbacChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRbacEnabled(checked);
      toast.success(`Controle de Acesso Baseado em Função ${checked ? 'ativado' : 'desativado'}`);
    } catch (error) {
      toast.error('Erro ao atualizar RBAC');
    } finally {
      setIsLoading(false);
    }
  };

  const [newIpAddress, setNewIpAddress] = useState('');
  const [newIpDescription, setNewIpDescription] = useState('');
  const [newIpStatus, setNewIpStatus] = useState<'allowed' | 'blocked'>('allowed');

  return (
    <div className="space-y-6">
      {/* API Key Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Gerenciamento de Chaves de API
          </CardTitle>
          <CardDescription>
            Crie e gerencie chaves de API para integrações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={generateApiKey} disabled={isLoading} className="bg-juriscalc-blue hover:bg-juriscalc-navy">
            <PlusCircle className="w-4 h-4 mr-2" />
            Gerar Nova Chave de API
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Chave</TableHead>
                <TableHead>Criada Em</TableHead>
                <TableHead>Expira Em</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map(key => (
                <TableRow key={key.id}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell className="font-mono text-sm">{key.key.substring(0, 10)}...</TableCell>
                  <TableCell>{key.createdAt}</TableCell>
                  <TableCell>{key.expiresAt || 'Nunca'}</TableCell>
                  <TableCell>{key.status === 'active' ? 'Ativa' : 'Revogada'}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => revokeApiKey(key.id)}
                      disabled={isLoading || key.status === 'revoked'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* IP Restriction Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Restrições de IP
          </CardTitle>
          <CardDescription>
            Gerencie endereços IP permitidos ou bloqueados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder="Endereço IP (ex: 192.168.1.1)"
              value={newIpAddress}
              onChange={e => setNewIpAddress(e.target.value)}
            />
            <Input
              placeholder="Descrição (opcional)"
              value={newIpDescription}
              onChange={e => setNewIpDescription(e.target.value)}
            />
            <Select value={newIpStatus} onValueChange={value => setNewIpStatus(value as 'allowed' | 'blocked')}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allowed">Permitir</SelectItem>
                <SelectItem value="blocked">Bloquear</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => addIpRestriction(newIpAddress, newIpDescription, newIpStatus)}
            disabled={isLoading || !newIpAddress}
            className="bg-juriscalc-blue hover:bg-juriscalc-navy"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Adicionar Restrição
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endereço IP</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipRestrictions.map(ip => (
                <TableRow key={ip.id}>
                  <TableCell>{ip.ipAddress}</TableCell>
                  <TableCell>{ip.description || '-'}</TableCell>
                  <TableCell>{ip.status === 'allowed' ? 'Permitido' : 'Bloqueado'}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeIpRestriction(ip.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Advanced Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5" />
            Configurações de Segurança Avançadas
          </CardTitle>
          <CardDescription>
            Gerencie funcionalidades de segurança como MFA e RBAC
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="mfa-switch">Autenticação de Dois Fatores (MFA)</Label>
            <Switch id="mfa-switch" checked={mfaEnabled} onCheckedChange={handleMfaChange} disabled={isLoading} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="rbac-switch">Controle de Acesso Baseado em Função (RBAC)</Label>
            <Switch id="rbac-switch" checked={rbacEnabled} onCheckedChange={handleRbacChange} disabled={isLoading} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}