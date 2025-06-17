
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, FileSpreadsheet, Mail, Share2, Scale, Building2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ManualDialog } from '@/components/manual-dialog';

export function HomePage() {
  const navigate = useNavigate();

  const howToUseSteps = [
    {
      number: 1,
      title: "Faça Login",
      subtitle: "Acesse sua conta para continuar",
      description: "Utilize seu e-mail e senha para acessar todas as funcionalidades do sistema. Se ainda não possui uma conta, cadastre-se gratuitamente."
    },
    {
      number: 2,
      title: "Realize Cálculos",
      subtitle: "Calcule verbas trabalhistas",
      description: "Informe os dados do contrato de trabalho e utilize nossa calculadora avançada para obter cálculos precisos de verbas rescisórias e adicionais."
    },
    {
      number: 3,
      title: "Compartilhe Resultados",
      subtitle: "Exporte e compartilhe facilmente",
      description: "Compartilhe seus cálculos via WhatsApp, e-mail e exporte em formatos PDF e Excel para facilitar a comunicação com clientes e colegas."
    }
  ];

  const mainFeatures = [
    {
      icon: Calculator,
      title: "Calculadora Avançada",
      description: "Calcule automaticamente verbas rescisórias, horas extras, adicionais de insalubridade, periculosidade e muito mais."
    },
    {
      icon: Share2,
      title: "Compartilhamento Fácil",
      description: "Compartilhe seus cálculos via WhatsApp, e-mail e exporte em formatos PDF e Excel para facilitar a comunicação com clientes e colegas."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-juriscalc-blue via-juriscalc-navy to-blue-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-merriweather">
                Bem-vindo ao IusCalc
                <br />
                <span className="text-juriscalc-teal">Trabalhista</span>
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Sua plataforma completa para automatizar cálculos trabalhistas 
                com precisão e agilidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-juriscalc-teal hover:bg-juriscalc-teal/90 text-white font-semibold"
                  onClick={() => navigate('/calculadora')}
                >
                  Começar a Calcular
                </Button>
                <ManualDialog>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-juriscalc-teal text-juriscalc-teal hover:bg-juriscalc-teal hover:text-white transition-colors"
                  >
                    Manual Rápido
                  </Button>
                </ManualDialog>
              </div>
            </div>

            {/* Right Content - Logo/Image */}
            <div className="flex justify-center">
              <div className="w-80 h-96 bg-gray-800 rounded-lg flex flex-col items-center justify-center p-8">
                <div className="text-center text-gray-300">
                  <Scale className="w-16 h-16 mx-auto mb-4" />
                  <Building2 className="w-8 h-8 mx-auto mb-2" />
                  <Calculator className="w-12 h-12 mx-auto mb-4" />
                  <Building2 className="w-8 h-8 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-juriscalc-teal tracking-wider">
                    IUSCALC
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              Como Utilizar o IusCalc
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howToUseSteps.map((step) => (
              <Card key={step.number} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-juriscalc-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step.number}
                  </div>
                  <CardTitle className="text-xl font-bold text-juriscalc-navy">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-juriscalc-blue font-medium">
                    {step.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              className="bg-juriscalc-navy hover:bg-juriscalc-blue text-white"
              onClick={() => navigate('/calculadora')}
            >
              Saiba Mais sobre a Utilização
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              Recursos Principais
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-juriscalc-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-juriscalc-navy">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.title === "Compartilhamento Fácil" && (
                    <div className="flex justify-center space-x-4 mt-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-1">
                          <FaWhatsapp className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-500">WhatsApp</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mb-1">
                          <FileSpreadsheet className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-500">PDF</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mb-1">
                          <FileSpreadsheet className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-500">Excel</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-1">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-500">E-mail</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-juriscalc-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-merriweather">
            Pronto para Otimizar seu Trabalho?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Comece agora a usar o IusCalc Trabalhista e reduza em até 70% o tempo 
            gasto na elaboração de cálculos trabalhistas.
          </p>
          <Button 
            size="lg" 
            className="bg-juriscalc-teal hover:bg-juriscalc-teal/90 text-white font-semibold"
            onClick={() => navigate('/calculadora')}
          >
            Começar Agora →
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-juriscalc-navy py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-juriscalc-teal mr-2" />
                <span className="text-2xl font-bold text-white">IusCalc</span>
              </div>
              <p className="text-white/80 text-sm max-w-md">
                Ferramenta completa para advogados trabalhistas
                automatizarem cálculos trabalhistas com precisão.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Links Úteis</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>Home</li>
                <li>Calculadora</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Contato</h4>
              <p className="text-white/80 text-sm">mktadvisory7@gmail.com</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 mt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025 IusCalc. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
