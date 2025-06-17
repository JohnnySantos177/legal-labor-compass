
// Utility functions for handling calculation data

// Import the necessary functions from verbasRescisoriasUtils
import { calcularVerbasRescisorias } from './verbas/calculadoraVerbas';
import { 
  calcularAdicionais,
  calcularSeguroDesempregoHelper,
  calcularSalarioFamiliaHelper,
  calcularHonorariosAdvocaticios
} from './adicionaisUtils';
import { DadosContrato, Adicionais, Resultados } from '@/types/calculadora';

/**
 * Performs all calculations based on contract data and additional values.
 * @param dadosContrato Contract data
 * @param adicionais Additional values to calculate
 * @returns Object with all calculated values
 */
export const realizarCalculos = (dadosContrato: DadosContrato, adicionais: Adicionais): Resultados => {
  const diasTrabalhados = parseInt(dadosContrato.diasTrabalhados) || 0;
  const mesesTrabalhados = parseInt(dadosContrato.mesesTrabalhados) || 0;
  
  console.info("Calculando com:", {
    salarioBase: dadosContrato.salarioBase,
    diasTrabalhados,
    mesesTrabalhados
  });
  
  // Calculate rescission values
  const verbasRescisoriasCalculadas = calcularVerbasRescisorias(dadosContrato);
  
  // Calculate additional values based on the main salary
  const salarioBase = dadosContrato.salarioBase || 0;
  
  // Get all values from verbasRescisorias to pass to calcularAdicionais
  const saldoSalario = verbasRescisoriasCalculadas.salarioProporcional || 0;
  const avisoPrevia = verbasRescisoriasCalculadas.avisoPrevio || 0;
  const decimoTerceiroVerba = verbasRescisoriasCalculadas.decimoTerceiro || 0;
  const feriasVerba = verbasRescisoriasCalculadas.feriasProporcionais || 0;
  const tercoConstitucionalVerba = verbasRescisoriasCalculadas.tercoConstitucional || 0;
  
  // Calculate all additionals using the main function - now passing dadosContrato
  const adicionaisValues = calcularAdicionais(
    salarioBase, 
    adicionais,
    saldoSalario,
    avisoPrevia,
    decimoTerceiroVerba,
    feriasVerba,
    tercoConstitucionalVerba,
    dadosContrato // Pass contract data for period calculations
  );

  const seguroDesempregoValue = calcularSeguroDesempregoHelper(adicionais, salarioBase, dadosContrato.motivoDemissao);
  const salarioFamiliaValue = calcularSalarioFamiliaHelper(adicionais.calcularSalarioFamilia, salarioBase, parseInt(adicionais.quantidadeFilhos) || 0);

  const totalGeralAntesHonorarios = 
    (verbasRescisoriasCalculadas.total || 0) +
    adicionaisValues.adicionalInsalubridade +
    adicionaisValues.adicionalPericulosidade +
    adicionaisValues.adicionalNoturno +
    adicionaisValues.horasExtras +
    adicionaisValues.feriasVencidas +
    adicionaisValues.indenizacaoDemissao +
    adicionaisValues.valeTransporte +
    adicionaisValues.valeAlimentacao +
    adicionaisValues.adicionalTransferencia +
    adicionaisValues.descontosIndevidos +
    adicionaisValues.diferencasSalariais +
    adicionaisValues.customCalculo +
    adicionaisValues.multa467 +
    adicionaisValues.multa477 +
    seguroDesempregoValue +
    salarioFamiliaValue;

  const honorariosAdvocaticiosValue = calcularHonorariosAdvocaticios(
    adicionais.calcularHonorariosAdvocaticios,
    totalGeralAntesHonorarios,
    parseFloat(adicionais.percentualHonorariosAdvocaticios) || 0,
    parseFloat(adicionais.valorHonorariosAdvocaticios) || 0,
    adicionais.incluirTotalGeralHonorarios
  );

  const totalFinal = totalGeralAntesHonorarios + honorariosAdvocaticiosValue;
  
  // Return the final result
  const resultados: Resultados = {
    total: totalFinal,
    detalhamento: {
      verbas: {
        salarioProporcional: verbasRescisoriasCalculadas.salarioProporcional || 0,
        decimoTerceiro: verbasRescisoriasCalculadas.decimoTerceiro || 0,
        feriasProporcionais: verbasRescisoriasCalculadas.feriasProporcionais || 0,
        avisoPrevio: verbasRescisoriasCalculadas.avisoPrevio || 0,
        fgts: verbasRescisoriasCalculadas.fgts || 0,
        multaFgts: verbasRescisoriasCalculadas.multaFgts || 0,
        tercoConstitucional: verbasRescisoriasCalculadas.tercoConstitucional || 0,
        feriasVencidas: adicionaisValues.feriasVencidas || 0,
        indenizacaoDemissaoIndevida: adicionaisValues.indenizacaoDemissao || 0,
        valeTransporteNaoPago: adicionaisValues.valeTransporte || 0,
        valeAlimentacaoNaoPago: adicionaisValues.valeAlimentacao || 0,
        adicionalTransferencia: adicionaisValues.adicionalTransferencia || 0,
        descontosIndevidos: adicionaisValues.descontosIndevidos || 0,
        diferencasSalariais: adicionaisValues.diferencasSalariais || 0,
        total: verbasRescisoriasCalculadas.total || 0,
      },
      adicionais: {
        insalubridade: adicionaisValues.adicionalInsalubridade || 0,
        periculosidade: adicionaisValues.adicionalPericulosidade || 0,
        noturno: adicionaisValues.adicionalNoturno || 0,
        horasExtras: adicionaisValues.horasExtras || 0,
      },
      multas: {
        art467: adicionaisValues.multa467 || 0,
        art477: adicionaisValues.multa477 || 0,
      },
      salarioFamilia: salarioFamiliaValue || 0,
      seguroDesemprego: seguroDesempregoValue || 0,
      calculosPersonalizados: adicionaisValues.customCalculo || 0,
    },
    dadosContrato: dadosContrato,
  };

  // Log for debugging
  console.info("Cálculos realizados:", resultados);
  
  return resultados;
};
