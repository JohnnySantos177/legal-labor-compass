
import { useState } from 'react';
import { Addition } from '@/types/calculadora';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface AdditionsFormProps {
  additions: Addition[];
  onAdd: (addition: Addition) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export const AdditionsForm = ({ additions, onAdd, onRemove, onToggle }: AdditionsFormProps) => {
  const [newAddition, setNewAddition] = useState<{
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
  }>({
    name: '',
    type: 'percentage',
    value: 0
  });

  const handleAdd = () => {
    if (newAddition.name.trim()) {
      const addition: Addition = {
        id: Date.now().toString(),
        name: newAddition.name,
        type: newAddition.type,
        value: newAddition.value,
        enabled: true
      };
      
      onAdd(addition);
      setNewAddition({ name: '', type: 'percentage', value: 0 });
    }
  };

  const presetAdditions = [
    { name: 'Horas Extras (50%)', type: 'percentage' as const, value: 50 },
    { name: 'Adicional Noturno (20%)', type: 'percentage' as const, value: 20 },
    { name: 'Insalubridade Mínima (10%)', type: 'percentage' as const, value: 10 },
    { name: 'Insalubridade Média (20%)', type: 'percentage' as const, value: 20 },
    { name: 'Insalubridade Máxima (40%)', type: 'percentage' as const, value: 40 },
    { name: 'Periculosidade (30%)', type: 'percentage' as const, value: 30 }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Adicionais</h3>
      
      {/* Preset Additions */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Adicionais Pré-definidos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {presetAdditions.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onAdd({
                id: Date.now().toString() + index,
                name: preset.name,
                type: preset.type,
                value: preset.value,
                enabled: true
              })}
              className="justify-start text-left"
            >
              <Plus className="w-4 h-4 mr-2" />
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Addition Form */}
      <div className="mb-6 border-t pt-4">
        <h4 className="font-medium mb-3">Adicional Personalizado</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <Label htmlFor="additionName">Nome</Label>
            <Input
              id="additionName"
              value={newAddition.name}
              onChange={(e) => setNewAddition(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Gratificação"
            />
          </div>
          
          <div>
            <Label>Tipo</Label>
            <Select 
              value={newAddition.type} 
              onValueChange={(value: 'percentage' | 'fixed') => 
                setNewAddition(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentual (%)</SelectItem>
                <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="additionValue">
              {newAddition.type === 'percentage' ? 'Percentual' : 'Valor'}
            </Label>
            <div className="flex">
              <Input
                id="additionValue"
                type="number"
                step="0.01"
                value={newAddition.value}
                onChange={(e) => setNewAddition(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
              />
              <Button onClick={handleAdd} className="ml-2">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Added Additions List */}
      {additions.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Adicionais Selecionados</h4>
          <div className="space-y-2">
            {additions.map((addition) => (
              <div key={addition.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={addition.enabled}
                    onCheckedChange={() => onToggle(addition.id)}
                  />
                  <div>
                    <span className="font-medium">{addition.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {addition.type === 'percentage' ? `${addition.value}%` : `R$ ${addition.value.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(addition.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
