/**
 * Main calculator for rescission values
 */
import { DadosContrato, Resultados } from "@/types/calculadora";
import { calcularSaldoSalario } from "./saldoSalarioUtils";
import { calcularAvisoPrevia } from "./avisoPrevioUtils";
import { calcularDecimoTerceiro } from "./decimoTerceiroUtils";
import { calcularFerias, calcularTercoConstitucional } from "./feriasUtils";
import { calcularFGTS, calcularMultaFGTS } from "./fgtsUtils";
import { calcularIndenizacaoQuebraContrato } from "./indenizacaoQuebraContratoUtils";

/**
 * Calculates all rescission values with separate notice period values
 * @param dadosContrato Contract data
 * @returns Object with all rescission values and total
 */
export const calcularVerbasRescisorias = (dadosContrato: DadosContrato): Resultados['detalhamento']['verbas'] => {
  const salarioBase = parseFloat(dadosContrato.salarioBase.toString()) || 0;
  const diasTrabalhados = parseInt(dadosContrato.diasTrabalhados.toString()) || 0;
  const mesesTrabalhados = parseInt(dadosContrato.mesesTrabalhados.toString()) || 0;
  const avisoPrevioCumprido = dadosContrato.avisoPrevioCumprido || false;
  const fgtsDepositado = dadosContrato.fgtsDepositado || false;
  const contratoTempoDeterminado = dadosContrato.contratoTempoDeterminado || false;
  const mesesRestantesContrato = parseInt(dadosContrato.mesesRestantesContrato?.toString() || '0') || 0;
  const motivoDemissao = dadosContrato.motivoDemissao;

  // Initialize all verbas to 0 with const where possible
  const saldoSalario = calcularSaldoSalario(salarioBase, diasTrabalhados);
  let avisoPrevio = 0;
  let feriasAvisoPrevio = 0;
  let decimoTerceiroAvisoPrevio = 0;
  let decimoTerceiro = 0;
  let feriasProporcionais = 0;
  let tercoConstitucional = 0;
  let fgts = 0;
  let multaFgts = 0;
  let indenizacaoDemissaoIndevida = 0; // Renamed from indenizacaoQuebraContrato
  const valeTransporteNaoPago = 0;
  const valeAlimentacaoNaoPago = 0;
  const adicionalTransferencia = 0;
  const descontosIndevidos = 0;
  const diferencasSalariais = 0;
  let descontoAvisoPrevio = 0;

  console.log(`Dados do contrato:`, {
    salarioBase,
    diasTrabalhados,
    mesesTrabalhados,
    avisoPrevioCumprido,
    fgtsDepositado,
    contratoTempoDeterminado,
    mesesRestantesContrato,
    motivoDemissao
  });

  // Calculation for indenizacaoQuebraContrato is general for fixed-term contracts, regardless of termination reason.
  indenizacaoDemissaoIndevida = contratoTempoDeterminado 
    ? calcularIndenizacaoQuebraContrato(salarioBase, mesesRestantesContrato)
    : 0;

  switch (motivoDemissao) {
    case 'sem_justa_causa':
    case 'rescisao_indireta':
      avisoPrevio = calcularAvisoPrevia(
        salarioBase,
        motivoDemissao,
        avisoPrevioCumprido,
        mesesTrabalhados
      );

      if (!avisoPrevioCumprido) {
        // Férias proporcionais do aviso prévio: (Salário/12) + (Salário/12)/3 = (Salário/12) × (4/3)
        feriasAvisoPrevio = (salarioBase / 12) + ((salarioBase / 12) / 3);
        // 13º proporcional ao aviso prévio (1/12 do salário)
        decimoTerceiroAvisoPrevio = salarioBase / 12;
      }
      
      // 13º salário proporcional apenas sobre o período trabalhado (sem incluir aviso prévio)
      decimoTerceiro = calcularDecimoTerceiro(
        salarioBase,
        dadosContrato.dataAdmissao,
        dadosContrato.dataDemissao,
        motivoDemissao
      );
      
      // Férias proporcionais apenas sobre o período trabalhado (sem incluir aviso prévio)
      feriasProporcionais = calcularFerias(
        salarioBase,
        dadosContrato.dataAdmissao,
        dadosContrato.dataDemissao,
        motivoDemissao
      );
      tercoConstitucional = calcularTercoConstitucional(feriasProporcionais);

      if (fgtsDepositado) {
        // If FGTS was deposited, don't include FGTS but include the 40% fine
        const fgtsParaMulta = calcularFGTS(salarioBase, mesesTrabalhados, diasTrabalhados);
        multaFgts = calcularMultaFGTS(fgtsParaMulta, motivoDemissao);
      } else {
        // If FGTS was not deposited, include FGTS and the 40% fine
        // Novo cálculo: incluir mês projetado do aviso prévio indenizado
        const avisoPrevioIndenizado = !avisoPrevioCumprido;
        let diasAvisoPrevioProjetado = 0;
        if (avisoPrevioIndenizado) {
          // 30 dias + 3 dias por ano completo trabalhado, até 90 dias
          const diasAdicionais = Math.min(Math.floor(mesesTrabalhados / 12) * 3, 60);
          diasAvisoPrevioProjetado = 30 + diasAdicionais;
        }
        fgts = calcularFGTS(
          salarioBase,
          mesesTrabalhados,
          diasTrabalhados,
          avisoPrevioIndenizado,
          diasAvisoPrevioProjetado
        );
        multaFgts = calcularMultaFGTS(fgts, motivoDemissao);
      }
      break;

    case 'pedido_demissao':
      decimoTerceiro = calcularDecimoTerceiro(
        salarioBase,
        dadosContrato.dataAdmissao,
        dadosContrato.dataDemissao,
        motivoDemissao
      );
      feriasProporcionais = calcularFerias(
        salarioBase,
        dadosContrato.dataAdmissao,
        dadosContrato.dataDemissao,
        motivoDemissao
      );
      tercoConstitucional = calcularTercoConstitucional(feriasProporcionais);
      fgts = calcularFGTS(salarioBase, mesesTrabalhados, diasTrabalhados);
      
      if (!avisoPrevioCumprido && !contratoTempoDeterminado) {
        descontoAvisoPrevio = calcularAvisoPrevia(
          salarioBase,
          motivoDemissao,
          avisoPrevioCumprido,
          mesesTrabalhados
        );
      }
      break;

    case 'justa_causa':
      fgts = calcularFGTS(salarioBase, mesesTrabalhados, diasTrabalhados); // FGTS sobre verbas for justa causa
      break;

    case 'acordo_mutuo':
      decimoTerceiro = calcularDecimoTerceiro(
        salarioBase,
        dadosContrato.dataAdmissao,
        dadosContrato.dataDemissao,
        motivoDemissao
      );
      feriasProporcionais = calcularFerias(
        salarioBase,
        dadosContrato.dataAdmissao,
        dadosContrato.dataDemissao,
        motivoDemissao
      );
      tercoConstitucional = calcularTercoConstitucional(feriasProporcionais);
      fgts = calcularFGTS(salarioBase, mesesTrabalhados, diasTrabalhados);
      multaFgts = calcularMultaFGTS(fgts, motivoDemissao);
      break;

    default:
      // Default case or unspecified termination reason
      break;
  }

  // Calculate total
  const total = 
    saldoSalario +
    avisoPrevio +
    feriasAvisoPrevio +
    decimoTerceiroAvisoPrevio +
    decimoTerceiro +
    feriasProporcionais +
    tercoConstitucional +
    fgts +
    multaFgts +
    indenizacaoDemissaoIndevida -
    descontoAvisoPrevio; // Subtrair o desconto aqui

  console.log(`Valores calculados:`, {
    saldoSalario,
    avisoPrevio,
    descontoAvisoPrevio,
    feriasAvisoPrevio,
    decimoTerceiroAvisoPrevio,
    decimoTerceiro,
    feriasProporcionais,
    tercoConstitucional,
    fgts,
    multaFgts,
    indenizacaoDemissaoIndevida,
    total,
    fgtsDepositado,
    contratoTempoDeterminado
  });

  return {
    salarioProporcional: saldoSalario,
    decimoTerceiro,
    feriasProporcionais,
    avisoPrevio,
    fgts,
    multaFgts,
    feriasVencidas: feriasAvisoPrevio, // Mapped to férias vencidas (from Aviso Prévio Indenizado)
    decimoTerceiroAvisoPrevio, // 13º proporcional do aviso prévio indenizado
    feriasAvisoPrevio, // Férias proporcionais do aviso prévio indenizado
    indenizacaoDemissaoIndevida,
    valeTransporteNaoPago,
    valeAlimentacaoNaoPago,
    adicionalTransferencia,
    descontosIndevidos,
    diferencasSalariais,
    tercoConstitucional,
    total
  };
};
