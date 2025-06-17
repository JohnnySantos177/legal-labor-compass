import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormContractData {
  daysWorked: number;
  monthsWorked: number;
  fixedTermContract: boolean;
  noticePeriodFulfilled: boolean;
  fgtsDeposited: boolean;
  admissionDate: string;
  terminationDate: string;
  baseSalary: number;
  terminationType: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | '';
}

interface ContractDataFormProps {
  data: FormContractData;
  onUpdate: <K extends keyof FormContractData>(field: K, value: FormContractData[K]) => void;
}

export function ContractDataForm({ data, onUpdate }: ContractDataFormProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Dados do Contrato</h3>
      <div className="space-y-4">
        {/* Salário Base */}
        <div>
          <Label htmlFor="baseSalary">Salário</Label>
          <Input
            id="baseSalary"
            type="text"
            inputMode="decimal"
            value={data.baseSalary || ''}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              onUpdate('baseSalary', parseInt(value));
            }}
            placeholder="0,00"
          />
        </div>

        {/* Data de Admissão */}
        <div>
          <Label htmlFor="admissionDate">Data de Admissão</Label>
          <Input
            id="admissionDate"
            type="date"
            value={data.admissionDate}
            onChange={(e) => onUpdate('admissionDate', e.target.value)}
          />
        </div>

        {/* Data de Demissão */}
        <div>
          <Label htmlFor="terminationDate">Data de Demissão</Label>
          <Input
            id="terminationDate"
            type="date"
            value={data.terminationDate}
            onChange={(e) => onUpdate('terminationDate', e.target.value)}
          />
        </div>

        {/* Tipo de Rescisão */}
        <div>
          <Label htmlFor="terminationType">Tipo de Rescisão</Label>
          <Select 
            value={data.terminationType}
            onValueChange={(value: 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | '') => 
              onUpdate('terminationType', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de rescisão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sem_justa_causa">Dispensa sem Justa Causa</SelectItem>
              <SelectItem value="justa_causa">Dispensa por Justa Causa</SelectItem>
              <SelectItem value="pedido_demissao">Pedido de Demissão</SelectItem>
              <SelectItem value="acordo_mutuo">Acordo Mútuo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dias Trabalhados */}
        <div>
          <Label htmlFor="daysWorked">Dias Trabalhados no Último Mês</Label>
          <Input
            id="daysWorked"
            type="number"
            value={data.daysWorked}
            onChange={(e) => onUpdate('daysWorked', parseInt(e.target.value))}
            disabled
          />
        </div>

        {/* Meses Trabalhados */}
        <div>
          <Label htmlFor="monthsWorked">Total de Meses Trabalhados</Label>
          <Input
            id="monthsWorked"
            type="number"
            value={data.monthsWorked}
            onChange={(e) => onUpdate('monthsWorked', parseInt(e.target.value))}
            disabled
          />
        </div>

        {/* Contrato por Tempo Determinado */}
        <div className="flex items-center justify-between">
          <Label htmlFor="fixedTermContract">Contrato por Tempo Determinado</Label>
          <Switch
            id="fixedTermContract"
            checked={data.fixedTermContract}
            onCheckedChange={(checked) => onUpdate('fixedTermContract', checked)}
          />
        </div>

        {/* Aviso Prévio Cumprido */}
        <div className="flex items-center justify-between">
          <Label htmlFor="noticePeriodFulfilled">Aviso Prévio Cumprido</Label>
          <Switch
            id="noticePeriodFulfilled"
            checked={data.noticePeriodFulfilled}
            onCheckedChange={(checked) => onUpdate('noticePeriodFulfilled', checked)}
          />
        </div>

        {/* FGTS Depositado */}
        <div className="flex items-center justify-between">
          <Label htmlFor="fgtsDeposited">FGTS Depositado</Label>
          <Switch
            id="fgtsDeposited"
            checked={data.fgtsDeposited}
            onCheckedChange={(checked) => onUpdate('fgtsDeposited', checked)}
          />
        </div>
      </div>
    </div>
  );
}
