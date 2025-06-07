
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
