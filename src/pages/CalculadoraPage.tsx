import { useCalculadoraState } from '@/hooks/calculadora/useCalculadoraState';
import { useCalculos } from '@/hooks/calculadora/useCalculos';
import { useCalculosSalvos, CalculoSalvo } from '@/hooks/useCalculosSalvos';
import { AdicionaisBasicos } from '@/components/calculadora/AdicionaisBasicos';
import { VerbasAdicionais } from '@/components/calculadora/VerbasAdicionais';
import { MultasOutrosAdicionais } from '@/components/calculadora/MultasOutrosAdicionais';
import { ResultadosCalculo } from '@/components/calculadora/ResultadosCalculo';
import { ContractDataForm } from '@/components/calculadora/ContractDataForm';
import { SavedCalculations } from '@/components/calculadora/SavedCalculations';
import { toast } from 'sonner';
import { CalculadoraState, DadosContrato } from '@/types/calculadora';

export function CalculadoraPage() {
  const { state, updateState } = useCalculadoraState();
  const { calcular } = useCalculos();
  const { 
    calculosSalvos, 
    salvarCalculo, 
    removerCalculo, 
    renomearCalculo, 
    carregarCalculo 
  } = useCalculosSalvos();

  const handleCalcular = () => {
    try {
      // Criar uma cópia do estado para não modificá-lo diretamente
      const stateCopy: CalculadoraState = JSON.parse(JSON.stringify(state));
      
      // Garantir que o salário base seja um número
      stateCopy.dadosContrato.salarioBase = Number(stateCopy.dadosContrato.salarioBase) || 0;
      
      // Calcular os resultados
      const resultados = calcular(stateCopy);
      
      // Atualizar o estado com os resultados
      updateState({ resultados });
      
      console.log('Estado para cálculo:', stateCopy);
      console.log('Resultados calculados:', resultados);
    } catch (error) {
      console.error('Erro ao calcular resultados:', error);
    }
  };

  const handleSalvarCalculo = () => {
    if (!state.resultados) {
      toast.error('Realize um cálculo antes de salvar!');
      return;
    }

    if (!state.dadosContrato.salarioBase || state.dadosContrato.salarioBase <= 0) {
      toast.error('É necessário informar um salário base válido!');
      return;
    }

    if (!state.dadosContrato.dataAdmissao || !state.dadosContrato.dataDemissao) {
      toast.error('É necessário informar as datas de admissão e demissão!');
      return;
    }

    // Nome personalizado opcional
    const nomePersonalizado = prompt('Digite um nome para este cálculo (opcional):');
    
    // Ensure calculosPersonalizados is always defined
    const stateWithCalculosPersonalizados = {
      ...state,
      calculosPersonalizados: state.calculosPersonalizados || []
    };
    
    salvarCalculo(stateWithCalculosPersonalizados, state.resultados, nomePersonalizado || undefined);
  };

  const handleEditarCalculo = (calculo: CalculoSalvo) => {
    // Carregar os dados do cálculo no formulário
    updateState({
      dadosContrato: calculo.dadosContrato,
      adicionais: calculo.adicionais,
      verbas: calculo.verbas,
      multas: calculo.multas,
      salarioFamilia: calculo.salarioFamilia,
      seguroDesemprego: calculo.seguroDesemprego,
      resultados: calculo.resultados
    });
    
    toast.success('Cálculo carregado para edição!');
    
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mapTerminationType = (value: 'dismissal' | 'resignation' | 'mutual' | 'just_cause'): 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' => {
    const mapping = {
      'dismissal': 'sem_justa_causa',
      'resignation': 'pedido_demissao', 
      'mutual': 'acordo_mutuo',
      'just_cause': 'justa_causa'
    } as const;
    
    return mapping[value];
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Calculadora Trabalhista</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Dados do Contrato */}
          <div className="bg-white p-6 rounded-lg shadow">
            <ContractDataForm 
              data={{
                daysWorked: parseInt(state.dadosContrato.diasTrabalhados) || 0,
                monthsWorked: parseInt(state.dadosContrato.mesesTrabalhados) || 0,
                fixedTermContract: state.dadosContrato.contratoTempoDeterminado || false,
                noticePeriodFulfilled: state.dadosContrato.avisoPrevioCumprido || false,
                fgtsDeposited: state.dadosContrato.fgtsDepositado || false,
                admissionDate: state.dadosContrato.dataAdmissao,
                terminationDate: state.dadosContrato.dataDemissao,
                baseSalary: state.dadosContrato.salarioBase,
                terminationType: (state.dadosContrato.motivoDemissao === 'sem_justa_causa' ? 'dismissal' :
                                 state.dadosContrato.motivoDemissao === 'pedido_demissao' ? 'resignation' :
                                 state.dadosContrato.motivoDemissao === 'acordo_mutuo' ? 'mutual' :
                                 state.dadosContrato.motivoDemissao === 'justa_causa' ? 'just_cause' : 'dismissal') as 'dismissal' | 'resignation' | 'mutual' | 'just_cause'
              }}
              onUpdate={(field, value) => {
                const dadosContratoUpdates: Partial<DadosContrato> = {};
                
                switch (field) {
                  case 'daysWorked':
                    dadosContratoUpdates.diasTrabalhados = String(value);
                    break;
                  case 'monthsWorked':
                    dadosContratoUpdates.mesesTrabalhados = String(value);
                    break;
                  case 'fixedTermContract':
                    dadosContratoUpdates.contratoTempoDeterminado = value as boolean;
                    break;
                  case 'noticePeriodFulfilled':
                    dadosContratoUpdates.avisoPrevioCumprido = value as boolean;
                    break;
                  case 'fgtsDeposited':
                    dadosContratoUpdates.fgtsDepositado = value as boolean;
                    break;
                  case 'admissionDate':
                    dadosContratoUpdates.dataAdmissao = value as string;
                    break;
                  case 'terminationDate':
                    dadosContratoUpdates.dataDemissao = value as string;
                    break;
                  case 'baseSalary':
                    dadosContratoUpdates.salarioBase = Number(value) || 0;
                    break;
                  case 'terminationType':
                    dadosContratoUpdates.motivoDemissao = mapTerminationType(value as 'dismissal' | 'resignation' | 'mutual' | 'just_cause');
                    break;
                }
                
                updateState({
                    dadosContrato: {
                      ...state.dadosContrato,
                    ...dadosContratoUpdates
                    }
                });
              }}
            />
          </div>

          {/* Adicionais Básicos */}
          <div className="bg-white p-6 rounded-lg shadow">
            <AdicionaisBasicos state={state} updateState={updateState} />
          </div>

          {/* Verbas e Benefícios */}
          <div className="bg-white p-6 rounded-lg shadow">
            <VerbasAdicionais state={state} updateState={updateState} />
          </div>
        </div>

        <div className="space-y-8">
          {/* Multas e Outros Adicionais */}
          <div className="bg-white p-6 rounded-lg shadow">
            <MultasOutrosAdicionais state={state} updateState={updateState} />
          </div>

          {/* Botão de Calcular */}
          <div className="bg-white p-6 rounded-lg shadow">
            <button
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleCalcular}
            >
              Calcular
            </button>
          </div>

          {/* Resultados */}
          {state.resultados && (
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <ResultadosCalculo 
                resultados={state.resultados} 
                horasExtras={state.adicionais.horasExtras}
                dadosContrato={state.dadosContrato}
                onSalvar={handleSalvarCalculo}
              />
            </div>
          )}
        </div>
      </div>

      {/* Área de Cálculos Salvos */}
      <div className="mt-8">
        <SavedCalculations
          calculos={calculosSalvos}
          onDelete={removerCalculo}
          onLoad={handleEditarCalculo}
        />
      </div>
    </div>
  );
}
