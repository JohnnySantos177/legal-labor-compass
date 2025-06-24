export interface CalculosEmbutidos {
  verbasRescisorias: {
    [key: string]: number;
  };
  adicionais: {
    [key: string]: number;
  };
  totalGeral: number;
  detalhamento?: {
    verbas: { [key: string]: number };
    adicionais: { [key: string]: number };
    multas: { [key: string]: number };
    salarioFamilia: number;
    seguroDesemprego: number;
    calculosPersonalizados: number;
  };
}

export const criarHTMLCalculosEmbutidos = (resultados: CalculosEmbutidos | any) => {
  // Convert Resultados to CalculosEmbutidos format if needed
  const calculosData: CalculosEmbutidos = resultados.detalhamento ? {
    verbasRescisorias: resultados.detalhamento.verbas || {},
    adicionais: {
      ...resultados.detalhamento.adicionais || {},
      ...resultados.detalhamento.multas || {},
      salarioFamilia: resultados.detalhamento.salarioFamilia || 0,
      seguroDesemprego: resultados.detalhamento.seguroDesemprego || 0,
      calculosPersonalizados: resultados.detalhamento.calculosPersonalizados || 0
    },
    totalGeral: resultados.total || 0,
    detalhamento: resultados.detalhamento
  } : resultados;

  let html = `
    <table style="width:100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color:#f2f2f2;">
          <th style="padding:8px; border:1px solid #ddd; text-align:left;">Rubrica</th>
          <th style="padding:8px; border:1px solid #ddd; text-align:right;">Valor</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Adicionar verbas rescisórias
  for (const key in calculosData.verbasRescisorias) {
    if (calculosData.verbasRescisorias[key] > 0) {
      html += `
        <tr>
          <td style="padding:8px; border:1px solid #ddd;">${key}</td>
          <td style="padding:8px; border:1px solid #ddd; text-align:right;">${calculosData.verbasRescisorias[key].toFixed(2)}</td>
        </tr>
      `;
    }
  }

  // Adicionar adicionais
  for (const key in calculosData.adicionais) {
    if (calculosData.adicionais[key] > 0) {
      html += `
        <tr>
          <td style="padding:8px; border:1px solid #ddd;">${key}</td>
          <td style="padding:8px; border:1px solid #ddd; text-align:right;">${calculosData.adicionais[key].toFixed(2)}</td>
        </tr>
      `;
    }
  }

  // Adicionar total geral
  html += `
        <tr style="font-weight:bold;">
          <td style="padding:8px; border:1px solid #ddd; text-align:left;">Total Geral</td>
          <td style="padding:8px; border:1px solid #ddd; text-align:right;">${calculosData.totalGeral.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  `;

  return html;
};
