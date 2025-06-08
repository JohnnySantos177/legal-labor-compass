
import { useCalculadora } from '@/hooks/useCalculadora';
import { useCalculosSalvos } from '@/hooks/useCalculosSalvos';
import { ContractDataForm } from '@/components/calculadora/ContractDataForm';
import { AdditionsForm } from '@/components/calculadora/AdditionsForm';
import { CalculationResult } from '@/components/calculadora/CalculationResult';
import { SavedCalculations } from '@/components/calculadora/SavedCalculations';
import { CalculationViewer } from '@/components/calculadora/CalculationViewer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SavedCalculation } from '@/hooks/useCalculosSalvos';
import { toast } from 'sonner';

export function CalculadoraPage() {
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

  const {
    savedCalculations,
    saveCalculation,
    updateCalculationName,
    toggleEditName,
    deleteCalculation
  } = useCalculosSalvos();

  const [viewingCalculation, setViewingCalculation] = useState<SavedCalculation | null>(null);

  const handleSaveCalculation = () => {
    if (!result) {
      toast.error('Realize um cálculo antes de salvar');
      return;
    }
    saveCalculation(result);
  };

  const handleViewCalculation = (calculation: SavedCalculation) => {
    setViewingCalculation(calculation);
  };

  const handleEditCalculation = (calculation: SavedCalculation) => {
    // Load the calculation data into the form
    // For now, we'll just show a message since we need to implement data loading
    toast.info('Funcionalidade de edição será implementada em breve');
  };

  const handleExportPDF = (calculation: SavedCalculation) => {
    // Implement PDF export
    toast.info('Exportação em PDF será implementada em breve');
  };

  const handleShare = (calculation: SavedCalculation) => {
    // Implement sharing functionality
    toast.info('Compartilhamento será implementado em breve');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Calculadora Trabalhista</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Contract Data Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <ContractDataForm 
              data={contractData} 
              onUpdate={updateContractData} 
            />
          </div>

          {/* Additions Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <AdditionsForm 
              additions={additions}
              onAdd={addAddition}
              onRemove={removeAddition}
              onToggle={toggleAddition}
            />
          </div>
        </div>

        <div className="space-y-8">
          {/* Calculate Button */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex gap-4">
              <Button
                className="flex-1 py-3 bg-juriscalc-blue text-white rounded-lg hover:bg-juriscalc-navy transition-colors"
                onClick={calculate}
                disabled={loading}
              >
                {loading ? 'Calculando...' : 'Calcular'}
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                className="px-6"
              >
                Limpar
              </Button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <CalculationResult 
                result={result} 
                onSave={handleSaveCalculation}
              />
            </div>
          )}
        </div>
      </div>

      {/* Saved Calculations */}
      <div className="mt-8">
        <SavedCalculations
          savedCalculations={savedCalculations}
          onView={handleViewCalculation}
          onEdit={handleEditCalculation}
          onRename={updateCalculationName}
          onToggleEditName={toggleEditName}
          onExportPDF={handleExportPDF}
          onShare={handleShare}
          onDelete={deleteCalculation}
        />
      </div>

      {/* Calculation Viewer Modal */}
      <CalculationViewer
        calculation={viewingCalculation}
        isOpen={!!viewingCalculation}
        onClose={() => setViewingCalculation(null)}
      />
    </div>
  );
}
