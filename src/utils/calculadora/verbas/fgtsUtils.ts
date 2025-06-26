
/**
 * Utilities for calculating FGTS values
 */
import { DadosContrato } from "@/types/calculadora";
import { ajustarMesesPorDias } from "../verbasRescisoriasUtils";

/**
 * Calculates the FGTS value
 * @param salarioBase Base salary
 * @param mesesTrabalhados Months worked
 * @param diasNoUltimoMes Days worked in the last month (to apply the 15-day rule)
 * @param avisoPrevioIndenizado Indicates if the notice period is indenized
 * @param diasAvisoPrevioProjetado Days of the projected notice period
 * @returns FGTS value
 */
export const calcularFGTS = (
  salarioBase: number,
  mesesTrabalhados: number,
  diasNoUltimoMes: number = 0,
  avisoPrevioIndenizado: boolean = false,
  diasAvisoPrevioProjetado: number = 0
): number => {
  // Meses completos trabalhados
  const mesesCompletos = Math.floor(mesesTrabalhados);
  const fgtsMesesCompletos = salarioBase * 0.08 * mesesCompletos;
  
  // FGTS proporcional ao último mês, se houver dias
  const fgtsUltimoMesProporcional = diasNoUltimoMes > 0 ? (salarioBase / 30) * diasNoUltimoMes * 0.08 : 0;
  
  // FGTS sobre o mês projetado do aviso prévio indenizado
  let fgtsAvisoPrevio = 0;
  if (avisoPrevioIndenizado) {
    if (diasAvisoPrevioProjetado > 0) {
      fgtsAvisoPrevio = (salarioBase / 30) * diasAvisoPrevioProjetado * 0.08;
    } else {
      fgtsAvisoPrevio = salarioBase * 0.08; // padrão 1 mês
    }
  }
  
  const totalFGTS = fgtsMesesCompletos + fgtsUltimoMesProporcional + fgtsAvisoPrevio;
  
  console.log('Cálculo FGTS detalhado:', {
    salarioBase,
    mesesTrabalhados,
    mesesCompletos,
    diasNoUltimoMes,
    avisoPrevioIndenizado,
    diasAvisoPrevioProjetado,
    fgtsMesesCompletos,
    fgtsUltimoMesProporcional,
    fgtsAvisoPrevio,
    totalFGTS
  });
  
  return totalFGTS;
};

/**
 * Calculates the FGTS fine
 * @param valorFGTS FGTS value
 * @param tipoRescisao Contract termination type
 * @returns FGTS fine value
 */
export const calcularMultaFGTS = (valorFGTS: number, tipoRescisao: string): number => {
  let multa = 0;
  
  if (tipoRescisao === 'sem_justa_causa' || tipoRescisao === 'rescisao_indireta') {
    multa = valorFGTS * 0.4; // 40%
  } else if (tipoRescisao === 'acordo_mutuo') {
    multa = valorFGTS * 0.2; // 20%
  }
  
  console.log('Cálculo Multa FGTS:', {
    valorFGTS,
    tipoRescisao,
    multa
  });
  
  return multa;
};
