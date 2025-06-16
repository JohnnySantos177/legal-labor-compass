
import { formatCurrency } from '@/utils/format';

interface CalculationSectionProps {
  title: string;
  items: Array<{
    label: string;
    value: number;
    isSubItem?: boolean;
  }>;
}

export function CalculationSection({ title, items }: CalculationSectionProps) {
  const validItems = items.filter(item => item.value > 0);
  
  if (validItems.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {validItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex justify-between ${item.isSubItem ? 'pl-4 text-sm text-gray-600' : ''}`}
          >
            <span>{item.label}:</span>
            <span>{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
