
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Resultados, DadosContrato, Adicionais, Verbas, Multas, SalarioFamilia, SeguroDesemprego, CustomCalculo } from '@/types/calculadora';

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
  calculosPersonalizados: CustomCalculo[];
  resultados: Resultados;
}

export const useCalculosSalvos = () => {
  const { user } = useAuth();
  const [calculosSalvos, setCalculosSalvos] = useState<CalculoSalvo[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar cálculos salvos do Supabase
  const carregarCalculos = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('calculos_salvos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const calculosMapeados: CalculoSalvo[] = data?.map(calculo => ({
        id: calculo.id,
        nome: calculo.nome,
        dataCriacao: calculo.created_at,
        dadosContrato: calculo.dados_contrato as DadosContrato,
        adicionais: calculo.adicionais as Adicionais,
        verbas: calculo.verbas_rescisorias as Verbas,
        multas: {} as Multas, // Adapte conforme necessário
        salarioFamilia: {} as SalarioFamilia, // Adapte conforme necessário
        seguroDesemprego: {} as SeguroDesemprego, // Adapte conforme necessário
        calculosPersonalizados: [] as CustomCalculo[], // Adapte conforme necessário
        resultados: {} as Resultados // Adapte conforme necessário
      })) || [];

      setCalculosSalvos(calculosMapeados);
    } catch (error: any) {
      console.error('Erro ao carregar cálculos:', error);
      toast.error('Erro ao carregar cálculos salvos');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    carregarCalculos();
  }, [carregarCalculos]);

  const salvarCalculo = useCallback(async (dadosCompletos: { 
    dadosContrato: DadosContrato;
    adicionais: Adicionais;
    verbas: Verbas;
    multas: Multas;
    salarioFamilia: SalarioFamilia;
    seguroDesemprego: SeguroDesemprego;
    calculosPersonalizados: CustomCalculo[];
  }, resultados: Resultados, nome?: string) => {
    if (!user) {
      toast.error('Usuário não autenticado');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('calculos_salvos')
        .insert({
          user_id: user.id,
          nome: nome || `Cálculo ${new Date().toLocaleDateString('pt-BR')}`,
          dados_contrato: dadosCompletos.dadosContrato,
          adicionais: dadosCompletos.adicionais,
          verbas_rescisorias: dadosCompletos.verbas,
          total_geral: 0 // Calcule o total baseado nos resultados
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      await carregarCalculos(); // Recarregar a lista
      toast.success('Cálculo salvo com sucesso!');
      return data.id;
    } catch (error: any) {
      console.error('Erro ao salvar cálculo:', error);
      toast.error('Erro ao salvar cálculo');
    }
  }, [user, carregarCalculos]);

  const removerCalculo = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('calculos_salvos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      await carregarCalculos(); // Recarregar a lista
      toast.success('Cálculo removido com sucesso!');
    } catch (error: any) {
      console.error('Erro ao remover cálculo:', error);
      toast.error('Erro ao remover cálculo');
    }
  }, [user, carregarCalculos]);

  const renomearCalculo = useCallback(async (id: string, novoNome: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('calculos_salvos')
        .update({ nome: novoNome })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      await carregarCalculos(); // Recarregar a lista
      toast.success('Cálculo renomeado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao renomear cálculo:', error);
      toast.error('Erro ao renomear cálculo');
    }
  }, [user, carregarCalculos]);

  const carregarCalculo = useCallback((id: string) => {
    return calculosSalvos.find(calculo => calculo.id === id);
  }, [calculosSalvos]);

  return {
    calculosSalvos,
    loading,
    salvarCalculo,
    removerCalculo,
    renomearCalculo,
    carregarCalculo,
    carregarCalculos
  };
};
