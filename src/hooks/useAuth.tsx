import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthState, LoginData, RegisterData } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      // Garante que johnnysantos_177@msn.com seja sempre super_admin
      if (parsedUser.email === 'johnnysantos_177@msn.com') {
        setUser({
          ...parsedUser,
          role: 'super_admin',
          plan: 'premium',
        });
      } else {
        setUser(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulação de autenticação
      if (data.email && data.password) {
        let user: User;
        if (data.email === 'johnnysantos_177@msn.com') {
          user = {
            id: 'super_admin_id',
            email: data.email,
            name: 'Johnny Santos',
            role: 'super_admin',
            plan: 'premium',
            phone: '(00) 00000-0000',
            created_at: new Date().toISOString(),
            trial_end_date: undefined // Super Admin não tem trial
          };
        } else {
          user = {
            id: 'user_id_' + Math.random().toString(36).substr(2, 9),
            email: data.email,
            name: data.email.split('@')[0],
            role: 'user',
            plan: 'standard',
            phone: 'Não informado',
            created_at: new Date().toISOString(),
            trial_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dias de trial
          };
        }
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/calculadora');
        toast.success('Login realizado com sucesso!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro no login');
      toast.error('Erro no login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }
      
      if (data.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoading(false);
      toast.success('Registro realizado! Verifique seu email para confirmar a conta.');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no registro';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/auth');
    toast.success('Logout realizado com sucesso!');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Email de recuperação enviado!');
      return true;
    } catch (error) {
      toast.error('Erro ao enviar email de recuperação');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
