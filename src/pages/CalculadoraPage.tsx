
import { useCalculadora } from '@/hooks/useCalculadora';
import { ContractDataForm } from '@/components/calculadora/ContractDataForm';
import { AdditionsForm } from '@/components/calculadora/AdditionsForm';
import { CalculationResult } from '@/components/calculadora/CalculationResult';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, RefreshCw } from 'lucide-react';

export const CalculadoraPage = () => {
  const {
    contractData,
    additions,
    result,
    loading,
    updateContractData,
    addAddition,
    removeAddition,
    toggleAddition,
    calculate,
    reset
  } = useCalculadora();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-juriscalc-navy">Calculadora Trabalhista</h1>
        <Button
          variant="outline"
          onClick={reset}
          className="text-juriscalc-blue border-juriscalc-blue"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Limpar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ContractDataForm
            data={contractData}
            onUpdate={updateContractData}
          />
          
          <AdditionsForm
            additions={additions}
            onAdd={addAddition}
            onRemove={removeAddition}
            onToggle={toggleAddition}
          />
        </div>

        <div className="space-y-6">
          <Card className="juriscalc-card">
            <CardContent className="p-6">
              <Button
                onClick={calculate}
                disabled={loading}
                className="w-full bg-juriscalc-blue hover:bg-juriscalc-navy h-12 text-lg"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    Calcular
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <CalculationResult result={result} />
          )}
        </div>
      </div>
    </div>
  );
};
