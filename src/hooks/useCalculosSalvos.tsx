
import { useState } from 'react';
import { CalculationResult } from '@/types/calculadora';
import { toast } from 'sonner';

export interface SavedCalculation extends CalculationResult {
  name: string;
  editableName?: boolean;
}

export const useCalculosSalvos = () => {
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);

  const saveCalculation = (result: CalculationResult, name?: string) => {
    if (!result) {
      toast.error('Não é possível salvar um cálculo vazio');
      return;
    }

    const calculationName = name || `Cálculo ${new Date().toLocaleDateString('pt-BR')}`;
    
    const savedCalculation: SavedCalculation = {
      ...result,
      name: calculationName,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setSavedCalculations(prev => [savedCalculation, ...prev]);
    toast.success('Cálculo salvo com sucesso!');
  };

  const updateCalculationName = (id: string, newName: string) => {
    setSavedCalculations(prev => 
      prev.map(calc => 
        calc.id === id ? { ...calc, name: newName, editableName: false } : calc
      )
    );
    toast.success('Nome do cálculo atualizado!');
  };

  const toggleEditName = (id: string) => {
    setSavedCalculations(prev => 
      prev.map(calc => 
        calc.id === id ? { ...calc, editableName: !calc.editableName } : calc
      )
    );
  };

  const deleteCalculation = (id: string) => {
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id));
    toast.success('Cálculo removido!');
  };

  return {
    savedCalculations,
    saveCalculation,
    updateCalculationName,
    toggleEditName,
    deleteCalculation
  };
};
