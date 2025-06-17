
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import bgImage from '@/assets/vecteezy_business-and-lawyers-discussing-contract-papers-with-brass_11955995.jpg';
import iusCalcLogo from '@/assets/IusCalc sem fundo.png';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat fixed inset-0"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="w-full max-w-[400px] relative z-10">
        <div className="flex flex-col items-center mb-6">
          <img src={iusCalcLogo} alt="IusCalc" className="w-12 h-12 mb-2" />
          <p className="text-white/90 text-sm">Sistema Jurídico de Cálculos Trabalhistas</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-lg font-semibold text-[#1a365d] mb-2">Acesse sua conta</h2>
          <p className="text-gray-600 text-sm mb-4">Faça login ou crie sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a365d] text-white py-2 rounded-md hover:bg-[#2a466d] transition-colors"
            >
              Entrar
            </button>

            <div className="flex justify-between items-center text-sm pt-1">
              <a href="/auth?tab=register" className="text-blue-600 hover:underline">
                Cadastro
              </a>
              <a href="/auth?tab=forgot-password" className="text-blue-600 hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          </form>

          {/* Premium Plan Information */}
          <div className="mt-6 p-4 bg-[#1a365d] rounded-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">★</span>
              <h3 className="text-base font-semibold">Plano Premium</h3>
            </div>
            <p className="text-sm mb-3">
              Desbloqueie recursos avançados e aumente sua produtividade:
            </p>
            <ul className="space-y-1.5 text-sm mb-3">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Cálculos ilimitados
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Suporte prioritário
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Compartilhamento via WhatsApp, e-mail e exportação PDF/Excel
              </li>
            </ul>
            <button className="w-full bg-yellow-400 text-[#1a365d] py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors">
              Assinar Premium
            </button>
          </div>

          {/* Export Options */}
          <div className="mt-4 flex justify-center gap-3">
            <button className="text-xs text-gray-600 flex items-center gap-1">
              <span className="text-green-500">✓</span> WhatsApp
            </button>
            <button className="text-xs text-gray-600 flex items-center gap-1">
              <span className="text-blue-500">✓</span> E-mail
            </button>
            <button className="text-xs text-gray-600 flex items-center gap-1">
              <span className="text-red-500">✓</span> PDF
            </button>
            <button className="text-xs text-gray-600 flex items-center gap-1">
              <span className="text-green-600">✓</span> Excel
            </button>
          </div>

          {/* Manual Link */}
          <div className="mt-3 flex justify-center">
            <a href="/manual" className="text-xs text-gray-600 flex items-center gap-2">
              <span>📖</span> Manual Rápido IusCalc
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
