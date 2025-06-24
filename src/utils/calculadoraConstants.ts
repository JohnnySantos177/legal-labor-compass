
import { Resultados, Adicionais } from '@/types/calculadora';

export const resultadosIniciais: Resultados = {
  total: 0,
  detalhamento: {
    verbas: {
      salarioProporcional: 0,
      decimoTerceiro: 0,
      feriasProporcionais: 0,
      avisoPrevio: 0,
      fgts: 0,
      multaFgts: 0,
      feriasVencidas: 0,
      decimoTerceiroAvisoPrevio: 0,
      feriasAvisoPrevio: 0,
      indenizacaoDemissaoIndevida: 0,
      valeTransporteNaoPago: 0,
      valeAlimentacaoNaoPago: 0,
      adicionalTransferencia: 0,
      descontosIndevidos: 0,
      diferencasSalariais: 0,
      tercoConstitucional: 0,
      total: 0,
    },
    adicionais: {
      insalubridade: 0,
      periculosidade: 0,
      noturno: 0,
      horasExtras: 0,
    },
    multas: {
      art467: 0,
      art477: 0,
    },
    salarioFamilia: 0,
    seguroDesemprego: 0,
    calculosPersonalizados: 0,
  },
  dadosContrato: {
    salarioBase: 0,
    dataAdmissao: '',
    dataDemissao: '',
    motivoDemissao: '',
    diasTrabalhados: '0',
    mesesTrabalhados: '0',
    contratoTempoDeterminado: false,
    avisoPrevioCumprido: false,
    fgtsDepositado: false,
  },
};

export const adicionaisIniciais: Adicionais = {
  calcularInsalubridade: false,
  grauInsalubridade: 'minimo',
  baseCalculoInsalubridade: 'salario_minimo',
  insalubridadePeriodoEspecifico: false,
  dataInicioInsalubridade: '',
  dataFimInsalubridade: '',
  insalubridade: {
    ativo: false,
    grau: 'minimo',
    baseCalculo: 'salario_minimo'
  },
  
  calcularPericulosidade: false,
  percentualPericulosidade: '30',
  baseCalculoPericulosidade: 'salario_base',
  periculosidadePeriodoEspecifico: false,
  dataInicioPericulosidade: '',
  dataFimPericulosidade: '',
  periculosidade: {
    ativo: false,
    percentual: 30,
    baseCalculo: 'salario_base'
  },
  
  calcularMulta467: false,
  calcularMulta477: false,
  calcularAdicionalNoturno: false,
  percentualAdicionalNoturno: '20',
  horasNoturnas: '',
  noturno: {
    ativo: false,
    percentual: 20,
    horas: 0
  },
  calcularHorasExtras: false,
  quantidadeHorasExtras: '',
  percentualHorasExtras: '50',
  horasExtrasCalculos: [],
  horasExtras: {
    ativo: false,
    calculos: []
  },
  calcularFeriasVencidas: false,
  periodosFeriasVencidas: '1',
  calcularIndenizacaoDemissao: false,
  valorIndenizacaoDemissao: '',
  calcularValeTransporte: false,
  valorDiarioVT: '',
  diasValeTransporte: '',
  calcularValeAlimentacao: false,
  valorDiarioVA: '',
  diasValeAlimentacao: '',
  calcularAdicionalTransferencia: false,
  percentualAdicionalTransferencia: '25',
  calcularDescontosIndevidos: false,
  valorDescontosIndevidos: '',
  calcularDiferencasSalariais: false,
  valorDiferencasSalariais: '',
  calculosCustom: {
    ativo: false,
    itens: []
  },
  calcularSeguroDesemprego: false,
  tipoTrabalhador: 'padrao',
  salarioUltimos3Meses: 'sim',
  ultimoSalario: '',
  salarioMes1: '',
  salarioMes2: '',
  mesesTrabalhadosUltimoEmprego: '',
  tempoContribuicaoINSS: '',
  calcularSalarioFamilia: false,
  quantidadeFilhos: '',
  calcularHonorariosAdvocaticios: false,
  percentualHonorariosAdvocaticios: '20',
  valorHonorariosAdvocaticios: '',
  incluirTotalGeralHonorarios: false,
};

// Constantes para cálculos
export const SALARIO_MINIMO = 1412.00; // Valor para 2024/2025
export const SALARIO_MINIMO_2024 = 1412.00;
export const VALOR_MAXIMO_SEGURO_DESEMPREGO = 2259.72;
export const FAIXA_1_SEGURO_DESEMPREGO = 1968.36;
export const FAIXA_2_SEGURO_DESEMPREGO = 3279.96;
export const VALOR_SALARIO_MINIMO_2025 = 1412.00;
export const VALOR_ADICIONAL_FAIXA_2 = 58.57;
export const VALOR_SALARIO_FAMILIA = 59.82;
export const LIMITE_SALARIO_FAMILIA = 1819.26;

export const EMPTY_RESULTS: any = {
  total: 0,
  detalhamento: {
    verbas: {
      salarioProporcional: 0,
      decimoTerceiro: 0,
      feriasProporcionais: 0,
      avisoPrevio: 0,
      fgts: 0,
      multaFgts: 0,
      feriasVencidas: 0,
      decimoTerceiroAvisoPrevio: 0,
      feriasAvisoPrevio: 0,
      indenizacaoDemissaoIndevida: 0,
      valeTransporteNaoPago: 0,
      valeAlimentacaoNaoPago: 0,
      adicionalTransferencia: 0,
      descontosIndevidos: 0,
      diferencasSalariais: 0,
      tercoConstitucional: 0,
      total: 0,
    },
    adicionais: {
      insalubridade: 0,
      periculosidade: 0,
      noturno: 0,
      horasExtras: 0,
    },
    multas: {
      art467: 0,
      art477: 0,
    },
    salarioFamilia: 0,
    seguroDesemprego: 0,
    calculosPersonalizados: 0,
  },
  dadosContrato: {
    salarioBase: 0,
    dataAdmissao: '',
    dataDemissao: '',
    motivoDemissao: '',
    diasTrabalhados: '0',
    mesesTrabalhados: '0',
    contratoTempoDeterminado: false,
    avisoPrevioCumprido: false,
    fgtsDepositado: false,
  },
};
