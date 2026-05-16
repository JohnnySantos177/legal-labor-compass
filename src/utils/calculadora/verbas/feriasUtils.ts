/**
 * Utilities for calculating vacation values
 */
import { DadosContrato } from "@/types/calculadora";

/**
 * Calculates the proportional vacation value based on the last incomplete aquisitive period
 * Formula: (Salário Base / 12) × Avos Proporcionais (Frações >= 15 dias no último ciclo)
 * * @param salarioBase Base salary
 * @param dataAdmissao Admission date (YYYY-MM-DD)
 * @param dataDemissao Termination date (YYYY-MM-DD)
 * @param tipoRescisao Contract termination type
 * @returns Vacation proportional value
 */
export const calcularFerias = (
  salarioBase: number, 
  dataAdmissao: string, 
  dataDemissao: string, 
  tipoRescisao: string
): number => {
  // Não tem direito a férias proporcionais em caso de justa causa (Art. 146, parágrafo único da CLT)
  if (tipoRescisao === 'justa_causa' || !dataAdmissao || !dataDemissao) {
    return 0;
  }
  
  // Tratamento de string para evitar mutação indesejada por fusos horários locais
  const [aYear, aMonth, aDay] = dataAdmissao.split('-').map(Number);
  const [dYear, dMonth, dDay] = dataDemissao.split('-').map(Number);
  
  const admissao = new Date(aYear, aMonth - 1, aDay);
  const demissao = new Date(dYear, dMonth - 1, dDay);
  
  if (demissao < admissao) return 0;

  // 1. Descobrir o início do ÚLTIMO período aquisitivo
  // Se ele trabalhou 2 anos e 3 meses, os 2 anos viraram férias vencidas/gozadas. Queremos só os 3 meses residuais.
  let anoInicioUltimoPeriodo = aYear;
  let dataInicioCiclo = new Date(anoInicioUltimoPeriodo, aMonth - 1, aDay);
  
  // Avança de ano em ano até achar o período aquisitivo atual (o que foi interrompido pela demissão)
  while (true) {
    let proximoAnoCiclo = new Date(anoInicioUltimoPeriodo + 1, aMonth - 1, aDay);
    if (proximoAnoCiclo <= demissao) {
      anoInicioUltimoPeriodo++;
    } else {
      break;
    }
  }
  
  // O último ciclo começou aqui:
  const inicioPeriodoAtual = new Date(anoInicioUltimoPeriodo, aMonth - 1, aDay);
  
  let avosProporcionais = 0;
  let dataApuracao = new Date(inicioPeriodoAtual);
  
  // 2. Caminhar de mês em mês a partir do aniversário do contrato até a demissão
  while (true) {
    let proximoMesApuracao = new Date(dataApuracao.getFullYear(), dataApuracao.getMonth() + 1, dataApuracao.getDate());
    
    // Se o próximo mês do ciclo ultrapassar a demissão, calculamos a fração do mês que quebrou
    if (proximoMesApuracao > demissao) {
      // Diferença de dias entre a última data certa do ciclo e a data de demissão
      const diffTempo = demissao.getTime() - dataApuracao.getTime();
      const diasResiduos = Math.floor(diffTempo / (1000 * 60 * 60 * 24)) + 1; // Inclui o dia da demissão
      
      // Regra dos 15 dias da CLT para o mês quebrado
      if (diasResiduos >= 15) {
        avosProporcionais++;
      }
      break;
    }
    
    // Se completou um mês cheio dentro do ciclo, ganha 1 avo automaticamente
    avosProporcionais++;
    dataApuracao = proximoMesApuracao;
  }
  
  // O limite máximo de férias proporcionais é sempre 11 avos (pois 12 avos vira período vencido)
  if (avosProporcionais >= 12) {
    avosProporcionais = 11;
  }

  const valorPorAvo = salarioBase / 12;
  const resultadoFerias = valorPorAvo * avosProporcionais;
  
  console.log(`[IusCalc Férias] Início Último Período: ${inicioPeriodoAtual.toLocaleDateString()} | Avos: ${avosProporcionais}/12 | Valor: R$ ${resultadoFerias.toFixed(2)}`);

  return Number(resultadoFerias.toFixed(2));
};

/**
 * Calculates expired vacation value - Moved to adicionaisUtils.ts
 * This function remains here for backward compatibility but doesn't calculate anymore
 */
export const calcularFeriasVencidas = (salarioBase: number, feriasVencidas: boolean): number => {
  return 0;
};

/**
 * Calculates the constitutional third of vacation
 * @param valorFerias Vacation value
 * @returns Constitutional third
 */
export const calcularTercoConstitucional = (valorFerias: number): number => {
  return Number((valorFerias / 3).toFixed(2));
};