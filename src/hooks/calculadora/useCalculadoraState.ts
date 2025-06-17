
import { useState, useEffect } from 'react';
import { CalculadoraState, DadosContrato, Adicionais, Verbas, Multas, SalarioFamilia, SeguroDesemprego, CustomCalculo } from '@/types/calculadora';

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
    // Insalubridade
    calcularInsalubridade: false,
    grauInsalubridade: 'minimo',
    baseCalculoInsalubridade: 'salario_minimo',
    insalubridadePeriodoEspecifico: false,
    dataInicioInsalubridade: '',
    dataFimInsalubridade: '',
    insalubridade: {
      ativo: false,
      grau: 'minimo',
      baseCalculo: 'salario_minimo',
    },

    // Periculosidade
    calcularPericulosidade: false,
    percentualPericulosidade: '30',
    baseCalculoPericulosidade: 'salario_base',
    periculosidadePeriodoEspecifico: false,
    dataInicioPericulosidade: '',
    dataFimPericulosidade: '',
    periculosidade: {
      ativo: false,
      percentual: 30,
      baseCalculo: 'salario_base',
    },

    // Multas
    calcularMulta467: false,
    calcularMulta477: false,

    // Noturno
    calcularAdicionalNoturno: false,
    percentualAdicionalNoturno: '20',
    horasNoturnas: '0',
    noturno: {
      ativo: false,
      percentual: 20,
      horas: 0,
    },

    // Horas Extras
    calcularHorasExtras: false,
    quantidadeHorasExtras: '0',
    percentualHorasExtras: '50',
    horasExtrasCalculos: [],
    horasExtras: {
      ativo: false,
      calculos: [],
    },

    // Férias Vencidas
    calcularFeriasVencidas: false,
    periodosFeriasVencidas: '0',

    // Indenização por Demissão Indevida
    calcularIndenizacaoDemissao: false,
    valorIndenizacaoDemissao: '0',

    // Vale Transporte Não Pago
    calcularValeTransporte: false,
    valorDiarioVT: '0',
    diasValeTransporte: '0',

    // Vale Alimentação Não Pago
    calcularValeAlimentacao: false,
    valorDiarioVA: '0',
    diasValeAlimentacao: '0',

    // Adicional de Transferência
    calcularAdicionalTransferencia: false,
    percentualAdicionalTransferencia: '0',

    // Descontos Indevidos
    calcularDescontosIndevidos: false,
    valorDescontosIndevidos: '0',

    // Diferenças Salariais
    calcularDiferencasSalariais: false,
    valorDiferencasSalariais: '0',

    // Cálculos Personalizados (Custom)
    calculosCustom: {
      ativo: false,
      itens: [],
    },

    // Seguro Desemprego
    calcularSeguroDesemprego: false,
    tipoTrabalhador: 'formal',
    salarioUltimos3Meses: '0',
    ultimoSalario: '0',
    salarioMes1: '0',
    salarioMes2: '0',
    mesesTrabalhadosUltimoEmprego: '0',
    tempoContribuicaoINSS: '0',

    // Salário Família
    calcularSalarioFamilia: false,
    quantidadeFilhos: '0',

    // Honorários Advocatícios
    calcularHonorariosAdvocaticios: false,
    percentualHonorariosAdvocaticios: '0',
    valorHonorariosAdvocaticios: '0',
    incluirTotalGeralHonorarios: false,
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
  calculosPersonalizados: [],
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
  }, [state.dadosContrato]);

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
          ...newState.adicionais,
          ...updates.adicionais
        };
      }

      if (updates.verbas) {
        newState.verbas = { ...newState.verbas, ...updates.verbas };
      }
      if (updates.multas) {
        newState.multas = { ...newState.multas, ...updates.multas };
      }
      if (updates.salarioFamilia) {
        newState.salarioFamilia = { ...newState.salarioFamilia, ...updates.salarioFamilia };
      }
      if (updates.seguroDesemprego) {
        newState.seguroDesemprego = { ...newState.seguroDesemprego, ...updates.seguroDesemprego };
      }
      if (updates.calculosPersonalizados) {
        newState.calculosPersonalizados = updates.calculosPersonalizados;
      }
      if (updates.resultados) {
        newState.resultados = { ...newState.resultados, ...updates.resultados };
      }

      return newState;
    });
  };

  const resetState = () => {
    setState(estadoInicial);
  };

  return { state, updateState, resetState };
}

export default useCalculadoraState;
