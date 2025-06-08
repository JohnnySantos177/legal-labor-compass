
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CalculoSalvo } from '@/hooks/useCalculosSalvos';

interface CalculationViewerProps {
  calculo: CalculoSalvo;
  onClose: () => void;
}

export const CalculationViewer = ({ calculo, onClose }: CalculationViewerProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{calculo.nome}</DialogTitle>
          <p className="text-sm text-gray-500">
            Criado em: {formatDate(calculo.dataCriacao)}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados do Contrato */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dados do Contrato</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Salário Base:</span>
                <span className="ml-2">{formatCurrency(calculo.dadosContrato.salarioBase)}</span>
              </div>
              <div>
                <span className="font-medium">Data Admissão:</span>
                <span className="ml-2">{formatDate(calculo.dadosContrato.dataAdmissao)}</span>
              </div>
              <div>
                <span className="font-medium">Data Demissão:</span>
                <span className="ml-2">{formatDate(calculo.dadosContrato.dataDemissao)}</span>
              </div>
              <div>
                <span className="font-medium">Tipo de Rescisão:</span>
                <span className="ml-2">
                  {calculo.dadosContrato.motivoDemissao === 'sem_justa_causa' ? 'Dispensa sem Justa Causa' :
                   calculo.dadosContrato.motivoDemissao === 'justa_causa' ? 'Dispensa por Justa Causa' :
                   calculo.dadosContrato.motivoDemissao === 'pedido_demissao' ? 'Pedido de Demissão' :
                   calculo.dadosContrato.motivoDemissao === 'acordo_mutuo' ? 'Acordo Mútuo' : 
                   'Não informado'}
                </span>
              </div>
              <div>
                <span className="font-medium">Dias Trabalhados:</span>
                <span className="ml-2">{calculo.dadosContrato.diasTrabalhados}</span>
              </div>
              <div>
                <span className="font-medium">Meses Trabalhados:</span>
                <span className="ml-2">{calculo.dadosContrato.mesesTrabalhados}</span>
              </div>
            </div>
          </div>

          {/* Adicionais Ativos */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Adicionais</h3>
            <div className="space-y-2 text-sm">
              {calculo.adicionais.insalubridade.ativo && (
                <div className="flex justify-between">
                  <span>Insalubridade ({calculo.adicionais.insalubridade.grau}):</span>
                  <span>{formatCurrency(calculo.adicionais.insalubridade.valor || 0)}</span>
                </div>
              )}
              {calculo.adicionais.periculosidade.ativo && (
                <div className="flex justify-between">
                  <span>Periculosidade ({calculo.adicionais.periculosidade.percentual}%):</span>
                  <span>{formatCurrency(calculo.adicionais.periculosidade.valor || 0)}</span>
                </div>
              )}
              {calculo.adicionais.noturno.ativo && (
                <div className="flex justify-between">
                  <span>Adicional Noturno:</span>
                  <span>{formatCurrency(calculo.adicionais.noturno.valor || 0)}</span>
                </div>
              )}
              {calculo.adicionais.horasExtras.ativo && (
                <div className="flex justify-between">
                  <span>Horas Extras:</span>
                  <span>{formatCurrency(calculo.adicionais.horasExtras.valor || 0)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Resultados */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resultados do Cálculo</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Geral:</span>
                <span className="text-blue-600">
                  {formatCurrency(calculo.resultados?.total || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Detalhamento dos Resultados */}
          {calculo.resultados?.detalhamento && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Detalhamento</h3>
              <div className="space-y-4 text-sm">
                {/* Verbas Rescisórias */}
                {calculo.resultados.detalhamento.verbas && (
                  <div>
                    <h4 className="font-medium mb-2">Verbas Rescisórias:</h4>
                    <div className="pl-4 space-y-1">
                      {Object.entries(calculo.resultados.detalhamento.verbas).map(([key, value]) => (
                        typeof value === 'number' && value > 0 && (
                          <div key={key} className="flex justify-between">
                            <span>{key}:</span>
                            <span>{formatCurrency(value)}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Adicionais no resultado */}
                {calculo.resultados.detalhamento.adicionais && (
                  <div>
                    <h4 className="font-medium mb-2">Adicionais:</h4>
                    <div className="pl-4 space-y-1">
                      {Object.entries(calculo.resultados.detalhamento.adicionais).map(([key, value]) => (
                        typeof value === 'number' && value > 0 && (
                          <div key={key} className="flex justify-between">
                            <span>{key}:</span>
                            <span>{formatCurrency(value)}</span>
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
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
