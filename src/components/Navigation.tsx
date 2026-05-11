import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calculator, User, LogOut, Crown, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { path: '/home', label: 'Home', icon: User },
    { path: '/calculadora', label: 'Calculadora', icon: Calculator },
    { path: '/minha-conta', label: 'Minha Conta', icon: User },
  ];

  // Lógica de Admin
  if (user.role === 'admin' || user.role === 'super_admin' || user.tipo_usuario === 'admin_mestre') {
    navItems.push({ path: '/admin', label: 'Admin', icon: Crown });
  }

  const isPremium = user?.tipo_plano === 'premium';
  const isSuperAdmin = user?.role === 'super_admin' || user?.tipo_usuario === 'admin_mestre';

  // Lógica de Upgrade
  if (!isPremium && !isSuperAdmin) {
    navItems.push({ path: '/upgrade', label: 'Seja Premium', icon: Crown });
  }

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <nav className="bg-white dark:bg-juriscalc-navy shadow-sm border-b dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/home" className="text-2xl font-bold text-juriscalc-navy dark:text-white">
              IusCalc
            </Link>
            
           <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-juriscalc-blue text-white shadow-md'
                      : 'text-juriscalc-navy dark:text-slate-300 hover:bg-juriscalc-blue/10 hover:text-juriscalc-blue'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>

          <div className="flex items-center space-x-2">
            {/* Botão de Tema */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Menu do Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-juriscalc-blue text-white">
                      {user.nome?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem asChild>
                  <Link to="/minha-conta" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Minha Conta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};