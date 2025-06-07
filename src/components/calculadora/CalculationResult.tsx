
import { CalculationResult as Result } from '@/types/calculadora';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';

interface CalculationResultProps {
  result: Result;
  onSave?: () => void;
}

export const CalculationResult = ({ result, onSave }: CalculationResultProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="juriscalc-card">
      <CardHeader>
        <CardTitle className="text-juriscalc-navy flex items-center justify-between">
          Resultado do Cálculo
          <div className="flex gap-2">
            {onSave && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSave}
                className="text-juriscalc-blue"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-juriscalc-blue"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-juriscalc-blue/10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-juriscalc-navy mb-2">Valor Total</h3>
          <p className="text-3xl font-bold text-juriscalc-blue">
            {formatCurrency(result.totalValue)}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-juriscalc-navy mb-3">Detalhamento</h4>
          <div className="space-y-2">
            {Object.entries(result.breakdown).map(([item, value]) => (
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
          <p>Cálculo realizado em: {new Date(result.createdAt).toLocaleString('pt-BR')}</p>
        </div>
      </CardContent>
    </Card>
  );
};
