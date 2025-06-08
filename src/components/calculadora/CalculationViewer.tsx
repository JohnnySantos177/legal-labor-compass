
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalculoSalvo } from '@/hooks/useCalculosSalvos';

interface CalculationViewerProps {
  calculo: CalculoSalvo;
  onClose: () => void;
}

export const CalculationViewer = ({ calculo, onClose }: CalculationViewerProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getVerbaDisplayName = (key: string) => {
    const nomes: { [key: string]: string } = {
      'salarioProporcional': 'Saldo de Salário',
      'decimoTerceiro': '13º Salário Proporcional',
      'feriasProporcionais': 'Férias Proporcionais + 1/3',
      'feriasVencidas': 'Férias Vencidas + 1/3',
      'avisoPrevio': 'Aviso Prévio',
      'fgts': 'FGTS sobre Verbas',
      'multaFgts': 'Multa do FGTS (40%)',
      'indenizacaoDemissaoIndevida': 'Indenização por Demissão Indevida',
      'valeTransporteNaoPago': 'Vale Transporte Não Pago',
      'valeAlimentacaoNaoPago': 'Vale Alimentação Não Pago',
      'adicionalTransferencia': 'Adicional de Transferência',
      'descontosIndevidos': 'Descontos Indevidos',
      'diferencasSalariais': 'Diferenças Salariais'
    };
    return nomes[key] || key;
  };

  const getAdicionalDisplayName = (key: string) => {
    const nomes: { [key: string]: string } = {
      'insalubridade': 'Adicional de Insalubridade',
      'periculosidade': 'Adicional de Periculosidade',
      'noturno': 'Adicional Noturno',
      'horasExtras': 'Horas Extras'
    };
    return nomes[key] || key;
  };

  const getMultaDisplayName = (key: string) => {
    const nomes: { [key: string]: string } = {
      'art467': 'Multa Art. 467 CLT',
      'art477': 'Multa Art. 477 CLT'
    };
    return nomes[key] || key;
  };

  const getTipoRescisaoDisplayName = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      'sem_justa_causa': 'Dispensa sem Justa Causa',
      'justa_causa': 'Dispensa por Justa Causa',
      'pedido_demissao': 'Pedido de Demissão',
      'acordo_mutuo': 'Acordo Mútuo'
    };
    return tipos[tipo] || 'Não informado';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">{calculo.nome}</DialogTitle>
          <p className="text-sm text-gray-500">
            Criado em: {formatDate(calculo.dataCriacao)}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados do Contrato */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">📋 Dados do Contrato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">💰 Salário Base:</span>
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {formatCurrency(calculo.dadosContrato.salarioBase)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">📅 Data de Admissão:</span>
                  <span className="text-sm">{formatDate(calculo.dadosContrato.dataAdmissao)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">📅 Data de Demissão:</span>
                  <span className="text-sm">{formatDate(calculo.dadosContrato.dataDemissao)}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">⚖️ Tipo de Rescisão:</span>
                  <Badge variant="outline" className="text-xs">
                    {getTipoRescisaoDisplayName(calculo.dadosContrato.motivoDemissao)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">📊 Dias Trabalhados:</span>
                  <span className="text-sm">{calculo.dadosContrato.diasTrabalhados}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">📊 Meses Trabalhados:</span>
                  <span className="text-sm">{calculo.dadosContrato.mesesTrabalhados}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Adicionais Ativos */}
          {(calculo.adicionais.insalubridade.ativo || calculo.adicionais.periculosidade.ativo || 
            calculo.adicionais.noturno.ativo || calculo.adicionais.horasExtras.ativo) && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b border-blue-200 pb-2">⚡ Adicionais</h3>
              <div className="space-y-3">
                {calculo.adicionais.insalubridade.ativo && (
                  <div className="flex justify-between items-center bg-white p-3 rounded border-l-4 border-blue-400">
                    <span className="font-medium text-gray-700">
                      🏭 {getAdicionalDisplayName('insalubridade')} ({calculo.adicionais.insalubridade.grau})
                    </span>
                    <Badge className="bg-blue-600 text-white">
                      {formatCurrency(calculo.adicionais.insalubridade.valor || 0)}
                    </Badge>
                  </div>
                )}
                {calculo.adicionais.periculosidade.ativo && (
                  <div className="flex justify-between items-center bg-white p-3 rounded border-l-4 border-orange-400">
                    <span className="font-medium text-gray-700">
                      ⚠️ {getAdicionalDisplayName('periculosidade')} ({calculo.adicionais.periculosidade.percentual}%)
                    </span>
                    <Badge className="bg-orange-600 text-white">
                      {formatCurrency(calculo.adicionais.periculosidade.valor || 0)}
                    </Badge>
                  </div>
                )}
                {calculo.adicionais.noturno.ativo && (
                  <div className="flex justify-between items-center bg-white p-3 rounded border-l-4 border-purple-400">
                    <span className="font-medium text-gray-700">🌙 {getAdicionalDisplayName('noturno')}</span>
                    <Badge className="bg-purple-600 text-white">
                      {formatCurrency(calculo.adicionais.noturno.valor || 0)}
                    </Badge>
                  </div>
                )}
                {calculo.adicionais.horasExtras.ativo && (
                  <div className="flex justify-between items-center bg-white p-3 rounded border-l-4 border-green-400">
                    <span className="font-medium text-gray-700">⏰ {getAdicionalDisplayName('horasExtras')}</span>
                    <Badge className="bg-green-600 text-white">
                      {formatCurrency(calculo.adicionais.horasExtras.valor || 0)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resultados */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-green-800 border-b border-green-200 pb-2">💰 Resultado Total</h3>
            <div className="bg-green-600 text-white p-6 rounded-lg text-center">
              <div className="text-sm uppercase tracking-wide mb-2">Valor Total da Reclamação</div>
              <div className="text-3xl font-bold">
                {formatCurrency(calculo.resultados?.total || 0)}
              </div>
            </div>
          </div>

          {/* Detalhamento dos Resultados */}
          {calculo.resultados?.detalhamento && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-yellow-800 border-b border-yellow-200 pb-2">📊 Detalhamento</h3>
              <div className="space-y-6">
                
                {/* Verbas Rescisórias */}
                {calculo.resultados.detalhamento.verbas && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                      <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                      Verbas Rescisórias
                    </h4>
                    <div className="grid gap-2">
                      {Object.entries(calculo.resultados.detalhamento.verbas).map(([key, value]) => (
                        typeof value === 'number' && value > 0 && (
                          <div key={key} className="flex justify-between items-center bg-white p-3 rounded border-l-4 border-yellow-400">
                            <span className="text-gray-700">💼 {getVerbaDisplayName(key)}</span>
                            <Badge variant="secondary" className="font-semibold">
                              {formatCurrency(value)}
                            </Badge>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Adicionais no resultado */}
                {calculo.resultados.detalhamento.adicionais && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                      Adicionais
                    </h4>
                    <div className="grid gap-2">
                      {Object.entries(calculo.resultados.detalhamento.adicionais).map(([key, value]) => (
                        typeof value === 'number' && value > 0 && (
                          <div key={key} className="flex justify-between items-center bg-white p-3 rounded border-l-4 border-blue-400">
                            <span className="text-gray-700">⚡ {getAdicionalDisplayName(key)}</span>
                            <Badge className="bg-blue-600 text-white font-semibold">
                              {formatCurrency(value)}
                            </Badge>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Multas */}
                {calculo.resultados.detalhamento.multas && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                      Multas
                    </h4>
                    <div className="grid gap-2">
                      {Object.entries(calculo.resultados.detalhamento.multas).map(([key, value]) => (
                        typeof value === 'number' && value > 0 && (
                          <div key={key} className="flex justify-between items-center bg-white p-3 rounded border-l-4 border-red-400">
                            <span className="text-gray-700">⚖️ {getMultaDisplayName(key)}</span>
                            <Badge className="bg-red-600 text-white font-semibold">
                              {formatCurrency(value)}
                            </Badge>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} className="px-6">Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
