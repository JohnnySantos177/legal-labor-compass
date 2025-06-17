import { useState, useCallback } from 'react';
import { CalculadoraState } from '@/types/calculadora';
import { useCalculadoraState } from './useCalculadoraState';

interface DadosContratoActions {
  updateSalarioBase: (salarioBase: number) => void;
  updateDataAdmissao: (dataAdmissao: string) => void;
  updateDataDemissao: (dataDemissao: string) => void;
  updateMotivoDemissao: (motivoDemissao: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | '') => void;
  updateDiasTrabalhados: (diasTrabalhados: string) => void;
  updateMesesTrabalhados: (mesesTrabalhados: string) => void;
  updateContratoTempoDeterminado: (contratoTempoDeterminado: boolean) => void;
  updateAvisoPrevioCumprido: (avisoPrevioCumprido: boolean) => void;
  updateFgtsDepositado: (fgtsDepositado: boolean) => void;
  updateMesesRestantesContrato: (mesesRestantesContrato: string) => void;
  updateAllDadosContrato: (dadosContrato: CalculadoraState['dadosContrato']) => void;
}

export const useDadosContrato = (): DadosContratoActions => {
  const { state, updateState } = useCalculadoraState();

  const updateSalarioBase = useCallback((salarioBase: number) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        salarioBase: salarioBase,
      },
    });
  }, [state, updateState]);

  const updateDataAdmissao = useCallback((dataAdmissao: string) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        dataAdmissao: dataAdmissao,
      },
    });
  }, [state, updateState]);

  const updateDataDemissao = useCallback((dataDemissao: string) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        dataDemissao: dataDemissao,
      },
    });
  }, [state, updateState]);

  const updateMotivoDemissao = useCallback((motivoDemissao: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | '') => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        motivoDemissao: motivoDemissao,
      },
    });
  }, [state, updateState]);

  const updateDiasTrabalhados = useCallback((diasTrabalhados: string) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        diasTrabalhados: diasTrabalhados,
      },
    });
  }, [state, updateState]);

  const updateMesesTrabalhados = useCallback((mesesTrabalhados: string) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        mesesTrabalhados: mesesTrabalhados,
      },
    });
  }, [state, updateState]);

  const updateContratoTempoDeterminado = useCallback((contratoTempoDeterminado: boolean) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        contratoTempoDeterminado: contratoTempoDeterminado,
      },
    });
  }, [state, updateState]);

  const updateAvisoPrevioCumprido = useCallback((avisoPrevioCumprido: boolean) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        avisoPrevioCumprido: avisoPrevioCumprido,
      },
    });
  }, [state, updateState]);

  const updateFgtsDepositado = useCallback((fgtsDepositado: boolean) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        fgtsDepositado: fgtsDepositado,
      },
    });
  }, [state, updateState]);

  const updateMesesRestantesContrato = useCallback((mesesRestantesContrato: string) => {
    updateState({
      dadosContrato: {
        ...state.dadosContrato,
        mesesRestantesContrato: mesesRestantesContrato,
      },
    });
  }, [state, updateState]);

  const updateAllDadosContrato = useCallback((dadosContrato: CalculadoraState['dadosContrato']) => {
    updateState({ dadosContrato });
  }, [updateState]);

  return {
    updateSalarioBase,
    updateDataAdmissao,
    updateDataDemissao,
    updateMotivoDemissao,
    updateDiasTrabalhados,
    updateMesesTrabalhados,
    updateContratoTempoDeterminado,
    updateAvisoPrevioCumprido,
    updateFgtsDepositado,
    updateMesesRestantesContrato,
    updateAllDadosContrato,
  };
};
