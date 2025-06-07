
import { ContractData } from '@/types/calculadora';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ContractDataFormProps {
  data: ContractData;
  onUpdate: (field: keyof ContractData, value: any) => void;
}

export const ContractDataForm = ({ data, onUpdate }: ContractDataFormProps) => {
  return (
    <Card className="juriscalc-card">
      <CardHeader>
        <CardTitle className="text-juriscalc-navy">Dados do Contrato</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="admissionDate" className="juriscalc-label">Data de Admissão</Label>
            <Input
              id="admissionDate"
              type="date"
              value={data.admissionDate}
              onChange={(e) => onUpdate('admissionDate', e.target.value)}
              className="juriscalc-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="terminationDate" className="juriscalc-label">Data de Demissão</Label>
            <Input
              id="terminationDate"
              type="date"
              value={data.terminationDate}
              onChange={(e) => onUpdate('terminationDate', e.target.value)}
              className="juriscalc-input"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="baseSalary" className="juriscalc-label">Salário Base (R$)</Label>
          <Input
            id="baseSalary"
            type="number"
            step="0.01"
            value={data.baseSalary}
            onChange={(e) => onUpdate('baseSalary', parseFloat(e.target.value) || 0)}
            className="juriscalc-input"
            placeholder="0,00"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="juriscalc-label">Tipo de Rescisão</Label>
          <Select value={data.terminationType} onValueChange={(value) => onUpdate('terminationType', value)}>
            <SelectTrigger className="juriscalc-input">
              <SelectValue placeholder="Selecione o tipo de rescisão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dismissal">Demissão sem justa causa</SelectItem>
              <SelectItem value="resignation">Pedido de demissão</SelectItem>
              <SelectItem value="mutual">Demissão por acordo</SelectItem>
              <SelectItem value="just_cause">Demissão por justa causa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthsWorked" className="juriscalc-label">Meses Trabalhados</Label>
            <Input
              id="monthsWorked"
              type="number"
              value={data.monthsWorked}
              onChange={(e) => onUpdate('monthsWorked', parseInt(e.target.value) || 0)}
              className="juriscalc-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="daysWorked" className="juriscalc-label">Dias Avulsos</Label>
            <Input
              id="daysWorked"
              type="number"
              value={data.daysWorked}
              onChange={(e) => onUpdate('daysWorked', parseInt(e.target.value) || 0)}
              className="juriscalc-input"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="noticePeriodFulfilled"
              checked={data.noticePeriodFulfilled}
              onCheckedChange={(checked) => onUpdate('noticePeriodFulfilled', checked)}
            />
            <Label htmlFor="noticePeriodFulfilled" className="juriscalc-label">
              Aviso prévio cumprido
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fgtsDeposited"
              checked={data.fgtsDeposited}
              onCheckedChange={(checked) => onUpdate('fgtsDeposited', checked)}
            />
            <Label htmlFor="fgtsDeposited" className="juriscalc-label">
              FGTS depositado
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fixedTermContract"
              checked={data.fixedTermContract}
              onCheckedChange={(checked) => onUpdate('fixedTermContract', checked)}
            />
            <Label htmlFor="fixedTermContract" className="juriscalc-label">
              Contrato a prazo determinado
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
