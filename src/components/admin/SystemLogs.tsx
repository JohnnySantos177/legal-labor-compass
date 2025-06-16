import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  ScrollText,
  Filter,
  Search,
  Calendar,
  RefreshCcw,
  Bug,
  CircleAlert,
  Info,
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source: string;
  userId?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: 'log_001',
    timestamp: '2024-07-20 10:00:00',
    level: 'info',
    message: 'User john.doe@example.com logged in',
    source: 'auth-service',
    userId: 'user_123',
  },
  {
    id: 'log_002',
    timestamp: '2024-07-20 10:05:30',
    level: 'debug',
    message: 'Database query executed: SELECT * FROM users',
    source: 'database-service',
  },
  {
    id: 'log_003',
    timestamp: '2024-07-20 10:10:15',
    level: 'warn',
    message: 'API rate limit warning for user jane.smith@example.com',
    source: 'api-gateway',
    userId: 'user_456',
  },
  {
    id: 'log_004',
    timestamp: '2024-07-20 10:12:45',
    level: 'error',
    message: 'Failed to save calculation for user user_123: Database connection lost',
    source: 'calculation-service',
    userId: 'user_123',
  },
  {
    id: 'log_005',
    timestamp: '2024-07-20 10:15:00',
    level: 'info',
    message: 'System settings updated by super_admin',
    source: 'admin-panel',
    userId: 'admin_001',
  },
  {
    id: 'log_006',
    timestamp: '2024-07-20 10:20:00',
    level: 'info',
    message: 'New user registered: new.user@example.com',
    source: 'auth-service',
  },
  {
    id: 'log_007',
    timestamp: '2024-07-20 10:22:30',
    level: 'debug',
    message: 'User data fetched for user_456',
    source: 'user-management',
    userId: 'user_456',
  },
  {
    id: 'log_008',
    timestamp: '2024-07-20 10:25:10',
    level: 'error',
    message: 'PDF export failed: Missing print-results-only element',
    source: 'pdf-export-service',
  },
];

export function SystemLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setLogs(mockLogs);
      toast.success('Logs carregados com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar logs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getLevelIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'warn':
        return <CircleAlert className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <Bug className="w-4 h-4 text-red-500" />;
      case 'debug':
        return <Search className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSearchTerm = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (log.userId && log.userId.toLowerCase().includes(searchTerm.toLowerCase()));

    const logTimestamp = new Date(log.timestamp).getTime();
    const startTimestamp = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : 0;
    const endTimestamp = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : Infinity;

    const matchesDate = logTimestamp >= startTimestamp && logTimestamp <= endTimestamp;

    return matchesLevel && matchesSearchTerm && matchesDate;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <p className="text-lg text-gray-500">Carregando logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="w-5 h-5" />
            Logs do Sistema
          </CardTitle>
          <CardDescription>
            Visualize e filtre logs de auditoria, erros e atividades do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Níveis</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warn">Aviso</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 col-span-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por mensagem, fonte ou ID do usuário..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
            <Button onClick={fetchLogs} className="bg-juriscalc-blue hover:bg-juriscalc-navy">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Atualizar Logs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                placeholder="Data de Início"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                placeholder="Data de Fim"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[80px]">Nível</TableHead>
                <TableHead>Mensagem</TableHead>
                <TableHead className="w-[150px]">Fonte</TableHead>
                <TableHead className="w-[120px]">Usuário ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        <span className={`font-medium ${log.level === 'error' ? 'text-red-600' : log.level === 'warn' ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{log.message}</TableCell>
                    <TableCell className="text-sm font-mono">{log.source}</TableCell>
                    <TableCell className="text-sm">{log.userId || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum log encontrado para os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 