import { CalculadoraState, Resultados } from '@/types/calculadora';

const SALARIO_MINIMO = 1412; // Valor do salário mínimo 2024

export function useCalculos() {
  const calcular = (state: CalculadoraState): Resultados => {
    console.log('Iniciando cálculos com estado:', state);
    
    const { dadosContrato, adicionais, verbas, multas, salarioFamilia, seguroDesemprego, calculosPersonalizados } = state;
    const { salarioBase, diasTrabalhados, mesesTrabalhados, motivoDemissao, avisoPrevioCumprido, fgtsDepositado } = dadosContrato;

    console.log('Salário base para cálculos:', salarioBase);
    console.log('Dias trabalhados:', diasTrabalhados);
    console.log('Meses trabalhados:', mesesTrabalhados);
    console.log('Motivo da demissão:', motivoDemissao);

    // Cálculo do salário proporcional aos dias trabalhados (saldo de salário)
    const diasNoMes = 30; // Consideramos mês comercial de 30 dias
    const salarioProporcional = (salarioBase / diasNoMes) * parseInt(diasTrabalhados);
    console.log('Salário proporcional:', salarioProporcional);

    // Cálculo do 13º salário proporcional
    let valorDecimoTerceiro = 0;
    if (motivoDemissao !== 'justa_causa') {
      const mesesParaDecimoTerceiro = Math.floor(parseInt(mesesTrabalhados) + (parseInt(diasTrabalhados) > 14 ? 1 : 0));
      valorDecimoTerceiro = (salarioBase / 12) * mesesParaDecimoTerceiro;
    }
    console.log('13º salário proporcional:', valorDecimoTerceiro);

    // Cálculo de férias proporcionais
    let valorFeriasProporcionais = 0;
    if (motivoDemissao !== 'justa_causa') {
      const mesesParaFerias = Math.floor(parseInt(mesesTrabalhados) + (parseInt(diasTrabalhados) > 14 ? 1 : 0));
      valorFeriasProporcionais = (salarioBase / 12) * mesesParaFerias;
      // Adicional de 1/3 de férias
      valorFeriasProporcionais += valorFeriasProporcionais / 3;
    }
    console.log('Férias proporcionais + 1/3:', valorFeriasProporcionais);

    // Cálculo do aviso prévio
    let valorAvisoPrevio = 0;
    if (motivoDemissao === 'sem_justa_causa' && !avisoPrevioCumprido) {
      valorAvisoPrevio = salarioBase;
    } else if (motivoDemissao === 'acordo_mutuo' && !avisoPrevioCumprido) {
      valorAvisoPrevio = salarioBase / 2; // 50% no caso de acordo mútuo
    }
    console.log('Aviso prévio:', valorAvisoPrevio);

    // Cálculo do FGTS
    let valorFGTS = 0;
    let multaFGTS = 0;
    if (!fgtsDepositado) {
      // Base de cálculo do FGTS: salário + 13º + férias + aviso prévio
      const baseFGTS = salarioProporcional + valorDecimoTerceiro + valorFeriasProporcionais + valorAvisoPrevio;
      valorFGTS = baseFGTS * 0.08;

      // Multa do FGTS
      if (motivoDemissao === 'sem_justa_causa') {
        multaFGTS = valorFGTS * 0.4; // 40% de multa
      } else if (motivoDemissao === 'acordo_mutuo') {
        multaFGTS = valorFGTS * 0.2; // 20% de multa
      }
    }
    console.log('FGTS:', valorFGTS);
    console.log('Multa FGTS:', multaFGTS);

    // Cálculo de Insalubridade
    let valorInsalubridade = 0;
    if (adicionais.insalubridade.ativo) {
      const baseInsalubridade = adicionais.insalubridade.baseCalculo === 'salario_minimo' ? SALARIO_MINIMO : salarioBase;
      const percentualInsalubridade = {
        minimo: 0.1,
        medio: 0.2,
        maximo: 0.4
      }[adicionais.insalubridade.grau];
      valorInsalubridade = baseInsalubridade * (percentualInsalubridade || 0);
      console.log('Valor Insalubridade:', valorInsalubridade);
    }

    // Cálculo de Periculosidade
    let valorPericulosidade = 0;
    if (adicionais.periculosidade.ativo) {
      const basePericulosidade = adicionais.periculosidade.baseCalculo === 'salario_minimo' ? SALARIO_MINIMO : salarioBase;
      valorPericulosidade = basePericulosidade * (adicionais.periculosidade.percentual / 100);
      console.log('Valor Periculosidade:', valorPericulosidade);
    }

    // Cálculo de Adicional Noturno
    let valorAdicionalNoturno = 0;
    if (adicionais.noturno.ativo) {
      const valorHora = salarioBase / 220;
      valorAdicionalNoturno = valorHora * adicionais.noturno.horas * (adicionais.noturno.percentual / 100);
      console.log('Valor Adicional Noturno:', valorAdicionalNoturno);
    }

    // Cálculo de Horas Extras
    let valorHorasExtras = 0;
    if (adicionais.horasExtras.ativo) {
      const valorHora = salarioBase / 220;
      const calculosAtualizados = adicionais.horasExtras.calculos.map(horaExtra => {
        const valor = valorHora * horaExtra.quantidade * (1 + horaExtra.percentual / 100);
        return { ...horaExtra, valor };
      });
      valorHorasExtras = calculosAtualizados.reduce((total, horaExtra) => total + (horaExtra.valor || 0), 0);
      console.log('Valor Horas Extras:', valorHorasExtras);
    }

    // Cálculo de Férias Vencidas
    let valorFeriasVencidas = 0;
    if (verbas.feriasVencidas.ativo) {
      valorFeriasVencidas = (salarioBase * verbas.feriasVencidas.periodos) + (salarioBase * verbas.feriasVencidas.periodos / 3);
      console.log('Valor Férias Vencidas:', valorFeriasVencidas);
    }

    // Cálculo de Indenização por Demissão Indevida
    let valorIndenizacao = 0;
    if (verbas.indenizacaoDemissaoIndevida.ativo) {
      valorIndenizacao = verbas.indenizacaoDemissaoIndevida.valor || salarioBase;
      console.log('Valor Indenização:', valorIndenizacao);
    }

    // Cálculo de Vale Transporte Não Pago
    let valorValeTransporte = 0;
    if (verbas.valeTransporteNaoPago.ativo) {
      valorValeTransporte = verbas.valeTransporteNaoPago.valor * verbas.valeTransporteNaoPago.meses;
      console.log('Valor Vale Transporte:', valorValeTransporte);
    }

    // Cálculo de Vale Alimentação Não Pago
    let valorValeAlimentacao = 0;
    if (verbas.valeAlimentacaoNaoPago.ativo) {
      valorValeAlimentacao = verbas.valeAlimentacaoNaoPago.valor * verbas.valeAlimentacaoNaoPago.meses;
      console.log('Valor Vale Alimentação:', valorValeAlimentacao);
    }

    // Cálculo de Adicional de Transferência
    let valorAdicionalTransferencia = 0;
    if (verbas.adicionalTransferencia.ativo) {
      valorAdicionalTransferencia = salarioBase * (verbas.adicionalTransferencia.percentual / 100) * verbas.adicionalTransferencia.meses;
      console.log('Valor Adicional Transferência:', valorAdicionalTransferencia);
    }

    // Cálculo de Descontos Indevidos
    let valorDescontosIndevidos = 0;
    if (verbas.descontosIndevidos.ativo) {
      valorDescontosIndevidos = verbas.descontosIndevidos.valor;
      console.log('Valor Descontos Indevidos:', valorDescontosIndevidos);
    }

    // Cálculo de Diferenças Salariais
    let valorDiferencasSalariais = 0;
    if (verbas.diferencasSalariais.ativo) {
      valorDiferencasSalariais = verbas.diferencasSalariais.valorDiferenca * verbas.diferencasSalariais.meses;
      console.log('Valor Diferenças Salariais:', valorDiferencasSalariais);
    }

    // Cálculo das Multas
    let valorMulta467 = 0;
    if (multas.art467.ativo) {
      const baseMulta467 = valorFeriasVencidas + valorIndenizacao + valorValeTransporte + valorValeAlimentacao + 
                          valorAdicionalTransferencia + valorDescontosIndevidos + valorDiferencasSalariais;
      valorMulta467 = baseMulta467 * 0.5;
      console.log('Valor Multa 467:', valorMulta467);
    }

    let valorMulta477 = 0;
    if (multas.art477.ativo) {
      valorMulta477 = salarioBase;
      console.log('Valor Multa 477:', valorMulta477);
    }

    // Cálculo do Salário Família
    let valorSalarioFamilia = 0;
    if (salarioFamilia.ativo) {
      const valorPorFilho = salarioBase <= 1754.18 ? 59.82 : 0;
      valorSalarioFamilia = valorPorFilho * salarioFamilia.quantidadeFilhos;
      console.log('Valor Salário Família:', valorSalarioFamilia);
    }

    // Cálculo do Seguro Desemprego
    let valorSeguroDesemprego = 0;
    if (seguroDesemprego.ativo && motivoDemissao === 'sem_justa_causa') {
      // Implementar cálculo do seguro desemprego conforme regras específicas
      valorSeguroDesemprego = 0;
      console.log('Valor Seguro Desemprego:', valorSeguroDesemprego);
    }

    // Cálculo dos valores personalizados
    const valorCalculosPersonalizados = calculosPersonalizados.reduce((total, calc) => {
      if (calc.ativo) {
        return total + calc.valor;
      }
      return total;
    }, 0);
    console.log('Valor Cálculos Personalizados:', valorCalculosPersonalizados);

    // Total geral
    const total = salarioProporcional + valorDecimoTerceiro + valorFeriasProporcionais + valorAvisoPrevio +
                 valorFGTS + multaFGTS + valorInsalubridade + valorPericulosidade + valorAdicionalNoturno + 
                 valorHorasExtras + valorFeriasVencidas + valorIndenizacao + valorValeTransporte + 
                 valorValeAlimentacao + valorAdicionalTransferencia + valorDescontosIndevidos + 
                 valorDiferencasSalariais + valorMulta467 + valorMulta477 + valorSalarioFamilia + 
                 valorSeguroDesemprego + valorCalculosPersonalizados;

    console.log('Total calculado:', total);

    const resultados = {
      total,
      detalhamento: {
        verbas: {
          salarioProporcional,
          decimoTerceiro: valorDecimoTerceiro,
          feriasProporcionais: valorFeriasProporcionais,
          avisoPrevio: valorAvisoPrevio,
          fgts: valorFGTS,
          multaFgts: multaFGTS,
          feriasVencidas: valorFeriasVencidas,
          indenizacaoDemissaoIndevida: valorIndenizacao,
          valeTransporteNaoPago: valorValeTransporte,
          valeAlimentacaoNaoPago: valorValeAlimentacao,
          adicionalTransferencia: valorAdicionalTransferencia,
          descontosIndevidos: valorDescontosIndevidos,
          diferencasSalariais: valorDiferencasSalariais
        },
        adicionais: {
          insalubridade: valorInsalubridade,
          periculosidade: valorPericulosidade,
          noturno: valorAdicionalNoturno,
          horasExtras: valorHorasExtras
        },
        multas: {
          art467: valorMulta467,
          art477: valorMulta477
        },
        salarioFamilia: valorSalarioFamilia,
        seguroDesemprego: valorSeguroDesemprego,
        calculosPersonalizados: valorCalculosPersonalizados
      }
    };

    console.log('Resultados finais:', resultados);
    return resultados;
  };

  return {
    calcular
  };
} 