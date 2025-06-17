import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, FileSpreadsheet, Mail, Share2, FileText } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ManualDialog } from '@/components/manual-dialog';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-juriscalc-navy mb-4">
          Bem-vindo ao IusCalc
        </h1>
        <p className="text-xl text-gray-600">
          Sua ferramenta completa para cálculos trabalhistas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Card Calculadora Avançada */}
        <Card className="group hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-juriscalc-blue rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-juriscalc-navy">
              Calculadora Avançada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-600 text-center mb-6">
              Calcule automaticamente verbas rescisórias, horas extras, adicionais de insalubridade, periculosidade e muito mais
            </CardDescription>
            <Button 
              className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy transition-colors"
              onClick={() => navigate('/calculadora')}
            >
              Começar a Calcular
            </Button>
          </CardContent>
        </Card>

        {/* Card Compartilhamento Fácil */}
        <Card className="group hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-juriscalc-blue rounded-full flex items-center justify-center">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-juriscalc-navy">
              Compartilhamento Fácil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-600 text-center mb-6">
              Compartilhe seus cálculos via WhatsApp, e-mail e exporte em formatos PDF e Excel para facilitar a comunicação com clientes e colegas
            </CardDescription>
            <div className="flex justify-center space-x-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">WhatsApp</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">E-mail</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">PDF</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mb-2">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">Excel</span>
              </div>
            </div>
            <Button 
              className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy transition-colors"
              onClick={() => navigate('/calculadora')}
            >
              Experimentar Agora
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <ManualDialog>
          <Button variant="link" className="text-juriscalc-blue opacity-80 hover:opacity-100 transition-opacity">
            Manual de Uso Rápido
          </Button>
        </ManualDialog>
      </div>
    </div>
  );
}
