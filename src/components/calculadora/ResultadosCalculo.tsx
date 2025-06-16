
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Resultados } from '@/types/calculadora';
import { exportToPDF } from '@/utils/export/pdfExport';
import { shareViaWhatsApp, shareViaEmail, generateCalculationText } from '@/utils/export/shareUtils';
import { formatCurrency } from '@/utils/format';
import { ResultsActions } from './results/ResultsActions';
import { CalculationSection } from './results/CalculationSection';
import { TotalDisplay } from './results/TotalDisplay';
import { HorasExtrasSection } from './results/HorasExtrasSection';

interface ResultadosCalculoProps {
  resultados: Resultados;
  horasExtras: {
    ativo: boolean;
    calculos: Array<{
      id: string;
      percentual: number;
      quantidade: number;
      valor?: number;
    }>;
  };
  onSalvar: () => void;
}

export function ResultadosCalculo({ resultados, horasExtras, onSalvar }: ResultadosCalculoProps) {
  const { total, detalhamento } = resultados;

  const handleExportar = () => {
    const printDiv = document.createElement('div');
    printDiv.id = 'print-results-only';
    printDiv.innerHTML = `
      <div class="section">
        <h2>Resultados do Cálculo</h2>
        <div class="result-item total">
          <span class="result-label">Total Geral:</span>
          <span class="result-value">${formatCurrency(total)}</span>
        </div>
      </div>
      
      <div class="valor-total">
        <span class="titulo">Valor Total da Reclamação</span>
        <span class="valor">${formatCurrency(total)}</span>
      </div>
    `;
    
    document.body.appendChild(printDiv);
    exportToPDF();
    document.body.removeChild(printDiv);
  };

  const handleCompartilhar = () => {
    const textoCalculo = generateCalculationText(resultados);
    const confirmacao = window.confirm('Escolha o método de compartilhamento:\nOK = WhatsApp\nCancelar = Email');
    
    if (confirmacao) {
      shareViaWhatsApp(textoCalculo);
    } else {
      shareViaEmail('Resultado do Cálculo Trabalhista', textoCalculo);
    }
  };

  const verbasRescisoriasItems = [
    { label: 'Saldo de Salário', value: detalhamento.verbas.salarioProporcional },
    { label: '13º Salário Proporcional', value: detalhamento.verbas.decimoTerceiro },
    { label: 'Férias Proporcionais + 1/3', value: detalhamento.verbas.feriasProporcionais },
    { label: 'Aviso Prévio', value: detalhamento.verbas.avisoPrevio },
    { label: 'FGTS sobre Verbas', value: detalhamento.verbas.fgts },
    { label: 'Multa do FGTS', value: detalhamento.verbas.multaFgts }
  ];

  const adicionaisItems = [
    { label: 'Insalubridade', value: detalhamento.adicionais.insalubridade },
    { label: 'Periculosidade', value: detalhamento.adicionais.periculosidade },
    { label: 'Adicional Noturno', value: detalhamento.adicionais.noturno }
  ];

  const verbasBeneficiosItems = [
    { label: 'Férias Vencidas + 1/3', value: detalhamento.verbas.feriasVencidas },
    { label: 'Indenização por Demissão Indevida', value: detalhamento.verbas.indenizacaoDemissaoIndevida },
    { label: 'Vale Transporte Não Pago', value: detalhamento.verbas.valeTransporteNaoPago },
    { label: 'Vale Alimentação Não Pago', value: detalhamento.verbas.valeAlimentacaoNaoPago },
    { label: 'Adicional de Transferência', value: detalhamento.verbas.adicionalTransferencia },
    { label: 'Descontos Indevidos', value: detalhamento.verbas.descontosIndevidos },
    { label: 'Diferenças Salariais', value: detalhamento.verbas.diferencasSalariais }
  ];

  const multasItems = [
    { label: 'Multa Art. 467 CLT', value: detalhamento.multas.art467 },
    { label: 'Multa Art. 477 CLT', value: detalhamento.multas.art477 }
  ];

  const outrosItems = [
    { label: 'Salário-Família', value: detalhamento.salarioFamilia },
    { label: 'Seguro-Desemprego', value: detalhamento.seguroDesemprego },
    { label: 'Cálculos Personalizados', value: detalhamento.calculosPersonalizados }
  ];

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-xl text-juriscalc-navy flex items-center justify-between">
          Resultados do Cálculo
          <ResultsActions 
            onSalvar={onSalvar}
            onExportar={handleExportar}
            onCompartilhar={handleCompartilhar}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <CalculationSection title="Verbas Rescisórias" items={verbasRescisoriasItems} />

          <div>
            <h3 className="text-lg font-medium mb-2">Adicionais</h3>
            <div className="space-y-2">
              {adicionaisItems.map((item, index) => 
                item.value > 0 && (
                  <div key={index} className="flex justify-between">
                    <span>{item.label}:</span>
                    <span>{formatCurrency(item.value)}</span>
                  </div>
                )
              )}
              <HorasExtrasSection 
                horasExtras={horasExtras}
                totalValue={detalhamento.adicionais.horasExtras}
              />
            </div>
          </div>

          <CalculationSection title="Verbas e Benefícios" items={verbasBeneficiosItems} />
          <CalculationSection title="Multas" items={multasItems} />
          <CalculationSection title="Outros Valores" items={outrosItems} />

          <TotalDisplay total={total} />
        </div>
      </CardContent>
    </Card>
  );
}
