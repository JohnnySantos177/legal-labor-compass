
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
  console.log('=== INICIANDO CÁLCULOS ===');
  console.log('Dados do contrato:', dadosContrato);
  console.log('Adicionais:', adicionais);
  
  const diasTrabalhados = parseInt(dadosContrato.diasTrabalhados) || 0;
  const mesesTrabalhados = parseInt(dadosContrato.mesesTrabalhados) || 0;
  const salarioBase = Number(dadosContrato.salarioBase) || 0;
  
  console.log('Valores processados:', {
    salarioBase,
    diasTrabalhados,
    mesesTrabalhados,
    motivoDemissao: dadosContrato.motivoDemissao
  });
  
  // Calculate rescission values
  console.log('Calculando verbas rescisórias...');
  const verbasRescisoriasCalculadas = calcularVerbasRescisorias(dadosContrato);
  console.log('Verbas rescisórias calculadas:', verbasRescisoriasCalculadas);
  
  // Get all values from verbasRescisorias to pass to calcularAdicionais
  const saldoSalario = verbasRescisoriasCalculadas.salarioProporcional || 0;
  const avisoPrevia = verbasRescisoriasCalculadas.avisoPrevio || 0;
  const decimoTerceiroVerba = verbasRescisoriasCalculadas.decimoTerceiro || 0;
  const feriasVerba = verbasRescisoriasCalculadas.feriasProporcionais || 0;
  const tercoConstitucionalVerba = verbasRescisoriasCalculadas.tercoConstitucional || 0;
  
  // Calculate all additionals using the main function
  console.log('Calculando adicionais...');
  const adicionaisValues = calcularAdicionais(
    salarioBase, 
    adicionais,
    saldoSalario,
    avisoPrevia,
    decimoTerceiroVerba,
    feriasVerba,
    tercoConstitucionalVerba,
    dadosContrato
  );
  console.log('Adicionais calculados:', adicionaisValues);

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
    customCalculo: adicionaisValues,
    seguroDesemprego: 0,
    salarioFamilia: 0,
    honorariosAdvocaticios: 0,
  } : adicionaisValues;

  // Calculate unemployment insurance
  console.log('Calculando seguro-desemprego...');
  const seguroDesempregoValue = calcularSeguroDesempregoHelper(adicionais, salarioBase, dadosContrato.motivoDemissao);
  console.log('Seguro-desemprego:', seguroDesempregoValue);

  // Calculate family salary
  console.log('Calculando salário-família...');
  const salarioFamiliaValue = calcularSalarioFamiliaHelper(adicionais.calcularSalarioFamilia, salarioBase, parseInt(adicionais.quantidadeFilhos) || 0);
  console.log('Salário-família:', salarioFamiliaValue);

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

  console.log('Total geral antes dos honorários:', totalGeralAntesHonorarios);

  const honorariosAdvocaticiosValue = calcularHonorariosAdvocaticios(
    adicionais.calcularHonorariosAdvocaticios,
    totalGeralAntesHonorarios,
    parseFloat(adicionais.percentualHonorariosAdvocaticios) || 0,
    parseFloat(adicionais.valorHonorariosAdvocaticios) || 0,
    adicionais.incluirTotalGeralHonorarios
  );

  console.log('Honorários advocatícios:', honorariosAdvocaticiosValue);

  const totalFinal = totalGeralAntesHonorarios + honorariosAdvocaticiosValue;
  
  console.log('TOTAL FINAL:', totalFinal);
  
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
        indenizacaoDemissaoIndevida: verbasRescisoriasCalculadas.indenizacaoDemissaoIndevida || 0,
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

  console.log('=== RESULTADO FINAL DOS CÁLCULOS ===');
  console.log(resultados);
  
  return resultados;
};
