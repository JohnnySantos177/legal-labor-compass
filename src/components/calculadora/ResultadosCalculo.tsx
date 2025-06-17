import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Resultados, DadosContrato } from '@/types/calculadora';
import { exportToPDF } from '@/utils/export/pdfExport';
import { shareViaWhatsApp, shareViaEmail, generateCalculationText } from '@/utils/export/shareUtils';
import { formatCurrency } from '@/utils/format';
import { ResultsActions } from './results/ResultsActions';
import { CalculationSection } from './results/CalculationSection';
import { TotalDisplay } from './results/TotalDisplay';
import { HorasExtrasSection } from './results/HorasExtrasSection';
import { Badge } from '@/components/ui/badge';
import { prepararMetadados } from '@/utils/calculosUtils';
import { 
  Receipt, 
  Clock, 
  AlertTriangle, 
  Gift, 
  DollarSign, 
  FileText,
  Calculator
} from 'lucide-react';

interface ResultadosCalculoProps {
  resultados: Resultados;
  horasExtras: {
    ativo: boolean;
    calculos: Array<{
      id: string;
      percentual: number;
      quantidade: number;
    }>;
  };
  dadosContrato?: DadosContrato;
  onSalvar?: () => void;
}

export function ResultadosCalculo({ resultados, horasExtras, dadosContrato, onSalvar }: ResultadosCalculoProps) {
  const { total, detalhamento } = resultados;

  const verbasRescisoriasItems = [
    { label: 'Saldo de Salário', value: detalhamento.verbas?.salarioProporcional || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: '13º Salário Proporcional', value: detalhamento.verbas?.decimoTerceiro || 0, icon: <Gift className="w-4 h-4" /> },
    { label: 'Férias Proporcionais + 1/3', value: detalhamento.verbas?.feriasProporcionais || 0, icon: <Clock className="w-4 h-4" /> },
    { label: 'Aviso Prévio', value: detalhamento.verbas?.avisoPrevio || 0, icon: <FileText className="w-4 h-4" /> },
    { label: 'FGTS sobre Verbas', value: detalhamento.verbas?.fgts || 0, icon: <Calculator className="w-4 h-4" /> },
    { label: 'Multa do FGTS', value: detalhamento.verbas?.multaFgts || 0, icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  const adicionaisItems = [
    { label: 'Insalubridade', value: detalhamento.adicionais?.insalubridade || 0, icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Periculosidade', value: detalhamento.adicionais?.periculosidade || 0, icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Adicional Noturno', value: detalhamento.adicionais?.noturno || 0, icon: <Clock className="w-4 h-4" /> }
  ];

  const verbasBeneficiosItems = [
    { label: 'Férias Vencidas + 1/3', value: detalhamento.verbas?.feriasVencidas || 0, icon: <Clock className="w-4 h-4" /> },
    { label: 'Indenização por Demissão Indevida', value: detalhamento.verbas?.indenizacaoDemissaoIndevida || 0, icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Vale Transporte Não Pago', value: detalhamento.verbas?.valeTransporteNaoPago || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Vale Alimentação Não Pago', value: detalhamento.verbas?.valeAlimentacaoNaoPago || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Adicional de Transferência', value: detalhamento.verbas?.adicionalTransferencia || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Descontos Indevidos', value: detalhamento.verbas?.descontosIndevidos || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Diferenças Salariais', value: detalhamento.verbas?.diferencasSalariais || 0, icon: <DollarSign className="w-4 h-4" /> }
  ];

  const multasItems = [
    { label: 'Multa Art. 467 CLT', value: detalhamento.multas?.art467 || 0, icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Multa Art. 477 CLT', value: detalhamento.multas?.art477 || 0, icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  const outrosItems = [
    { label: 'Salário-Família', value: detalhamento.salarioFamilia || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Seguro-Desemprego', value: detalhamento.seguroDesemprego || 0, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Cálculos Personalizados', value: detalhamento.calculosPersonalizados || 0, icon: <Calculator className="w-4 h-4" /> }
  ];

  const handleExportar = () => {
    const { dataCalculo, nomeEscritorio } = prepararMetadados();

    exportToPDF({
      resultados: resultados,
      dadosContrato: dadosContrato || {} as DadosContrato,
      horasExtras: horasExtras,
      metadata: {
        dataAtual: dataCalculo,
        nomeEscritorio: nomeEscritorio
      }
    });
  };

  const handleCompartilhar = () => {
    const { dataCalculo, nomeEscritorio } = prepararMetadados();

    const textoCalculo = generateCalculationText(
      { ...resultados, dadosContrato: dadosContrato || {} as DadosContrato },
      { dataCalculo: dataCalculo, nomeEscritorio: nomeEscritorio }
    );
    const confirmacao = window.confirm('Escolha o método de compartilhamento:\nOK = WhatsApp\nCancelar = Email');
    
    if (confirmacao) {
      shareViaWhatsApp(textoCalculo);
    } else {
      shareViaEmail('Resultado do Cálculo Trabalhista', textoCalculo);
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-6 h-6 text-blue-600" />
          Resultados do Cálculo
          </div>
          <ResultsActions
            onSalvar={onSalvar}
            onExportar={handleExportar}
            onCompartilhar={handleCompartilhar}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Total Value Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
            <div className="text-sm uppercase tracking-wide mb-2 opacity-90">Valor Total da Reclamação</div>
            <div className="text-4xl font-bold">{formatCurrency(total)}</div>
          </div>

          {/* Sections */}
          <div className="grid gap-6">
            <CalculationSection
              title="Verbas Rescisórias"
              items={verbasRescisoriasItems}
              icon={<Receipt className="w-5 h-5 text-blue-600" />}
              className="bg-blue-50"
            />

            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-indigo-800">
                <Clock className="w-5 h-5" />
                Adicionais
              </h3>
              <div className="space-y-3">
                {adicionaisItems.map((item, index) =>
                  item.value > 0 && (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium text-gray-700">{item.label}</span>
                      </div>
                      <Badge className="bg-indigo-600 text-white">
                        {formatCurrency(item.value)}
                      </Badge>
                  </div>
                  )
                )}
                <HorasExtrasSection
                  horasExtras={horasExtras}
                  totalValue={detalhamento.adicionais.horasExtras}
                />
            </div>
          </div>

            <CalculationSection
              title="Verbas e Benefícios"
              items={verbasBeneficiosItems}
              icon={<Gift className="w-5 h-5 text-green-600" />}
              className="bg-green-50"
            />

            <CalculationSection
              title="Multas"
              items={multasItems}
              icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
              className="bg-red-50"
            />

            <CalculationSection
              title="Outros Valores"
              items={outrosItems}
              icon={<Calculator className="w-5 h-5 text-purple-600" />}
              className="bg-purple-50"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
