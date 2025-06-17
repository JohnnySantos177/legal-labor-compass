import { DadosContrato, Adicionais } from '@/types/calculadora';

/**
 * Valida os dados do contrato e adicionais, retornando um array de erros.
 * @param dadosContrato Dados do contrato a serem validados.
 * @param adicionais Adicionais a serem validados.
 * @returns Um array de strings contendo os erros encontrados. Se não houver erros, retorna um array vazio.
 */
export const validarDados = (dadosContrato: DadosContrato, adicionais: Adicionais): string[] => {
  const errors: string[] = [];

  // Validações dos Dados do Contrato
  if (!dadosContrato.salarioBase || dadosContrato.salarioBase <= 0) {
    errors.push('Salário base deve ser um número válido e maior que zero');
  }

  if (!dadosContrato.dataAdmissao) {
    errors.push('Data de admissão é obrigatória');
  }

  if (!dadosContrato.dataDemissao) {
    errors.push('Data de demissão é obrigatória');
  }

  // Validações dos Adicionais (exemplo)
  if (adicionais.calcularDescontosIndevidos) {
    const valor = parseFloat(adicionais.valorDescontosIndevidos.toString());
    if (isNaN(valor) || valor < 0) {
      errors.push('Valor dos descontos indevidos deve ser um número válido e positivo');
    }
  }

  return errors;
};
