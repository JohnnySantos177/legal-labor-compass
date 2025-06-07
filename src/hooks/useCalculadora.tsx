
import { useState, useCallback } from 'react';
import { ContractData, Addition, CalculationResult } from '@/types/calculadora';
import { toast } from 'sonner';

const initialContractData: ContractData = {
  admissionDate: '',
  terminationDate: '',
  baseSalary: 0,
  terminationType: 'dismissal',
  daysWorked: 0,
  monthsWorked: 0,
  noticePeriodFulfilled: false,
  fgtsDeposited: false,
  fixedTermContract: false
};

export const useCalculadora = () => {
  const [contractData, setContractData] = useState<ContractData>(initialContractData);
  const [additions, setAdditions] = useState<Addition[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const updateContractData = useCallback((field: keyof ContractData, value: any) => {
    setContractData(prev => ({ ...prev, [field]: value }));
  }, []);

  const addAddition = useCallback((addition: Addition) => {
    setAdditions(prev => [...prev, addition]);
  }, []);

  const removeAddition = useCallback((id: string) => {
    setAdditions(prev => prev.filter(addition => addition.id !== id));
  }, []);

  const toggleAddition = useCallback((id: string) => {
    setAdditions(prev => prev.map(addition => 
      addition.id === id ? { ...addition, enabled: !addition.enabled } : addition
    ));
  }, []);

  const calculate = useCallback(async () => {
    setLoading(true);
    
    try {
      // Simulate calculation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Basic calculation logic
      let totalValue = 0;
      const breakdown: { [key: string]: number } = {};
      
      // Base calculations
      const baseSalaryValue = contractData.baseSalary * contractData.monthsWorked;
      breakdown['Salário Base'] = baseSalaryValue;
      totalValue += baseSalaryValue;
      
      // Add enabled additions
      additions.filter(addition => addition.enabled).forEach(addition => {
        let additionValue = 0;
        
        if (addition.type === 'percentage') {
          additionValue = baseSalaryValue * (addition.value / 100);
        } else if (addition.type === 'fixed') {
          additionValue = addition.value;
        }
        
        breakdown[addition.name] = additionValue;
        totalValue += additionValue;
      });
      
      const calculationResult: CalculationResult = {
        id: Date.now().toString(),
        totalValue,
        breakdown,
        contractData,
        additions,
        createdAt: new Date().toISOString(),
        userId: '1' // Will be replaced with actual user ID
      };
      
      setResult(calculationResult);
      toast.success('Cálculo realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao realizar cálculo');
    } finally {
      setLoading(false);
    }
  }, [contractData, additions]);

  const reset = useCallback(() => {
    setContractData(initialContractData);
    setAdditions([]);
    setResult(null);
  }, []);

  return {
    contractData,
    additions,
    result,
    loading,
    updateContractData,
    addAddition,
    removeAddition,
    toggleAddition,
    calculate,
    reset
  };
};
