import { Adicionais } from '@/types/calculadora';

/**
 * Calcula o valor total dos descontos indevidos.
 * @param adicionais Objeto contendo as informações sobre os adicionais.
 * @returns O valor total dos descontos indevidos, ou 0 se não houver descontos.
 */
export const calcularDescontosIndevidos = (adicionais: Adicionais): number => {
  if (adicionais.calcularDescontosIndevidos) {
    return parseFloat(adicionais.valorDescontosIndevidos.toString()) || 0;
  }

  return 0;
};
