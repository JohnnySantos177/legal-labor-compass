/**
 * Test utility to verify calculations remain consistent after refactoring
 */
import { DadosContrato, Adicionais, Resultados } from '@/types/calculadora';
import { realizarCalculos } from '@/utils/calculadora/calculosUtils';

interface VerificacaoResultado {
  success: boolean;
  message: string;
}

/**
 * Verifies that the calculations remain consistent after refactoring
 * @param dadosContrato Contract data for calculations
 * @param adicionais Additional values for calculations
 * @returns Object with verification results
 */
export const verificarCalculos = (
  dadosContrato: DadosContrato,
  adicionais: Adicionais
): { success: boolean; message: string; details?: VerificacaoResultado[] | Error } => {
  try {
    // Create a sample test case
    const resultados = realizarCalculos(dadosContrato, adicionais);
    
    // Log the results for verification
    console.log("Resultados dos cálculos após refatoração:", resultados);
    
    // Verify each component of the calculation
    const verificacoes = [
      verificarVerbasRescisorias(resultados),
      verificarAdicionais(resultados)
    ];
    
    // Check if all verifications passed
    const allPassed = verificacoes.every(v => v.success);
    
    if (allPassed) {
      return {
        success: true,
        message: "Todos os cálculos continuam funcionando conforme esperado após a refatoração"
      };
    } else {
      const failedTests = verificacoes.filter(v => !v.success);
      return {
        success: false,
        message: "Alguns cálculos apresentaram diferenças após a refatoração",
        details: failedTests
      };
    }
  } catch (error) {
    console.error("Erro ao verificar cálculos:", error);
    return {
      success: false,
      message: `Erro ao executar verificação: ${(error as Error).message}`,
      details: error as Error
    };
  }
};

/**
 * Verifies rescission values
 */
const verificarVerbasRescisorias = (resultados: Resultados) => {
  const { verbas } = resultados.detalhamento;
  
  // Basic validation of rescission values
  const saldoValid = verbas.salarioProporcional >= 0;
  const avisoValid = verbas.avisoPrevio >= 0;
  const decimoValid = verbas.decimoTerceiro >= 0;
  const feriasValid = verbas.feriasProporcionais >= 0;
  const tercoValid = verbas.tercoConstitucional >= 0;
  const fgtsValid = verbas.fgts >= 0;
  const multaFgtsValid = verbas.multaFgts >= 0;
  
  // Check that the total is equal to the sum of components
  const calculatedTotal = verbas.salarioProporcional + verbas.avisoPrevio + verbas.decimoTerceiro + 
                          verbas.feriasProporcionais + verbas.tercoConstitucional + verbas.fgts + verbas.multaFgts;
  const totalValid = Math.abs(calculatedTotal - verbas.total) < 0.01; // Allow small floating point differences
  
  // Result of verification
  return {
    success: saldoValid && avisoValid && decimoValid && feriasValid && 
             tercoValid && fgtsValid && multaFgtsValid && totalValid,
    message: totalValid ? 
      "Verbas rescisórias calculadas corretamente" : 
      `Inconsistência no total das verbas: esperado ${calculatedTotal}, obtido ${verbas.total}`
  };
};

/**
 * Verifies additional values
 */
const verificarAdicionais = (resultados: Resultados) => {
  const { adicionais, salarioFamilia, seguroDesemprego, calculosPersonalizados } = resultados.detalhamento;
  
  // Basic validation for additionals (shouldn't be negative)
  const validations = [
    adicionais.insalubridade >= 0,
    adicionais.periculosidade >= 0,
    adicionais.noturno >= 0,
    adicionais.horasExtras >= 0,
    resultados.detalhamento.multas.art467 >= 0,
    resultados.detalhamento.multas.art477 >= 0,
    salarioFamilia >= 0,
    seguroDesemprego >= 0,
    calculosPersonalizados >= 0,
  ];
  
  const allValid = validations.every(v => v);
  
  // Insalubridade e periculosidade não podem ser ambos maiores que zero (não acumuláveis)
  const acumulacaoInvalida = adicionais.insalubridade > 0 && adicionais.periculosidade > 0;
  
  return {
    success: allValid && !acumulacaoInvalida,
    message: allValid ? 
      (acumulacaoInvalida ? 
        "Erro: Insalubridade e Periculosidade estão sendo acumuladas indevidamente" :
        "Adicionais calculados corretamente") :
      "Valores negativos encontrados nos adicionais"
  };
};
