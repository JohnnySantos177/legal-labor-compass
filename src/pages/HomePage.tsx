
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, FileSpreadsheet, Mail, Share2, Scale, Building2, Clock, TrendingUp, Users, CheckCircle, Star, DollarSign, Shield, Zap, FileText, BarChart3, HelpCircle, ChevronDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ManualDialog } from '@/components/manual-dialog';
import { useState } from 'react';

export function HomePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const problemCards = [
    {
      icon: Clock,
      title: "Tempo perdido com cálculos",
      description: "Horas gastas fazendo cálculos trabalhistas manualmente quando poderia focar no que realmente importa."
    },
    {
      icon: TrendingUp,
      title: "Erros custam caro",
      description: "Pequenos erros em cálculos podem resultar em grandes prejuízos e perda de credibilidade."
    },
    {
      icon: Users,
      title: "Clientes insatisfeitos",
      description: "Demora na entrega e falta de precisão podem afastar seus melhores clientes."
    }
  ];

  const solutionFeatures = [
    {
      icon: Calculator,
      title: "Cálculos Automáticos",
      description: "Calcule automaticamente todas as verbas trabalhistas com precisão total."
    },
    {
      icon: FileSpreadsheet,
      title: "Relatórios Completos",
      description: "Gere relatórios detalhados em PDF e Excel para seus clientes."
    },
    {
      icon: Share2,
      title: "Compartilhamento Fácil",
      description: "Envie resultados por WhatsApp e email instantaneamente."
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Seus dados e de seus clientes protegidos com máxima segurança."
    },
    {
      icon: Zap,
      title: "Agilidade Máxima",
      description: "Reduza em até 90% o tempo gasto com cálculos trabalhistas."
    },
    {
      icon: BarChart3,
      title: "Análises Detalhadas",
      description: "Visualize e analise todos os cálculos de forma clara e organizada."
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Advogada Trabalhista",
      content: "O IusCalc revolucionou minha prática. Consigo fazer em minutos o que antes levava horas.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Escritório de Advocacia",
      content: "Ferramenta indispensável para qualquer advogado trabalhista. Precisão e agilidade incomparáveis.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Consultora Jurídica",
      content: "Meus clientes ficaram impressionados com a rapidez e qualidade dos relatórios.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "R$ 49",
      period: "por mês",
      features: [
        "50 cálculos por mês",
        "Relatórios em PDF",
        "Suporte por email",
        "Acesso básico"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "R$ 99",
      period: "por mês",
      features: [
        "Cálculos ilimitados",
        "Relatórios PDF e Excel",
        "Compartilhamento WhatsApp",
        "Suporte prioritário",
        "Backup automático"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "R$ 199",
      period: "por mês",
      features: [
        "Tudo do Professional",
        "API personalizada",
        "Integração com sistemas",
        "Suporte 24/7",
        "Treinamento incluso",
        "Multi-usuários"
      ],
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: "Como funciona o IusCalc?",
      answer: "O IusCalc é uma plataforma online que automatiza cálculos trabalhistas. Você insere os dados do contrato e nossa ferramenta calcula automaticamente todas as verbas."
    },
    {
      question: "Posso confiar na precisão dos cálculos?",
      answer: "Sim! Nossos cálculos seguem rigorosamente a legislação trabalhista brasileira e são constantemente atualizados conforme mudanças na lei."
    },
    {
      question: "Como posso cancelar minha assinatura?",
      answer: "Você pode cancelar sua assinatura a qualquer momento através da sua conta, sem burocracias ou taxas extras."
    },
    {
      question: "Existe período de teste gratuito?",
      answer: "Sim! Oferecemos 7 dias de teste gratuito para você conhecer todas as funcionalidades da plataforma."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-juriscalc-blue via-juriscalc-navy to-blue-900">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-merriweather">
            IusCalc Trabalhista Pro
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Simplifique Cálculos de Rescisão Trabalhista e Melhore Sua Eficiência
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-juriscalc-yellow hover:bg-juriscalc-yellow/90 text-juriscalc-navy font-semibold px-8 py-4 text-lg"
              onClick={() => navigate('/calculadora')}
            >
              Começar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-juriscalc-navy transition-colors px-8 py-4 text-lg"
              onClick={() => navigate('/auth')}
            >
              Fazer Login
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              Você Está Perdendo Tempo e Dinheiro?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra como a falta de automação está custando caro para seu escritório
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problemCards.map((card, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 border-red-100">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <card.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-juriscalc-navy">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              A Solução Completa Para Sua Gestão
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para automatizar e acelerar seus cálculos trabalhistas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutionFeatures.map((feature, index) => (
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transform Section */}
      <section className="py-16 bg-gradient-to-r from-juriscalc-blue to-juriscalc-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-merriweather">
            Transforme Sua Gestão em 30 Dias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-white">
            <div>
              <div className="text-4xl font-bold text-juriscalc-yellow mb-2">90%</div>
              <p>Redução no tempo de cálculos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-juriscalc-yellow mb-2">100%</div>
              <p>Precisão garantida</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-juriscalc-yellow mb-2">24/7</div>
              <p>Disponível quando você precisar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              O Que Nossos Clientes Dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-juriscalc-navy">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              Escolha o Plano Ideal Para Seu Negócio
            </h2>
            <p className="text-lg text-gray-600">
              Planos flexíveis para todas as necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.highlighted ? 'border-juriscalc-yellow border-2 shadow-xl scale-105' : ''}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-juriscalc-yellow text-juriscalc-navy px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-juriscalc-navy">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-juriscalc-blue">
                    {plan.price}
                    <span className="text-lg text-gray-500 font-normal">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.highlighted ? 'bg-juriscalc-yellow hover:bg-juriscalc-yellow/90 text-juriscalc-navy' : 'bg-juriscalc-blue hover:bg-juriscalc-navy text-white'}`}
                    onClick={() => navigate('/auth')}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-juriscalc-navy mb-4 font-merriweather">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-juriscalc-navy">{faq.question}</CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </CardHeader>
                {openFaq === index && (
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-juriscalc-blue to-juriscalc-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-merriweather">
              Comece Sua Transformação Hoje!
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Entre em contato conosco e descubra como o IusCalc pode revolucionar seu escritório
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-xl">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Como podemos ajudar?</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                  placeholder="Conte-nos suas necessidades..."
                />
              </div>
              <Button className="w-full bg-juriscalc-yellow hover:bg-juriscalc-yellow/90 text-juriscalc-navy font-semibold">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-juriscalc-navy py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-juriscalc-yellow mr-2" />
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
                <li><button onClick={() => navigate('/')}>Home</button></li>
                <li><button onClick={() => navigate('/calculadora')}>Calculadora</button></li>
                <li><button onClick={() => navigate('/auth')}>Login</button></li>
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
