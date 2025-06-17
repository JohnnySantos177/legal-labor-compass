
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Users, Edit, Trash2, Plus } from 'lucide-react';

// Interface para o usuário no contexto de gerenciamento
interface ManagedUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'super_admin';
  plan: 'standard' | 'premium';
  phone?: string;
  created_at: string;
  trial_end_date?: string;
}

interface FormData {
  email: string;
  name: string;
  role: 'user' | 'admin' | 'super_admin';
  plan: 'standard' | 'premium';
  phone: string;
}

export function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    role: 'user',
    plan: 'standard',
    phone: '',
  });

  // Carregar usuários (simulado)
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // Simulação de carregamento de usuários
      const mockUsers: ManagedUser[] = [
        {
          id: '1',
          email: 'usuario1@exemplo.com',
          name: 'Usuário 1',
          role: 'user',
          plan: 'standard',
          phone: '(11) 99999-9999',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          email: 'admin@exemplo.com',
          name: 'Administrador',
          role: 'admin',
          plan: 'premium',
          phone: '(11) 88888-8888',
          created_at: new Date().toISOString(),
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      toast.error('Erro ao carregar usuários');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      // Simulação de criação de usuário
      const newUser: ManagedUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        created_at: new Date().toISOString(),
      };
      setUsers([...users, newUser]);
      setIsDialogOpen(false);
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar usuário');
    }
  };

  const handleEditUser = async (user: ManagedUser) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role,
      plan: user.plan,
      phone: user.phone || '',
    });
    setIsDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      // Simulação de atualização de usuário
      const updatedUsers = users.map(u =>
        u.id === editingUser.id ? { ...u, ...formData } : u
      );
      setUsers(updatedUsers);
      setIsDialogOpen(false);
      setEditingUser(null);
      toast.success('Usuário atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar usuário');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Simulação de exclusão de usuário
      setUsers(users.filter(u => u.id !== userId));
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir usuário');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-juriscalc-navy flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Gerenciamento de Usuários
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-juriscalc-blue hover:bg-juriscalc-navy">
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
              </DialogTitle>
              <DialogDescription>
                {editingUser
                  ? 'Atualize as informações do usuário'
                  : 'Preencha as informações para criar um novo usuário'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Papel</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: 'user' | 'admin' | 'super_admin') =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o papel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuário</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">Plano</Label>
                <Select
                  value={formData.plan}
                  onValueChange={(value: 'standard' | 'premium') =>
                    setFormData({ ...formData, plan: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Padrão</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingUser(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                className="bg-juriscalc-blue hover:bg-juriscalc-navy"
              >
                {editingUser ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Carregando usuários...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="capitalize">{user.plan}</TableCell>
                <TableCell>{user.phone || 'Não informado'}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
} 
