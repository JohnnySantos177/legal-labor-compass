export interface ContractData {
  admissionDate: string;
  terminationDate: string;
  baseSalary: number;
  terminationType: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | '';
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
  motivoDemissao: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | '';
  diasTrabalhados: string;
  mesesTrabalhados: string;
  contratoTempoDeterminado: boolean;
  avisoPrevioCumprido: boolean;
  fgtsDepositado: boolean;
  tipoRescisao: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | '';
}

export interface HoraExtra {
  id: string;
  percentual: number;
  quantidade: number;
  valor?: number;
}

export interface HorasExtrasCalculo extends HoraExtra {}

export interface CustomCalculo {
  id: string;
  nome: string;
  valor: number;
  ativo: boolean;
}

export interface Adicionais {
  insalubridade: {
    ativo: boolean;
    grau: 'minimo' | 'medio' | 'maximo';
    baseCalculo: 'salario_minimo' | 'salario_base';
    periodoEspecifico: boolean;
    dataInicio?: string;
    dataFim?: string;
    valor?: number;
  };
  periculosidade: {
    ativo: boolean;
    percentual: number;
    baseCalculo: 'salario_minimo' | 'salario_base';
    valor?: number;
  };
  noturno: {
    ativo: boolean;
    percentual: number;
    horas: number;
    valor?: number;
  };
  horasExtras: {
    ativo: boolean;
    calculos: HoraExtra[];
    valor?: number;
  };
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

export interface CalculoPersonalizado {
  ativo: boolean;
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
      indenizacaoDemissaoIndevida: number;
      valeTransporteNaoPago: number;
      valeAlimentacaoNaoPago: number;
      adicionalTransferencia: number;
      descontosIndevidos: number;
      diferencasSalariais: number;
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
}

export interface CalculadoraState {
  dadosContrato: DadosContrato;
  adicionais: Adicionais;
  verbas: Verbas;
  multas: Multas;
  salarioFamilia: SalarioFamilia;
  seguroDesemprego: SeguroDesemprego;
  calculosPersonalizados: CalculoPersonalizado[];
  resultados?: Resultados;
}
