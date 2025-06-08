
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Eye, FileText, Share2, Trash2, Check, X } from 'lucide-react';
import { SavedCalculation } from '@/hooks/useCalculosSalvos';

interface SavedCalculationsProps {
  savedCalculations: SavedCalculation[];
  onView: (calculation: SavedCalculation) => void;
  onEdit: (calculation: SavedCalculation) => void;
  onRename: (id: string, newName: string) => void;
  onToggleEditName: (id: string) => void;
  onExportPDF: (calculation: SavedCalculation) => void;
  onShare: (calculation: SavedCalculation) => void;
  onDelete: (id: string) => void;
}

export function SavedCalculations({
  savedCalculations,
  onView,
  onEdit,
  onRename,
  onToggleEditName,
  onExportPDF,
  onShare,
  onDelete
}: SavedCalculationsProps) {
  const [editingName, setEditingName] = useState<{ [key: string]: string }>({});

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleNameChange = (id: string, value: string) => {
    setEditingName(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveName = (id: string) => {
    const newName = editingName[id];
    if (newName && newName.trim()) {
      onRename(id, newName.trim());
      setEditingName(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleCancelEdit = (id: string) => {
    onToggleEditName(id);
    setEditingName(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  if (savedCalculations.length === 0) {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-juriscalc-navy">
            Cálculos Salvos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Nenhum cálculo salvo ainda. Realize um cálculo e clique em "Salvar" para começar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-juriscalc-navy">
          Cálculos Salvos ({savedCalculations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Cálculo</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedCalculations.map((calculation) => (
                <TableRow key={calculation.id}>
                  <TableCell className="font-medium">
                    {calculation.editableName ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editingName[calculation.id] ?? calculation.name}
                          onChange={(e) => handleNameChange(calculation.id, e.target.value)}
                          className="h-8"
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSaveName(calculation.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCancelEdit(calculation.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      calculation.name
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(calculation.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(calculation.totalValue)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onView(calculation)}
                        className="h-8 w-8 p-0"
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(calculation)}
                        className="h-8 w-8 p-0"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingName(prev => ({ ...prev, [calculation.id]: calculation.name }));
                          onToggleEditName(calculation.id);
                        }}
                        className="h-8 w-8 p-0"
                        title="Renomear"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onExportPDF(calculation)}
                        className="h-8 w-8 p-0"
                        title="Exportar PDF"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onShare(calculation)}
                        className="h-8 w-8 p-0"
                        title="Compartilhar"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(calculation.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
