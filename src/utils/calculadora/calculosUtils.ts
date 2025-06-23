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

  // Ensure adicionaisValues is always an object
  const adicionaisValuesObj = typeof adicionaisValues === 'number' ? {
    adicionalInsalubridade: 0,
    adicionalPericulosidade: 0,
    multa467: 0,
    multa477: 0,
    adicionalNoturno: 0,
    horasExtras: 0,
    feriasVencidas: 0,
    indenizacaoDemissao: 0,
    valeTransporte: 0,
    valeAlimentacao: 0,
    adicionalTransferencia: 0,
    descontosIndevidos: 0,
    diferencasSalariais: 0,
    customCalculo: adicionaisValues, // Use the number value here
    seguroDesemprego: 0,
    salarioFamilia: 0,
    honorariosAdvocaticios: 0,
  } : adicionaisValues;

  const seguroDesempregoValue = calcularSeguroDesempregoHelper(adicionais, salarioBase, dadosContrato.motivoDemissao);
  const salarioFamiliaValue = calcularSalarioFamiliaHelper(adicionais.calcularSalarioFamilia, salarioBase, parseInt(adicionais.quantidadeFilhos) || 0);

  const totalGeralAntesHonorarios = 
    (verbasRescisoriasCalculadas.total || 0) +
    adicionaisValuesObj.adicionalInsalubridade +
    adicionaisValuesObj.adicionalPericulosidade +
    adicionaisValuesObj.adicionalNoturno +
    adicionaisValuesObj.horasExtras +
    adicionaisValuesObj.feriasVencidas +
    adicionaisValuesObj.indenizacaoDemissao +
    adicionaisValuesObj.valeTransporte +
    adicionaisValuesObj.valeAlimentacao +
    adicionaisValuesObj.adicionalTransferencia +
    adicionaisValuesObj.descontosIndevidos +
    adicionaisValuesObj.diferencasSalariais +
    adicionaisValuesObj.customCalculo +
    adicionaisValuesObj.multa467 +
    adicionaisValuesObj.multa477 +
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
        decimoTerceiroAvisoPrevio: verbasRescisoriasCalculadas.decimoTerceiroAvisoPrevio || 0,
        feriasAvisoPrevio: verbasRescisoriasCalculadas.feriasAvisoPrevio || 0,
        feriasVencidas: adicionaisValuesObj.feriasVencidas || 0,
        indenizacaoDemissaoIndevida: adicionaisValuesObj.indenizacaoDemissao || 0,
        valeTransporteNaoPago: adicionaisValuesObj.valeTransporte || 0,
        valeAlimentacaoNaoPago: adicionaisValuesObj.valeAlimentacao || 0,
        adicionalTransferencia: adicionaisValuesObj.adicionalTransferencia || 0,
        descontosIndevidos: adicionaisValuesObj.descontosIndevidos || 0,
        diferencasSalariais: adicionaisValuesObj.diferencasSalariais || 0,
        total: verbasRescisoriasCalculadas.total || 0,
      },
      adicionais: {
        insalubridade: adicionaisValuesObj.adicionalInsalubridade || 0,
        periculosidade: adicionaisValuesObj.adicionalPericulosidade || 0,
        noturno: adicionaisValuesObj.adicionalNoturno || 0,
        horasExtras: adicionaisValuesObj.horasExtras || 0,
      },
      multas: {
        art467: adicionaisValuesObj.multa467 || 0,
        art477: adicionaisValuesObj.multa477 || 0,
      },
      salarioFamilia: salarioFamiliaValue || 0,
      seguroDesemprego: seguroDesempregoValue || 0,
      calculosPersonalizados: adicionaisValuesObj.customCalculo || 0,
    },
    dadosContrato: dadosContrato,
  };

  // Log for debugging
  console.info("Cálculos realizados:", resultados);
  
  return resultados;
};
