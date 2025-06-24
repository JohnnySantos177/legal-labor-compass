
import { Resultados } from "@/types/calculadora";

export type ExportData = {
  verbasRescisorias?: Resultados['detalhamento']['verbas'];
  adicionais?: Resultados['detalhamento']['adicionais'] & Resultados['detalhamento']['multas'] & {
    feriasVencidas?: number;
    indenizacaoDemissaoIndevida?: number;
    valeTransporteNaoPago?: number;
    valeAlimentacaoNaoPago?: number;
    adicionalTransferencia?: number;
    descontosIndevidos?: number;
    diferencasSalariais?: number;
    calculosPersonalizados?: number;
    seguroDesemprego?: number;
    salarioFamilia?: number;
  };
  totalGeral?: number;
  nome?: string;
  timestamp?: string;
  nomeEscritorio?: string;
};
