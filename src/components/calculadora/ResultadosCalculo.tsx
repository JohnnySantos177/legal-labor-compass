
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Resultados } from '@/types/calculadora';
import { Button } from '@/components/ui/button';
import { Download, Save, Share2 } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

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

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-xl text-juriscalc-navy flex items-center justify-between">
          Resultados do Cálculo
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-juriscalc-blue" onClick={onSalvar}>
              <Save className="w-4 h-4 mr-1" />
              Salvar
            </Button>
            <Button variant="outline" size="sm" className="text-juriscalc-blue">
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="text-juriscalc-blue">
              <Share2 className="w-4 h-4 mr-1" />
              Compartilhar
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Verbas Rescisórias */}
          <div>
            <h3 className="text-lg font-medium mb-2">Verbas Rescisórias</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Saldo de Salário:</span>
                <span>{formatCurrency(detalhamento.verbas.salarioProporcional)}</span>
              </div>
              {detalhamento.verbas.decimoTerceiro > 0 && (
                <div className="flex justify-between">
                  <span>13º Salário Proporcional:</span>
                  <span>{formatCurrency(detalhamento.verbas.decimoTerceiro)}</span>
                </div>
              )}
              {detalhamento.verbas.feriasProporcionais > 0 && (
                <div className="flex justify-between">
                  <span>Férias Proporcionais + 1/3:</span>
                  <span>{formatCurrency(detalhamento.verbas.feriasProporcionais)}</span>
                </div>
              )}
              {detalhamento.verbas.avisoPrevio > 0 && (
                <div className="flex justify-between">
                  <span>Aviso Prévio:</span>
                  <span>{formatCurrency(detalhamento.verbas.avisoPrevio)}</span>
                </div>
              )}
              {detalhamento.verbas.fgts > 0 && (
                <div className="flex justify-between">
                  <span>FGTS sobre Verbas:</span>
                  <span>{formatCurrency(detalhamento.verbas.fgts)}</span>
                </div>
              )}
              {detalhamento.verbas.multaFgts > 0 && (
                <div className="flex justify-between">
                  <span>Multa do FGTS:</span>
                  <span>{formatCurrency(detalhamento.verbas.multaFgts)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Adicionais */}
          <div>
            <h3 className="text-lg font-medium mb-2">Adicionais</h3>
            <div className="space-y-2">
              {detalhamento.adicionais.insalubridade > 0 && (
                <div className="flex justify-between">
                  <span>Insalubridade:</span>
                  <span>{formatCurrency(detalhamento.adicionais.insalubridade)}</span>
                </div>
              )}
              {detalhamento.adicionais.periculosidade > 0 && (
                <div className="flex justify-between">
                  <span>Periculosidade:</span>
                  <span>{formatCurrency(detalhamento.adicionais.periculosidade)}</span>
                </div>
              )}
              {detalhamento.adicionais.noturno > 0 && (
                <div className="flex justify-between">
                  <span>Adicional Noturno:</span>
                  <span>{formatCurrency(detalhamento.adicionais.noturno)}</span>
                </div>
              )}
              {horasExtras.ativo && horasExtras.calculos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Horas Extras:</span>
                    <span>{formatCurrency(detalhamento.adicionais.horasExtras)}</span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    {horasExtras.calculos.map((horaExtra, index) => (
                      <div key={horaExtra.id} className="flex justify-between text-gray-600">
                        <span>Cálculo {index + 1} ({horaExtra.quantidade}h a {horaExtra.percentual}%):</span>
                        <span>{formatCurrency(horaExtra.valor || 0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Verbas e Benefícios */}
          <div>
            <h3 className="text-lg font-medium mb-2">Verbas e Benefícios</h3>
            <div className="space-y-2">
              {detalhamento.verbas.feriasVencidas > 0 && (
                <div className="flex justify-between">
                  <span>Férias Vencidas + 1/3:</span>
                  <span>{formatCurrency(detalhamento.verbas.feriasVencidas)}</span>
                </div>
              )}
              {detalhamento.verbas.indenizacaoDemissaoIndevida > 0 && (
                <div className="flex justify-between">
                  <span>Indenização por Demissão Indevida:</span>
                  <span>{formatCurrency(detalhamento.verbas.indenizacaoDemissaoIndevida)}</span>
                </div>
              )}
              {detalhamento.verbas.valeTransporteNaoPago > 0 && (
                <div className="flex justify-between">
                  <span>Vale Transporte Não Pago:</span>
                  <span>{formatCurrency(detalhamento.verbas.valeTransporteNaoPago)}</span>
                </div>
              )}
              {detalhamento.verbas.valeAlimentacaoNaoPago > 0 && (
                <div className="flex justify-between">
                  <span>Vale Alimentação Não Pago:</span>
                  <span>{formatCurrency(detalhamento.verbas.valeAlimentacaoNaoPago)}</span>
                </div>
              )}
              {detalhamento.verbas.adicionalTransferencia > 0 && (
                <div className="flex justify-between">
                  <span>Adicional de Transferência:</span>
                  <span>{formatCurrency(detalhamento.verbas.adicionalTransferencia)}</span>
                </div>
              )}
              {detalhamento.verbas.descontosIndevidos > 0 && (
                <div className="flex justify-between">
                  <span>Descontos Indevidos:</span>
                  <span>{formatCurrency(detalhamento.verbas.descontosIndevidos)}</span>
                </div>
              )}
              {detalhamento.verbas.diferencasSalariais > 0 && (
                <div className="flex justify-between">
                  <span>Diferenças Salariais:</span>
                  <span>{formatCurrency(detalhamento.verbas.diferencasSalariais)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Multas */}
          <div>
            <h3 className="text-lg font-medium mb-2">Multas</h3>
            <div className="space-y-2">
              {detalhamento.multas.art467 > 0 && (
                <div className="flex justify-between">
                  <span>Multa Art. 467 CLT:</span>
                  <span>{formatCurrency(detalhamento.multas.art467)}</span>
                </div>
              )}
              {detalhamento.multas.art477 > 0 && (
                <div className="flex justify-between">
                  <span>Multa Art. 477 CLT:</span>
                  <span>{formatCurrency(detalhamento.multas.art477)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Outros */}
          <div>
            <h3 className="text-lg font-medium mb-2">Outros Valores</h3>
            <div className="space-y-2">
              {detalhamento.salarioFamilia > 0 && (
                <div className="flex justify-between">
                  <span>Salário-Família:</span>
                  <span>{formatCurrency(detalhamento.salarioFamilia)}</span>
                </div>
              )}
              {detalhamento.seguroDesemprego > 0 && (
                <div className="flex justify-between">
                  <span>Seguro-Desemprego:</span>
                  <span>{formatCurrency(detalhamento.seguroDesemprego)}</span>
                </div>
              )}
              {detalhamento.calculosPersonalizados > 0 && (
                <div className="flex justify-between">
                  <span>Cálculos Personalizados:</span>
                  <span>{formatCurrency(detalhamento.calculosPersonalizados)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
