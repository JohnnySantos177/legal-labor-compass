import { CalculadoraState, Resultados } from '@/types/calculadora';
import { realizarCalculos } from '@/utils/calculadora/calculosUtils';

export function useCalculos() {
  const calcular = (state: CalculadoraState): Resultados => {
    console.log('Iniciando cálculos com estado:', state);
    
    // Usar a função centralizada para cálculos
    const resultados = realizarCalculos(state.dadosContrato, state.adicionais);
    
    console.log('Resultados finais:', resultados);
    return resultados;
  };

  return {
    calcular
  };
} 
