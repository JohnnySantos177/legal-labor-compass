
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthState, LoginData, RegisterData } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Inicializando AuthProvider...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from our profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const mappedUser: User = {
              id: profile.id,
              email: profile.email || session.user.email || '',
              name: profile.nome || session.user.email?.split('@')[0] || '',
              role: profile.is_admin ? 'super_admin' : 'user',
              plan: profile.tipo_plano === 'premium' ? 'premium' : 'standard',
              phone: profile.nome || 'Não informado',
              created_at: profile.created_at || new Date().toISOString(),
              trial_end_date: profile.tipo_plano === 'padrao' ? 
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : undefined
            };
            setUser(mappedUser);
            console.log('Usuário mapeado:', mappedUser);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (data: LoginData): Promise<boolean> => {
    console.log('Tentando fazer login com:', data.email);
    setLoading(true);
    setError(null);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error('Erro no login:', error);
        throw error;
      }

      if (authData.user) {
        console.log('Login bem-sucedido:', authData.user.email);
        navigate('/calculadora');
        toast.success('Login realizado com sucesso!');
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      const errorMessage = error.message || 'Erro no login';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    console.log('Tentando registrar usuário:', data.email);
    setLoading(true);
    setError(null);
    
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }
      
      if (data.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nome: data.name,
            name: data.name
          }
        }
      });

      if (error) {
        console.error('Erro no registro:', error);
        throw error;
      }
      
      console.log('Registro realizado com sucesso');
      toast.success('Registro realizado! Verifique seu email para confirmar a conta.');
      return true;
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      const errorMessage = error?.message || 'Erro no registro';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('Fazendo logout...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erro ao fazer logout');
    } else {
      setUser(null);
      setSession(null);
      navigate('/auth');
      toast.success('Logout realizado com sucesso!');
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        throw error;
      }

      toast.success('Email de recuperação enviado!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar email de recuperação');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
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
