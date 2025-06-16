import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Resultados, DadosContrato, Adicionais, Verbas, Multas, SalarioFamilia, SeguroDesemprego, CalculoPersonalizado } from '@/types/calculadora';

export interface CalculoSalvo {
  id: string;
  nome: string;
  dataCriacao: string;
  dadosContrato?: DadosContrato;
  adicionais: Adicionais;
  verbas: Verbas;
  multas: Multas;
  salarioFamilia: SalarioFamilia;
  seguroDesemprego: SeguroDesemprego;
  calculosPersonalizados: CalculoPersonalizado[];
  resultados: Resultados;
}

export const useCalculosSalvos = () => {
  const [calculosSalvos, setCalculosSalvos] = useState<CalculoSalvo[]>(() => {
    const saved = localStorage.getItem('calculosSalvos');
    return saved ? JSON.parse(saved) : [];
  });

  const salvarCalculo = useCallback((dadosCompletos: { 
    dadosContrato: DadosContrato;
    adicionais: Adicionais;
    verbas: Verbas;
    multas: Multas;
    salarioFamilia: SalarioFamilia;
    seguroDesemprego: SeguroDesemprego;
    calculosPersonalizados: CalculoPersonalizado[];
  }, resultados: Resultados, nome?: string) => {
    const novoCalculo: CalculoSalvo = {
      id: Date.now().toString(),
      nome: nome || `Cálculo ${new Date().toLocaleDateString('pt-BR')}`,
      dataCriacao: new Date().toISOString(),
      dadosContrato: dadosCompletos.dadosContrato,
      adicionais: dadosCompletos.adicionais,
      verbas: dadosCompletos.verbas,
      multas: dadosCompletos.multas,
      salarioFamilia: dadosCompletos.salarioFamilia,
      seguroDesemprego: dadosCompletos.seguroDesemprego,
      calculosPersonalizados: dadosCompletos.calculosPersonalizados,
      resultados
    };

    const novosCalculos = [...calculosSalvos, novoCalculo];
    setCalculosSalvos(novosCalculos);
    localStorage.setItem('calculosSalvos', JSON.stringify(novosCalculos));
    
    toast.success('Cálculo salvo com sucesso!');
    return novoCalculo.id;
  }, [calculosSalvos]);

  const removerCalculo = useCallback((id: string) => {
    const novosCalculos = calculosSalvos.filter(calculo => calculo.id !== id);
    setCalculosSalvos(novosCalculos);
    localStorage.setItem('calculosSalvos', JSON.stringify(novosCalculos));
    toast.success('Cálculo removido com sucesso!');
  }, [calculosSalvos]);

  const renomearCalculo = useCallback((id: string, novoNome: string) => {
    const novosCalculos = calculosSalvos.map(calculo => 
      calculo.id === id ? { ...calculo, nome: novoNome } : calculo
    );
    setCalculosSalvos(novosCalculos);
    localStorage.setItem('calculosSalvos', JSON.stringify(novosCalculos));
    toast.success('Cálculo renomeado com sucesso!');
  }, [calculosSalvos]);

  const carregarCalculo = useCallback((id: string) => {
    return calculosSalvos.find(calculo => calculo.id === id);
  }, [calculosSalvos]);

  return {
    calculosSalvos,
    salvarCalculo,
    removerCalculo,
    renomearCalculo,
    carregarCalculo
  };
};
