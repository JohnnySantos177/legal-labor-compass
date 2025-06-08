
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SavedCalculation } from '@/hooks/useCalculosSalvos';
import { X } from 'lucide-react';

interface CalculationViewerProps {
  calculation: SavedCalculation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CalculationViewer({ calculation, isOpen, onClose }: CalculationViewerProps) {
  if (!calculation) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {calculation.name}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-juriscalc-blue/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">Valor Total</h3>
            <p className="text-3xl font-bold text-juriscalc-blue">
              {formatCurrency(calculation.totalValue)}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-juriscalc-navy mb-3">Detalhamento</h4>
            <div className="space-y-2">
              {Object.entries(calculation.breakdown).map(([item, value]) => (
                <div key={item} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{item}</span>
                  <span className="text-juriscalc-blue font-semibold">
                    {formatCurrency(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 border-t pt-3">
            <p>Cálculo criado em: {new Date(calculation.createdAt).toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
