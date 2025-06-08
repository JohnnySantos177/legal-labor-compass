
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Eye, 
  Edit, 
  FileText, 
  Share, 
  Trash2 
} from 'lucide-react';
import { CalculoSalvo } from '@/hooks/useCalculosSalvos';
import { CalculationViewer } from './CalculationViewer';
import { exportToPDF } from '@/utils/export/pdfExport';
import { shareViaWhatsApp, shareViaEmail, generateCalculationText } from '@/utils/export/shareUtils';

interface SavedCalculationsProps {
  calculosSalvos: CalculoSalvo[];
  onRemover: (id: string) => void;
  onRenomear: (id: string, novoNome: string) => void;
  onEditar: (calculo: CalculoSalvo) => void;
}

export const SavedCalculations = ({ 
  calculosSalvos, 
  onRemover, 
  onRenomear, 
  onEditar 
}: SavedCalculationsProps) => {
  const [editandoNome, setEditandoNome] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState('');
  const [calculoVisualizando, setCalculoVisualizando] = useState<CalculoSalvo | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const iniciarEdicaoNome = (calculo: CalculoSalvo) => {
    setEditandoNome(calculo.id);
    setNovoNome(calculo.nome);
  };

  const salvarNome = (id: string) => {
    if (novoNome.trim()) {
      onRenomear(id, novoNome.trim());
      setEditandoNome(null);
      setNovoNome('');
    }
  };

  const cancelarEdicao = () => {
    setEditandoNome(null);
    setNovoNome('');
  };

  const exportarPDF = (calculo: CalculoSalvo) => {
    // Simular a criação de um elemento print-results-only para o PDF
    const printDiv = document.createElement('div');
    printDiv.id = 'print-results-only';
    printDiv.innerHTML = `
      <div class="section">
        <h2>Dados do Contrato</h2>
        <div class="result-item">
          <span class="result-label">Salário Base:</span>
          <span class="result-value">${formatCurrency(calculo.dadosContrato.salarioBase)}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Data Admissão:</span>
          <span class="result-value">${new Date(calculo.dadosContrato.dataAdmissao).toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Data Demissão:</span>
          <span class="result-value">${new Date(calculo.dadosContrato.dataDemissao).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
      
      <div class="section">
        <h2>Resultados do Cálculo</h2>
        <div class="result-item total">
          <span class="result-label">Total Geral:</span>
          <span class="result-value">${formatCurrency(calculo.resultados.total)}</span>
        </div>
      </div>
      
      <div class="valor-total">
        <span class="titulo">Valor Total da Reclamação</span>
        <span class="valor">${formatCurrency(calculo.resultados.total)}</span>
      </div>
    `;
    
    document.body.appendChild(printDiv);
    exportToPDF();
    document.body.removeChild(printDiv);
  };

  const compartilharCalculo = (calculo: CalculoSalvo) => {
    const textoCalculo = generateCalculationText(calculo.resultados);
    const confirmacao = window.confirm('Escolha o método de compartilhamento:\nOK = WhatsApp\nCancelar = Email');
    
    if (confirmacao) {
      shareViaWhatsApp(textoCalculo);
    } else {
      shareViaEmail(`Cálculo Trabalhista - ${calculo.nome}`, textoCalculo);
    }
  };

  if (calculosSalvos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cálculos Salvos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            Nenhum cálculo salvo ainda. Realize um cálculo e clique em "Salvar" para vê-lo aqui.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Cálculos Salvos ({calculosSalvos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculosSalvos.map((calculo) => (
                <TableRow key={calculo.id}>
                  <TableCell>
                    {editandoNome === calculo.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={novoNome}
                          onChange={(e) => setNovoNome(e.target.value)}
                          className="h-8"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') salvarNome(calculo.id);
                            if (e.key === 'Escape') cancelarEdicao();
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => salvarNome(calculo.id)}
                          className="h-8 px-2"
                        >
                          ✓
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelarEdicao}
                          className="h-8 px-2"
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <span 
                        onClick={() => iniciarEdicaoNome(calculo)}
                        className="cursor-pointer hover:text-blue-600"
                        title="Clique para renomear"
                      >
                        {calculo.nome}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(calculo.dataCriacao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(calculo.resultados?.total || 0)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCalculoVisualizando(calculo)}
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditar(calculo)}
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportarPDF(calculo)}
                        title="Exportar PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => compartilharCalculo(calculo)}
                        title="Compartilhar"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja remover este cálculo?')) {
                            onRemover(calculo.id);
                          }
                        }}
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {calculoVisualizando && (
        <CalculationViewer
          calculo={calculoVisualizando}
          onClose={() => setCalculoVisualizando(null)}
        />
      )}
    </>
  );
};
