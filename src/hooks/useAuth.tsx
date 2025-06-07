
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState, LoginData, RegisterData } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('iuscalc_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({
        user,
        loading: false,
        error: null
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (data: LoginData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API call - replace with actual Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo user for testing
      if (data.email === 'demo@iuscalc.com' && data.password === 'demo123') {
        const user: User = {
          id: '1',
          email: data.email,
          name: 'Usuário Demo',
          phone: '(11) 99999-9999',
          role: 'user',
          plan: 'standard',
          trial_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString()
        };
        
        localStorage.setItem('iuscalc_user', JSON.stringify(user));
        setAuthState({ user, loading: false, error: null });
        toast.success('Login realizado com sucesso!');
        return true;
      }
      
      throw new Error('Credenciais inválidas');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no login';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }
      
      if (data.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuthState(prev => ({ ...prev, loading: false }));
      toast.success('Registro realizado! Verifique seu email para confirmar a conta.');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no registro';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('iuscalc_user');
    setAuthState({ user: null, loading: false, error: null });
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
      ...authState,
      login,
      register,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
