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
import { toast } from 'sonner';
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  Search,
  Settings,
  AlertTriangle,
} from 'lucide-react';

export function DatabaseManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [backupStatus, setBackupStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  // Simulação de tabelas disponíveis
  const availableTables = [
    'users',
    'calculations',
    'organizations',
    'subscriptions',
    'logs',
  ];

  const handleBackup = async () => {
    setIsLoading(true);
    setBackupStatus('running');
    try {
      // Simulação de backup
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBackupStatus('completed');
      toast.success('Backup realizado com sucesso!');
    } catch (error) {
      setBackupStatus('error');
      toast.error('Erro ao realizar backup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    try {
      // Simulação de restauração
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Restauração realizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao restaurar backup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimize = async () => {
    setIsLoading(true);
    try {
      // Simulação de otimização
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Otimização realizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao otimizar banco de dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) {
      toast.error('Digite uma consulta SQL válida');
      return;
    }

    setIsLoading(true);
    try {
      // Simulação de execução de consulta
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Consulta executada com sucesso!');
    } catch (error) {
      toast.error('Erro ao executar consulta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Seção de Backup e Restauração */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Backup do Banco de Dados
            </CardTitle>
            <CardDescription>
              Realize backups completos do banco de dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackup}
                disabled={isLoading || backupStatus === 'running'}
                className="bg-juriscalc-blue hover:bg-juriscalc-navy"
              >
                <Download className="w-4 h-4 mr-2" />
                Realizar Backup
              </Button>
              <Button
                onClick={handleRestore}
                disabled={isLoading}
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                Restaurar Backup
              </Button>
            </div>
            {backupStatus === 'running' && (
              <div className="text-sm text-yellow-600 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Backup em andamento...
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Otimização
            </CardTitle>
            <CardDescription>
              Otimize o desempenho do banco de dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleOptimize}
              disabled={isLoading}
              className="bg-juriscalc-blue hover:bg-juriscalc-navy"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Otimizar Banco de Dados
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Consultas SQL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Consultas SQL
          </CardTitle>
          <CardDescription>
            Execute consultas SQL diretamente no banco de dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="table">Tabela</Label>
              <Select
                value={selectedTable}
                onValueChange={setSelectedTable}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma tabela" />
                </SelectTrigger>
                <SelectContent>
                  {availableTables.map(table => (
                    <SelectItem key={table} value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="query">Consulta SQL</Label>
              <Input
                id="query"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Digite sua consulta SQL aqui..."
                className="font-mono"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleQuery}
              disabled={isLoading}
              className="bg-juriscalc-blue hover:bg-juriscalc-navy"
            >
              Executar Consulta
            </Button>
            <div className="text-sm text-yellow-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Use com cautela: consultas SQL podem afetar o banco de dados
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Status do Banco de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Status do Banco de Dados
          </CardTitle>
          <CardDescription>
            Informações sobre o estado atual do banco de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Tamanho Total</div>
              <div className="text-lg font-semibold">1.2 GB</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Último Backup</div>
              <div className="text-lg font-semibold">
                {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Status</div>
              <div className="text-lg font-semibold text-green-600">
                Online
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 