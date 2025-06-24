
import { DadosContrato, Adicionais, Resultados } from '@/types/calculadora';

/**
 * Gera uma descrição detalhada dos cálculos com base nos dados do contrato e adicionais.
 * @param dadosContrato Dados do contrato de trabalho.
 * @param adicionais Adicionais e configurações para os cálculos.
 * @returns Uma string formatada com a descrição dos cálculos.
 */
export const gerarDescricaoCalculos = (dadosContrato: DadosContrato, adicionais: Adicionais): string => {
  const descricoes: string[] = [];

  if (adicionais.calcularInsalubridade) {
    descricoes.push('Insalubridade');
  }

  if (adicionais.calcularPericulosidade) {
    descricoes.push('Periculosidade');
  }

  if (adicionais.calcularAdicionalNoturno) {
    descricoes.push('Adicional Noturno');
  }

  if (adicionais.calcularHorasExtras) {
    descricoes.push('Horas Extras');
  }

  if (adicionais.calcularFeriasVencidas) {
    descricoes.push('Férias Vencidas');
  }

  if (adicionais.calcularIndenizacaoDemissao) {
    descricoes.push('Indenização por Demissão Indevida');
  }

  if (adicionais.calcularValeTransporte) {
    descricoes.push('Vale Transporte Não Pago');
  }

  if (adicionais.calcularValeAlimentacao) {
    descricoes.push('Vale Alimentação Não Pago');
  }

  if (adicionais.calcularAdicionalTransferencia) {
    descricoes.push('Adicional de Transferência');
  }

  if (adicionais.calcularDescontosIndevidos) {
    descricoes.push('Descontos Indevidos');
  }

  if (adicionais.calcularDiferencasSalariais) {
    descricoes.push('Diferenças Salariais');
  }
  
  if (adicionais.calculosCustom.ativo && adicionais.calculosCustom.itens.length > 0) {
    descricoes.push('Cálculos Personalizados');
    if (adicionais.calculosCustom.itens.length > 1) {
      descricoes.push(`(${adicionais.calculosCustom.itens.length} itens)`);
    }
  }

  if (adicionais.calcularSeguroDesemprego) {
    descricoes.push('Seguro Desemprego');
  }

  if (adicionais.calcularSalarioFamilia) {
    descricoes.push('Salário Família');
  }

  if (adicionais.calcularHonorariosAdvocaticios) {
    descricoes.push('Honorários Advocatícios');
  }

  return descricoes.join(', ');
};

/**
 * Gets a description for custom calculations based on the results
 */
export const getCustomCalculoDescription = (calculos: Resultados): string => {
  // If there are custom calculations, return a generic description
  if (calculos.detalhamento.calculosPersonalizados > 0) {
    return 'Cálculo Personalizado';
  }
  return 'Cálculos Personalizados';
};
