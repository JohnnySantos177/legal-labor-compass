/**
 * Utilities for calculating 13th salary
 */
import { DadosContrato } from "@/types/calculadora";

/**
 * Calculates the thirteenth salary proportional value based on months worked IN THE YEAR OF TERMINATION
 * Formula: (Salário Base / 12) × Avos de Direito (Frações >= 15 dias dentro do ano civil)
 * * @param salarioBase Base salary
 * @param dataAdmissao Admission date (YYYY-MM-DD)
 * @param dataDemissao Termination date (YYYY-MM-DD)
 * @param tipoRescisao Contract termination type
 * @returns Thirteenth salary proportional value
 */
export const calcularDecimoTerceiro = (
  salarioBase: number, 
  dataAdmissao: string, 
  dataDemissao: string, 
  tipoRescisao: string
): number => {
  // Não tem direito em caso de justa causa
  if (tipoRescisao === 'justa_causa' || !dataAdmissao || !dataDemissao) {
    return 0;
  }
  
  // Tratamento de string para evitar mutação indesejada por fusos horários locais
  const [aYear, aMonth, aDay] = dataAdmissao.split('-').map(Number);
  const [dYear, dMonth, dDay] = dataDemissao.split('-').map(Number);
  
  // O direito ao 13º proporcional zera em 1º de janeiro do ano da demissão.
  // Se ele foi admitido em anos anteriores, começamos a analisar a partir de Janeiro do ano da demissão.
  // Se foi admitido no próprio ano da demissão, começamos no mês da admissão.
  const anoAnalise = dYear;
  const mesInicio = aYear < dYear ? 1 : aMonth;
  const mesFim = dMonth;
  
  let avosDireito = 0;
  
  // Iterar mês a mês dentro do ano corrente da demissão
  for (let mes = mesInicio; mes <= mesFim; mes++) {
    let diasTrabalhadosNoMes = 30; // Padrão comercial padrão

    // Caso 1: Primeiro mês de trabalho do contrato (e a admissão ocorreu neste mesmo ano)
    if (mes === mesInicio && aYear === dYear) {
      // Conta os dias restantes do mês incluindo o dia da admissão
      diasTrabalhadosNoMes = 30 - aDay + 1;
    }

    // Caso 2: Mês da demissão (Último mês da análise)
    if (mes === mesFim) {
      // Os dias computados são limitados ao exato dia do afastamento
      diasTrabalhadosNoMes = dDay;

      // Subcaso: Se a admissão e a demissão ocorreram exatamente dentro do mesmíssimo mês e ano
      if (mesInicio === mesFim && aYear === dYear) {
        diasTrabalhadosNoMes = dDay - aDay + 1;
      }
    }

    // Regra do Art. 1º, § 2º da Lei 4.090/1962: fração igual ou superior a 15 dias garante 1 avo (1/12)
    if (diasTrabalhadosNoMes >= 15) {
      avosDireito++;
    }

    console.log(`[IusCalc Debug] Mês ${mes}/${anoAnalise}: ${diasTrabalhadosNoMes} dias apurados. ${diasTrabalhadosNoMes >= 15 ? 'Ganhou avo' : 'Perdeu avo'}`);
  }
  
  // Aplicar a fórmula: (Salário Base / 12) × Avos de Direito
  const valorPorAvo = salarioBase / 12;
  const decimoTerceiroProporcional = valorPorAvo * avosDireito;
  
  console.log(`[IusCalc Resultado] Ano Rescisão: ${anoAnalise} | Avos Totais: ${avosDireito}/12 | Valor Final: R$ ${decimoTerceiroProporcional.toFixed(2)}`);
  
  return Number(decimoTerceiroProporcional.toFixed(2));
};