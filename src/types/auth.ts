
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: 'admin' | 'user';
  plan?: 'standard' | 'premium';
  trial_end_date?: string;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
