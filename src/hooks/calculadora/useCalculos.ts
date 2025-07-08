
import { CalculadoraState, Resultados } from '@/types/calculadora';
import { realizarCalculos } from '@/utils/calculadora/calculosUtils';

export function useCalculos() {
  const calcular = (state: CalculadoraState): Resultados => {
    console.log('Iniciando cálculos com estado:', state);
    
    try {
      // Usar a função centralizada para cálculos
      const resultados = realizarCalculos(state.dadosContrato, state.adicionais);
      
      console.log('Resultados calculados com sucesso:', resultados);
      return resultados;
    } catch (error) {
      console.error('Erro ao calcular resultados:', error);
      throw error;
    }
  };

  return {
    calcular
  };
}
