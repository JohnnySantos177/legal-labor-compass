import { useState, useEffect } from 'react';
import { CalculadoraState, DadosContrato, Adicionais, Verbas, Multas, SalarioFamilia, SeguroDesemprego, CalculoPersonalizado } from '@/types/calculadora';

const estadoInicial: CalculadoraState = {
  dadosContrato: {
    salarioBase: 0,
    dataAdmissao: '',
    dataDemissao: '',
    motivoDemissao: '',
    diasTrabalhados: '0',
    mesesTrabalhados: '0',
    contratoTempoDeterminado: false,
    avisoPrevioCumprido: false,
    fgtsDepositado: false
  },
  adicionais: {
    insalubridade: {
      ativo: false,
      grau: 'minimo',
      baseCalculo: 'salario_minimo',
      periodoEspecifico: false,
      dataInicio: '',
      dataFim: '',
      valor: 0
    },
    periculosidade: {
      ativo: false,
      percentual: 30,
      baseCalculo: 'salario_base',
      valor: 0
    },
    noturno: {
      ativo: false,
      percentual: 20,
      horas: 0,
      valor: 0
    },
    horasExtras: {
      ativo: false,
      calculos: [],
      valor: 0
    }
  },
  verbas: {
    feriasVencidas: {
      ativo: false,
      periodos: 1,
      valor: 0
    },
    indenizacaoDemissaoIndevida: {
      ativo: false,
      valor: 0
    },
    valeTransporteNaoPago: {
      ativo: false,
      valor: 0,
      meses: 0
    },
    valeAlimentacaoNaoPago: {
      ativo: false,
      valor: 0,
      meses: 0
    },
    adicionalTransferencia: {
      ativo: false,
      percentual: 25,
      meses: 0
    },
    descontosIndevidos: {
      ativo: false,
      valor: 0,
      descricao: ''
    },
    diferencasSalariais: {
      ativo: false,
      valorDiferenca: 0,
      meses: 0
    }
  },
  multas: {
    art467: {
      ativo: false,
      valor: 0
    },
    art477: {
      ativo: false,
      valor: 0
    }
  },
  salarioFamilia: {
    ativo: false,
    quantidadeFilhos: 0,
    valorPorFilho: 0,
    valorTotal: 0
  },
  seguroDesemprego: {
    ativo: false,
    tipoTrabalhador: 'formal',
    salarioConstante: true,
    ultimoSalario: 0,
    mesesTrabalhados: 0,
    valorParcelas: []
  },
  calculosPersonalizados: []
};

export function useCalculadoraState() {
  const [state, setState] = useState<CalculadoraState>(estadoInicial);

  // Função para calcular os dias trabalhados no último mês
  const calcularDiasTrabalhados = (dataAdmissao: string, dataDemissao: string) => {
    if (!dataAdmissao || !dataDemissao) return 0;
    
    const admissao = new Date(dataAdmissao);
    const demissao = new Date(dataDemissao);
    
    // Se as datas são do mesmo mês e ano
    if (admissao.getMonth() === demissao.getMonth() && 
        admissao.getFullYear() === demissao.getFullYear()) {
      return demissao.getDate() - admissao.getDate() + 1;
    }
    
    // Se estamos calculando o último mês
    const ultimoDiaDoMes = new Date(demissao.getFullYear(), demissao.getMonth() + 1, 0).getDate();
    return Math.min(demissao.getDate(), ultimoDiaDoMes);
  };

  // Função para calcular o total de meses trabalhados
  const calcularMesesTrabalhados = (dataAdmissao: string, dataDemissao: string) => {
    if (!dataAdmissao || !dataDemissao) return 0;
    
    const admissao = new Date(dataAdmissao);
    const demissao = new Date(dataDemissao);
    
    const anos = demissao.getFullYear() - admissao.getFullYear();
    const meses = demissao.getMonth() - admissao.getMonth();
    
    let totalMeses = anos * 12 + meses;
    
    // Ajuste para dias do mês
    if (demissao.getDate() < admissao.getDate()) {
      totalMeses--;
    }
    
    return Math.max(0, totalMeses);
  };

  // Efeito para atualizar os cálculos quando as datas mudarem
  useEffect(() => {
    const { dataAdmissao, dataDemissao } = state.dadosContrato;
    
    if (dataAdmissao && dataDemissao) {
      const dias = calcularDiasTrabalhados(dataAdmissao, dataDemissao);
      const meses = calcularMesesTrabalhados(dataAdmissao, dataDemissao);
      
      setState(prevState => ({
        ...prevState,
        dadosContrato: {
          ...prevState.dadosContrato,
          diasTrabalhados: String(dias),
          mesesTrabalhados: String(meses)
        }
      }));
    }
  }, [state.dadosContrato.dataAdmissao, state.dadosContrato.dataDemissao]);

  const updateState = (updates: Partial<CalculadoraState>) => {
    setState(prevState => {
      // Criar uma cópia profunda do estado atual
      const newState = JSON.parse(JSON.stringify(prevState));

      // Atualizar cada seção do estado se fornecida
      if (updates.dadosContrato) {
        newState.dadosContrato = {
          ...newState.dadosContrato,
          ...updates.dadosContrato
        };
      }

      if (updates.adicionais) {
        // Preservar a estrutura aninhada dos adicionais
        newState.adicionais = {
          insalubridade: {
            ...newState.adicionais.insalubridade,
            ...(updates.adicionais.insalubridade || {})
          },
          periculosidade: {
            ...newState.adicionais.periculosidade,
            ...(updates.adicionais.periculosidade || {})
          },
          noturno: {
            ...newState.adicionais.noturno,
            ...(updates.adicionais.noturno || {})
          },
          horasExtras: {
            ...newState.adicionais.horasExtras,
            ...(updates.adicionais.horasExtras || {}),
            calculos: updates.adicionais.horasExtras?.calculos || newState.adicionais.horasExtras.calculos
          }
        };
      }

      if (updates.verbas) {
        // Preservar a estrutura aninhada das verbas
        newState.verbas = {
          feriasVencidas: {
            ...newState.verbas.feriasVencidas,
            ...(updates.verbas.feriasVencidas || {})
          },
          indenizacaoDemissaoIndevida: {
            ...newState.verbas.indenizacaoDemissaoIndevida,
            ...(updates.verbas.indenizacaoDemissaoIndevida || {})
          },
          valeTransporteNaoPago: {
            ...newState.verbas.valeTransporteNaoPago,
            ...(updates.verbas.valeTransporteNaoPago || {})
          },
          valeAlimentacaoNaoPago: {
            ...newState.verbas.valeAlimentacaoNaoPago,
            ...(updates.verbas.valeAlimentacaoNaoPago || {})
          },
          adicionalTransferencia: {
            ...newState.verbas.adicionalTransferencia,
            ...(updates.verbas.adicionalTransferencia || {})
          },
          descontosIndevidos: {
            ...newState.verbas.descontosIndevidos,
            ...(updates.verbas.descontosIndevidos || {})
          },
          diferencasSalariais: {
            ...newState.verbas.diferencasSalariais,
            ...(updates.verbas.diferencasSalariais || {})
          }
        };
      }

      if (updates.multas) {
        // Preservar a estrutura aninhada das multas
        newState.multas = {
          art467: {
            ...newState.multas.art467,
            ...(updates.multas.art467 || {})
          },
          art477: {
            ...newState.multas.art477,
            ...(updates.multas.art477 || {})
          }
        };
      }

      if (updates.salarioFamilia) {
        newState.salarioFamilia = {
          ...newState.salarioFamilia,
          ...updates.salarioFamilia
        };
      }

      if (updates.seguroDesemprego) {
        newState.seguroDesemprego = {
          ...newState.seguroDesemprego,
          ...updates.seguroDesemprego,
          valorParcelas: updates.seguroDesemprego.valorParcelas || newState.seguroDesemprego.valorParcelas
        };
      }

      if (updates.calculosPersonalizados) {
        newState.calculosPersonalizados = updates.calculosPersonalizados;
      }

      if (updates.resultados) {
        newState.resultados = updates.resultados;
      }

      return newState;
    });
  };

  const resetState = () => {
    setState(estadoInicial);
  };

  return {
    state,
    updateState,
    resetState
  };
}

export default useCalculadoraState;
