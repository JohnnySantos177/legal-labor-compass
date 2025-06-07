import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { CalculadoraState, HoraExtra } from '@/types/calculadora';

interface AdicionaisBasicosProps {
  state: CalculadoraState;
  updateState: (updates: Partial<CalculadoraState>) => void;
}

export function AdicionaisBasicos({ state, updateState }: AdicionaisBasicosProps) {
  const adicionarHoraExtra = () => {
    const novaHoraExtra: HoraExtra = {
      id: crypto.randomUUID(),
      percentual: 50,
      quantidade: 0,
      valor: 0
    };

    updateState({
      adicionais: {
        ...state.adicionais,
        horasExtras: {
          ...state.adicionais.horasExtras,
          calculos: [...state.adicionais.horasExtras.calculos, novaHoraExtra]
        }
      }
    });
  };

  const removerHoraExtra = (id: string) => {
    updateState({
      adicionais: {
        ...state.adicionais,
        horasExtras: {
          ...state.adicionais.horasExtras,
          calculos: state.adicionais.horasExtras.calculos.filter(he => he.id !== id)
        }
      }
    });
  };

  const atualizarHoraExtra = (id: string, updates: Partial<HoraExtra>) => {
    updateState({
      adicionais: {
        ...state.adicionais,
        horasExtras: {
          ...state.adicionais.horasExtras,
          calculos: state.adicionais.horasExtras.calculos.map(he => 
            he.id === id ? { ...he, ...updates } : he
          )
        }
      }
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Adicionais Básicos</h3>
      <div className="space-y-4">
        {/* Insalubridade */}
        <div className="flex items-center justify-between">
          <Label htmlFor="insalubridade">Adicional de Insalubridade</Label>
          <Switch 
            id="insalubridade"
            checked={state.adicionais.insalubridade.ativo}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                insalubridade: {
                  ...state.adicionais.insalubridade,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.adicionais.insalubridade.ativo && (
          <div className="pl-4 space-y-4">
            <div>
              <Label>Grau de Insalubridade</Label>
              <Select 
                value={state.adicionais.insalubridade.grau}
                onValueChange={(value: 'minimo' | 'medio' | 'maximo') => updateState({
                  adicionais: {
                    ...state.adicionais,
                    insalubridade: {
                      ...state.adicionais.insalubridade,
                      grau: value
                    }
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o grau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimo">Mínimo (10%)</SelectItem>
                  <SelectItem value="medio">Médio (20%)</SelectItem>
                  <SelectItem value="maximo">Máximo (40%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Base de Cálculo</Label>
              <Select 
                value={state.adicionais.insalubridade.baseCalculo}
                onValueChange={(value: 'salario_minimo' | 'salario_base') => updateState({
                  adicionais: {
                    ...state.adicionais,
                    insalubridade: {
                      ...state.adicionais.insalubridade,
                      baseCalculo: value
                    }
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a base" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salario_minimo">Salário Mínimo</SelectItem>
                  <SelectItem value="salario_base">Salário Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Aplicar por Período Específico?</Label>
                <Switch 
                  checked={state.adicionais.insalubridade.periodoEspecifico}
                  onCheckedChange={(checked) => updateState({
                    adicionais: {
                      ...state.adicionais,
                      insalubridade: {
                        ...state.adicionais.insalubridade,
                        periodoEspecifico: checked
                      }
                    }
                  })}
                />
              </div>
              {state.adicionais.insalubridade.periodoEspecifico && (
                <div className="space-y-2">
                  <div>
                    <Label>Data de Início da Insalubridade</Label>
                    <Input
                      type="date"
                      value={state.adicionais.insalubridade.dataInicio}
                      onChange={(e) => updateState({
                        adicionais: {
                          ...state.adicionais,
                          insalubridade: {
                            ...state.adicionais.insalubridade,
                            dataInicio: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Data de Fim da Insalubridade</Label>
                    <Input
                      type="date"
                      value={state.adicionais.insalubridade.dataFim}
                      onChange={(e) => updateState({
                        adicionais: {
                          ...state.adicionais,
                          insalubridade: {
                            ...state.adicionais.insalubridade,
                            dataFim: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <p className="text-sm text-blue-600">O adicional será aplicado apenas durante o período especificado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Periculosidade */}
        <div className="flex items-center justify-between">
          <Label htmlFor="periculosidade">Adicional de Periculosidade</Label>
          <Switch 
            id="periculosidade"
            checked={state.adicionais.periculosidade.ativo}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                periculosidade: {
                  ...state.adicionais.periculosidade,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.adicionais.periculosidade.ativo && (
          <div className="pl-4 space-y-4">
            <div>
              <Label>Percentual (%)</Label>
              <Input
                type="number"
                value={state.adicionais.periculosidade.percentual}
                onChange={(e) => updateState({
                  adicionais: {
                    ...state.adicionais,
                    periculosidade: {
                      ...state.adicionais.periculosidade,
                      percentual: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label>Base de Cálculo</Label>
              <Select 
                value={state.adicionais.periculosidade.baseCalculo}
                onValueChange={(value: 'salario_minimo' | 'salario_base') => updateState({
                  adicionais: {
                    ...state.adicionais,
                    periculosidade: {
                      ...state.adicionais.periculosidade,
                      baseCalculo: value
                    }
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a base" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salario_minimo">Salário Mínimo</SelectItem>
                  <SelectItem value="salario_base">Salário Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Adicional Noturno */}
        <div className="flex items-center justify-between">
          <Label htmlFor="noturno">Adicional Noturno</Label>
          <Switch 
            id="noturno"
            checked={state.adicionais.noturno.ativo}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                noturno: {
                  ...state.adicionais.noturno,
                  ativo: checked
                }
              }
            })}
          />
        </div>
        {state.adicionais.noturno.ativo && (
          <div className="pl-4 space-y-4">
            <div>
              <Label>Percentual (%)</Label>
              <Input
                type="number"
                value={state.adicionais.noturno.percentual}
                onChange={(e) => updateState({
                  adicionais: {
                    ...state.adicionais,
                    noturno: {
                      ...state.adicionais.noturno,
                      percentual: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label>Quantidade de Horas</Label>
              <Input
                type="number"
                value={state.adicionais.noturno.horas}
                onChange={(e) => updateState({
                  adicionais: {
                    ...state.adicionais,
                    noturno: {
                      ...state.adicionais.noturno,
                      horas: parseFloat(e.target.value) || 0
                    }
                  }
                })}
              />
            </div>
          </div>
        )}

        {/* Horas Extras */}
        <div className="flex items-center justify-between">
          <Label htmlFor="horasExtras">Horas Extras</Label>
          <Switch 
            id="horasExtras"
            checked={state.adicionais.horasExtras.ativo}
            onCheckedChange={(checked) => updateState({
              adicionais: {
                ...state.adicionais,
                horasExtras: {
                  ...state.adicionais.horasExtras,
                  ativo: checked,
                  calculos: checked && state.adicionais.horasExtras.calculos.length === 0 ? 
                    [{ id: crypto.randomUUID(), percentual: 50, quantidade: 0, valor: 0 }] : 
                    state.adicionais.horasExtras.calculos
                }
              }
            })}
          />
        </div>
        {state.adicionais.horasExtras.ativo && (
          <div className="pl-4 space-y-4">
            {state.adicionais.horasExtras.calculos.map((horaExtra, index) => (
              <div key={horaExtra.id} className="space-y-4 border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Cálculo {index + 1}</h4>
                  {state.adicionais.horasExtras.calculos.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removerHoraExtra(horaExtra.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label>Percentual (%)</Label>
                  <Input
                    type="number"
                    value={horaExtra.percentual}
                    onChange={(e) => atualizarHoraExtra(horaExtra.id, {
                      percentual: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Quantidade de Horas</Label>
                  <Input
                    type="number"
                    value={horaExtra.quantidade}
                    onChange={(e) => atualizarHoraExtra(horaExtra.id, {
                      quantidade: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={adicionarHoraExtra}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Hora Extra
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 