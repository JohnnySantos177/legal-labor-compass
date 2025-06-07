
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Shield, Clock, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Cálculos Precisos",
      description: "Realize cálculos trabalhistas com total precisão seguindo a legislação vigente."
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Seus dados estão protegidos com criptografia de ponta e backup automático."
    },
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Automatize cálculos complexos e reduza o tempo gasto em cada processo."
    },
    {
      icon: Crown,
      title: "Plano Premium",
      description: "Acesse recursos avançados e tenha cálculos ilimitados."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="juriscalc-gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 font-merriweather">
            IusCalc
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            A calculadora jurídica trabalhista mais completa do Brasil. 
            Realize cálculos precisos de verbas rescisórias, horas extras, 
            adicionais e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-juriscalc-blue hover:bg-gray-100">
              <Link to="/auth">Começar Agora</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-juriscalc-blue">
              <Link to="/auth">Entrar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              Por que escolher o IusCalc?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Desenvolvido especialmente para advogados trabalhistas, 
              oferecemos precisão, agilidade e confiabilidade em cada cálculo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center juriscalc-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-juriscalc-blue mx-auto mb-4" />
                  <CardTitle className="text-juriscalc-navy">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-juriscalc-navy">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-merriweather">
            Pronto para começar?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de advogados que já confiam no IusCalc 
            para seus cálculos trabalhistas.
          </p>
          <Button asChild size="lg" className="bg-juriscalc-gold hover:bg-juriscalc-gold/90">
            <Link to="/auth">Criar Conta Gratuita</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 IusCalc. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
