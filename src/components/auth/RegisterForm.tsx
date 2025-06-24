
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

export const RegisterForm = () => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-juriscalc-navy">Criar Conta</CardTitle>
        <CardDescription>
          Registre-se para acessar o IusCalc
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="juriscalc-label">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              className="juriscalc-input"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="juriscalc-label">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              className="juriscalc-input"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="juriscalc-label">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              className="juriscalc-input"
              placeholder="(11) 99999-9999"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="juriscalc-label">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                className="juriscalc-input pr-10"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="juriscalc-label">Confirmar Senha</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                className="juriscalc-input pr-10"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Criando Conta...' : 'Criar Conta'}
          </Button>
        </form>

        {/* Premium Plan Information */}
        <div className="mt-6 p-4 bg-juriscalc-navy/95 backdrop-blur-sm rounded-lg text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-xl">★</span>
            <h3 className="text-lg font-semibold">Plano Premium</h3>
          </div>
          <p className="text-sm mb-3 text-white/90">
            Desbloqueie recursos avançados e aumente sua produtividade:
          </p>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">✓</span>
              Cálculos ilimitados
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">✓</span>
              Suporte prioritário
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">✓</span>
              Compartilhamento via WhatsApp, e-mail e exportação PDF/Excel
            </li>
          </ul>
          <Button 
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-juriscalc-navy font-semibold shadow-sm"
          >
            Assinar Premium
          </Button>
        </div>

        {/* Export Options */}
        <div className="mt-4 flex justify-center gap-4">
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors">
            <span className="text-green-500">✓</span> WhatsApp
          </button>
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors">
            <span className="text-blue-500">✓</span> E-mail
          </button>
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors">
            <span className="text-red-500">✓</span> PDF
          </button>
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors">
            <span className="text-green-600">✓</span> Excel
          </button>
        </div>

        {/* Manual Link */}
        <div className="mt-3 flex justify-center">
          <a href="/manual" className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <span>📖</span> Manual Rápido IusCalc
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
