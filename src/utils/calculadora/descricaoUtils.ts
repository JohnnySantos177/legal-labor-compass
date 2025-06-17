import { Adicionais, CustomCalculo } from "@/types/calculadora";

/**
 * Get description for custom calculations
 */
export const getCustomCalculoDescription = (adicionais: Adicionais): string => {
  if (adicionais.calculosCustom && adicionais.calculosCustom.length > 0) {
    // If multiple custom calculations, join their names
    if (adicionais.calculosCustom.length > 1) {
      return "Cálculos Personalizados";
    } else {
      // Return the description of the single custom calculation
      return adicionais.calculosCustom[0].descricao || "Cálculo Personalizado";
    }
  }
  // Fallback to old system or if no description is available
  return adicionais.descricaoCustom || "Cálculo Personalizado";
};
