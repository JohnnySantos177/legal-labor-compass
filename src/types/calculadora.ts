export interface ContractData {
  admissionDate: string;
  terminationDate: string;
  baseSalary: number;
  terminationType: 'dismissal' | 'resignation' | 'mutual' | 'just_cause';
  daysWorked: number;
  monthsWorked: number;
  noticePeriodFulfilled: boolean;
  fgtsDeposited: boolean;
  fixedTermContract: boolean;
}

export interface Addition {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'calculated';
  value: number;
  enabled: boolean;
  specificPeriod?: {
    startDate: string;
    endDate: string;
  };
}

export interface UnhealthinessData extends Addition {
  degree: 'minimum' | 'medium' | 'maximum';
  calculationBasis: 'salary' | 'minimum_wage';
}

export interface PeriloisnessData extends Addition {
  percentage: number;
  calculationBasis: 'salary' | 'minimum_wage';
}

export interface OvertimeData extends Addition {
  quantity: number;
  percentage: number;
  detailedCalculations: boolean;
}

export interface HorasExtrasCalculo {
  id: string;
  percentual: number;
  quantidade: number;
  valor?: number;
}

export interface CalculationResult {
  id: string;
  totalValue: number;
  breakdown: {
    [key: string]: number;
  };
  contractData: ContractData;
  additions: Addition[];
  createdAt: string;
  userId: string;
}

export interface DadosContrato {
  salarioBase: number;
  dataAdmissao: string;
  dataDemissao: string;
  motivoDemissao: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | 'rescisao_indireta' | '';
  diasTrabalhados: string;
  mesesTrabalhados: string;
  contratoTempoDeterminado: boolean;
  avisoPrevioCumprido: boolean;
  fgtsDepositado: boolean;
  mesesRestantesContrato?: string;
}

export interface HoraExtra {
  id: string;
  percentual: number;
  quantidade: number;
}

export interface Adicionais {
  // Insalubridade
  calcularInsalubridade: boolean;
  grauInsalubridade: 'minimo' | 'medio' | 'maximo';
  baseCalculoInsalubridade: 'salario_minimo' | 'salario_base';
  insalubridadePeriodoEspecifico: boolean;
  dataInicioInsalubridade?: string;
  dataFimInsalubridade?: string;
  insalubridade: {
    ativo: boolean;
    grau: 'minimo' | 'medio' | 'maximo';
    baseCalculo: 'salario_minimo' | 'salario_base';
    valor?: number;
  };

  // Periculosidade
  calcularPericulosidade: boolean;
  percentualPericulosidade: string;
  baseCalculoPericulosidade: 'salario_minimo' | 'salario_base';
  periculosidadePeriodoEspecifico: boolean;
  dataInicioPericulosidade?: string;
  dataFimPericulosidade?: string;
  periculosidade: {
    ativo: boolean;
    percentual: number;
    baseCalculo: 'salario_minimo' | 'salario_base';
    valor?: number;
  };

  // Multas (adicionado para cálculo direto em adicionaisUtils)
  calcularMulta467: boolean;
  calcularMulta477: boolean;

  // Noturno
  calcularAdicionalNoturno: boolean;
  percentualAdicionalNoturno: string;
  horasNoturnas: string;
  noturno: {
    ativo: boolean;
    percentual: number;
    horas: number;
    valor?: number;
  };

  // Horas Extras
  calcularHorasExtras: boolean;
  quantidadeHorasExtras: string;
  percentualHorasExtras: string;
  horasExtrasCalculos: HoraExtra[];
  horasExtras: {
    ativo: boolean;
    calculos: HorasExtrasCalculo[];
    valor?: number;
  };

  // Férias Vencidas
  calcularFeriasVencidas: boolean;
  periodosFeriasVencidas: string;

  // Indenização por Demissão Indevida
  calcularIndenizacaoDemissao: boolean;
  valorIndenizacaoDemissao: string;

  // Vale Transporte Não Pago
  calcularValeTransporte: boolean;
  valorDiarioVT: string;
  diasValeTransporte: string;

  // Vale Alimentação Não Pago
  calcularValeAlimentacao: boolean;
  valorDiarioVA: string;
  diasValeAlimentacao: string;

  // Adicional de Transferência
  calcularAdicionalTransferencia: boolean;
  percentualAdicionalTransferencia: string;

  // Descontos Indevidos
  calcularDescontosIndevidos: boolean;
  valorDescontosIndevidos: string;

  // Diferenças Salariais
  calcularDiferencasSalariais: boolean;
  valorDiferencasSalariais: string;

  // Cálculos Personalizados (Custom)
  calculosCustom: {
    ativo: boolean;
    itens: CustomCalculo[];
  };

  // Seguro Desemprego
  calcularSeguroDesemprego: boolean;
  tipoTrabalhador: string;
  salarioUltimos3Meses: string;
  ultimoSalario: string;
  salarioMes1: string;
  salarioMes2: string;
  mesesTrabalhadosUltimoEmprego: string;
  tempoContribuicaoINSS: string;

  // Salário Família
  calcularSalarioFamilia: boolean;
  quantidadeFilhos: string;

  // Honorários Advocatícios
  calcularHonorariosAdvocaticios: boolean;
  percentualHonorariosAdvocaticios: string;
  valorHonorariosAdvocaticios: string;
  incluirTotalGeralHonorarios: boolean;
}

export interface Verbas {
  feriasVencidas: {
    ativo: boolean;
    periodos: number;
    valor?: number;
  };
  indenizacaoDemissaoIndevida: {
    ativo: boolean;
    valor?: number;
  };
  valeTransporteNaoPago: {
    ativo: boolean;
    valor: number;
    meses: number;
  };
  valeAlimentacaoNaoPago: {
    ativo: boolean;
    valor: number;
    meses: number;
  };
  adicionalTransferencia: {
    ativo: boolean;
    percentual: number;
    meses: number;
  };
  descontosIndevidos: {
    ativo: boolean;
    valor: number;
    descricao: string;
  };
  diferencasSalariais: {
    ativo: boolean;
    valorDiferenca: number;
    meses: number;
  };
}

export interface Multas {
  art467: {
    ativo: boolean;
    valor?: number;
  };
  art477: {
    ativo: boolean;
    valor?: number;
  };
}

export interface SalarioFamilia {
  ativo: boolean;
  quantidadeFilhos: number;
  valorPorFilho?: number;
  valorTotal?: number;
}

export interface SeguroDesemprego {
  ativo: boolean;
  tipoTrabalhador: string;
  salarioConstante: boolean;
  ultimoSalario: number;
  mesesTrabalhados: number;
  valorParcelas?: number[];
}

export interface CustomCalculo {
  id: string;
  descricao: string;
  valor: number;
}

export interface Resultados {
  total: number;
  detalhamento: {
    verbas: {
      salarioProporcional: number;
      decimoTerceiro: number;
      feriasProporcionais: number;
      avisoPrevio: number;
      fgts: number;
      multaFgts: number;
      feriasVencidas: number;
      decimoTerceiroAvisoPrevio: number;
      feriasAvisoPrevio: number;
      indenizacaoDemissaoIndevida: number;
      valeTransporteNaoPago: number;
      valeAlimentacaoNaoPago: number;
      adicionalTransferencia: number;
      descontosIndevidos: number;
      diferencasSalariais: number;
      tercoConstitucional: number;
      total: number;
    };
    adicionais: {
      insalubridade: number;
      periculosidade: number;
      noturno: number;
      horasExtras: number;
    };
    multas: {
      art467: number;
      art477: number;
    };
    salarioFamilia: number;
    seguroDesemprego: number;
    calculosPersonalizados: number;
  };
  dadosContrato: DadosContrato;
}

export interface CalculadoraState {
  dadosContrato: DadosContrato;
  adicionais: Adicionais;
  verbas: Verbas;
  multas: Multas;
  salarioFamilia: SalarioFamilia;
  seguroDesemprego: SeguroDesemprego;
  calculosPersonalizados?: CustomCalculo[];
  resultados?: Resultados;
}
