import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, MessageCircle, Mail, FileText, Table2 } from 'lucide-react';
import { ManualDialog } from '@/components/manual-dialog';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      navigate('/calculadora');
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
      <CardContent className="p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-juriscalc-navy">Entrar</CardTitle>
          <CardDescription>
            Acesse sua conta IusCalc
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="juriscalc-label">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="juriscalc-input"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="juriscalc-label">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="juriscalc-input pr-10"
                required
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
          
          <Button 
            type="submit" 
            className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy"
          >
            Entrar
          </Button>
          
          <div className="text-center text-sm">
            {/* <span className="text-gray-600">Demo: demo@iuscalc.com / demo123</span> */}
          </div>
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
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <MessageCircle className="h-4 w-4 text-green-500" />
            WhatsApp
          </button>
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <Mail className="h-4 w-4 text-blue-500" />
            E-mail
          </button>
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <FileText className="h-4 w-4 text-red-500" />
            PDF
          </button>
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
            <Table2 className="h-4 w-4 text-green-600" />
            Excel
          </button>
        </div>

        {/* Manual Link */}
        <div className="mt-3 flex justify-center">
          <ManualDialog>
            <button type="button" className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors">
              <span>📖</span> Manual Rápido IusCalc
            </button>
          </ManualDialog>
        </div>
      </CardContent>
    </Card>
  );
}
