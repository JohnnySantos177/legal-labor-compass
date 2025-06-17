import { toast } from "sonner";
import { Resultados } from "@/types/calculadora";

// Enhanced function to share via WhatsApp with complete calculation details
export const shareViaWhatsApp = (text: string) => {
  const encodedText = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${encodedText}`);
};

// Function to share via Email
export const shareViaEmail = (subject: string, body: string) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  window.open(`mailto:?subject=${encodedSubject}&body=${encodedBody}`);
};

// Generate calculation text for sharing
export const generateCalculationText = (resultados: Resultados, metadata?: { dataCalculo: string; nomeEscritorio: string; nomeCalculo?: string }) => {
  // Assume 'resultados' is of type 'ResultadosCalculo' or compatible structure
  // that has 'detalhamento' and 'total' properties.
  if (!resultados || !resultados.detalhamento) {
    return "Nenhum cálculo disponível.";
  }

  const detalhamento = resultados.detalhamento;

  // Format values as currency
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // Start building the text
  let text = "DEMONSTRATIVO DE CÁLCULOS TRABALHISTAS\n";

  if (metadata) {
    if (metadata.nomeCalculo) {
      text += `NOME DO CÁLCULO: *${metadata.nomeCalculo}*\n`;
    }
    if (metadata.nomeEscritorio) {
      text += `ESCRITÓRIO: *${metadata.nomeEscritorio}*\n`;
    }
    if (metadata.dataCalculo) {
      text += `DATA: *${metadata.dataCalculo}*\n`;
    }
    text += `--------------------\n`;
  }

  // Add Dados do Contrato
  if (resultados.dadosContrato) {
    text += "DADOS DO CONTRATO\n";
    text += `Salário Base: *${formatValue(resultados.dadosContrato.salarioBase)}*\n`;
    text += `Data de Admissão: *${new Date(resultados.dadosContrato.dataAdmissao).toLocaleDateString('pt-BR')}*\n`;
    text += `Data de Demissão: *${new Date(resultados.dadosContrato.dataDemissao).toLocaleDateString('pt-BR')}*\n`;
    text += `--------------------\n`;
  }

  // Add verbas rescisórias
  const verbas = detalhamento.verbas || {};
  if (Object.keys(verbas).filter(key => (verbas[key] as number) > 0).length > 0) {
    text += "VERBAS RESCISÓRIAS:\n";
    for (const [key, value] of Object.entries(verbas)) {
      if ((value as number) > 0) {
        text += `${getVerbaDisplayName(key)}: *${formatValue(value as number)}*\n`;
      }
    }
    text += `--------------------\n`;
  }

  // Add adicionais
  const adicionais = detalhamento.adicionais || {};
  if (Object.keys(adicionais).filter(key => (adicionais[key] as number) > 0).length > 0) {
    text += "ADICIONAIS:\n";
    for (const [key, value] of Object.entries(adicionais)) {
      if ((value as number) > 0) {
        text += `${getAdicionalDisplayName(key)}: *${formatValue(value as number)}*\n`;
      }
    }
    text += `--------------------\n`;
  }

  // Add multas
  const multas = detalhamento.multas || {};
  if (Object.keys(multas).filter(key => (multas[key] as number) > 0).length > 0) {
    text += "MULTAS:\n";
    for (const [key, value] of Object.entries(multas)) {
      if ((value as number) > 0) {
        text += `${getMultaDisplayName(key)}: *${formatValue(value as number)}*\n`;
      }
    }
    text += `--------------------\n`;
  }

  // Add outros valores
  if (detalhamento.salarioFamilia > 0 || detalhamento.seguroDesemprego > 0 || detalhamento.calculosPersonalizados > 0) {
    text += "OUTROS VALORES:\n";
    if (detalhamento.salarioFamilia > 0) text += `Salário-Família: *${formatValue(detalhamento.salarioFamilia)}*\n`;
    if (detalhamento.seguroDesemprego > 0) text += `Seguro-Desemprego: *${formatValue(detalhamento.seguroDesemprego)}*\n`;
    if (detalhamento.calculosPersonalizados > 0) text += `Cálculos Personalizados: *${formatValue(detalhamento.calculosPersonalizados)}*\n`;
    text += `--------------------\n`;
  }

  // Add total geral with special emphasis
  const totalGeral = resultados.total; 
  
  text += "VALOR TOTAL DA RECLAMAÇÃO:\n";
  text += `*${formatValue(totalGeral)}*\n`;
  
  return text;
};

// Helper functions for display names
const getVerbaDisplayName = (key: string) => {
  const nomes: { [key: string]: string } = {
    'salarioProporcional': 'Saldo de Salário',
    'decimoTerceiro': '13º Salário Proporcional',
    'feriasProporcionais': 'Férias Proporcionais + 1/3',
    'avisoPrevio': 'Aviso Prévio',
    'fgts': 'FGTS sobre Verbas',
    'multaFgts': 'Multa do FGTS (40%)',
    'feriasVencidas': 'Férias Vencidas + 1/3',
    'indenizacaoDemissaoIndevida': 'Indenização por Demissão Indevida',
    'valeTransporteNaoPago': 'Vale Transporte Não Pago',
    'valeAlimentacaoNaoPago': 'Vale Alimentação Não Pago',
    'adicionalTransferencia': 'Adicional de Transferência',
    'descontosIndevidos': 'Descontos Indevidos',
    'diferencasSalariais': 'Diferenças Salariais'
  };
  return nomes[key] || key;
};

const getAdicionalDisplayName = (key: string) => {
  const nomes: { [key: string]: string } = {
    'insalubridade': 'Adicional de Insalubridade',
    'periculosidade': 'Adicional de Periculosidade',
    'noturno': 'Adicional Noturno',
    'horasExtras': 'Horas Extras'
  };
  return nomes[key] || key;
};

const getMultaDisplayName = (key: string) => {
  const nomes: { [key: string]: string } = {
    'art467': 'Multa Art. 467 CLT',
    'art477': 'Multa Art. 477 CLT'
  };
  return nomes[key] || key;
};
