import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculadoraState } from '@/types/calculadora';

interface MultasOutrosAdicionaisProps {
  state: CalculadoraState;
  updateState: (updates: Partial<CalculadoraState>) => void;
}

export function MultasOutrosAdicionais({ state, updateState }: MultasOutrosAdicionaisProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Multas</h3>
      <div className="space-y-4">
        {/* Multa Art. 467 */}
        <div className="flex items-center justify-between">
          <Label htmlFor="multa467">Multa do Art. 467 da CLT (50% sobre verbas incontroversas)</Label>
          <Switch 
            id="multa467"
            checked={state.multas.art467.ativo}
            onCheckedChange={(checked) => updateState({
              multas: {
                ...state.multas,
                art467: {
                  ...state.multas.art467,
                  ativo: checked
                }
              }
            })}
          />
        </div>

        {/* Multa Art. 477 */}
        <div className="flex items-center justify-between">
          <Label htmlFor="multa477">Multa do Art. 477 da CLT (atraso no pagamento)</Label>
          <Switch 
            id="multa477"
            checked={state.multas.art477.ativo}
            onCheckedChange={(checked) => updateState({
              multas: {
                ...state.multas,
                art477: {
                  ...state.multas.art477,
                  ativo: checked
                }
              }
            })}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4 mt-8">Seguro-Desemprego</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="seguroDesemprego">Calcular Seguro-Desemprego</Label>
          <Switch 
            id="seguroDesemprego"
            checked={state.seguroDesemprego.ativo}
            onCheckedChange={(checked) => updateState({
              seguroDesemprego: {
                ...state.seguroDesemprego,
                ativo: checked
              }
            })}
          />
        </div>
        {state.seguroDesemprego.ativo && (
          <div className="pl-4 space-y-4">
            <div>
              <Label>Tipo de Trabalhador</Label>
              <Select 
                value={state.seguroDesemprego.tipoTrabalhador}
                onValueChange={(value) => updateState({
                  seguroDesemprego: {
                    ...state.seguroDesemprego,
                    tipoTrabalhador: value
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="domestico">Doméstico</SelectItem>
                  <SelectItem value="pescador">Pescador Artesanal</SelectItem>
                  <SelectItem value="resgatado">Trabalhador Resgatado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Último Salário (R$)</Label>
              <Input
                type="number"
                value={state.seguroDesemprego.ultimoSalario}
                onChange={(e) => updateState({
                  seguroDesemprego: {
                    ...state.seguroDesemprego,
                    ultimoSalario: parseFloat(e.target.value) || 0
                  }
                })}
              />
            </div>
            <div>
              <Label>Meses Trabalhados</Label>
              <Input
                type="number"
                value={state.seguroDesemprego.mesesTrabalhados}
                onChange={(e) => updateState({
                  seguroDesemprego: {
                    ...state.seguroDesemprego,
                    mesesTrabalhados: parseInt(e.target.value) || 0
                  }
                })}
              />
            </div>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-4 mt-8">Outros Adicionais</h3>
      <div className="space-y-4">
        {/* Salário-Família */}
        <div className="flex items-center justify-between">
          <Label htmlFor="salarioFamilia">Adicionar Salário-Família</Label>
          <Switch 
            id="salarioFamilia"
            checked={state.salarioFamilia.ativo}
            onCheckedChange={(checked) => updateState({
              salarioFamilia: {
                ...state.salarioFamilia,
                ativo: checked
              }
            })}
          />
        </div>
        {state.salarioFamilia.ativo && (
          <div className="pl-4">
            <Label>Quantidade de Filhos</Label>
            <Input
              type="number"
              value={state.salarioFamilia.quantidadeFilhos}
              onChange={(e) => updateState({
                salarioFamilia: {
                  ...state.salarioFamilia,
                  quantidadeFilhos: parseInt(e.target.value) || 0
                }
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
} 