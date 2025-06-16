import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CalculationSectionProps {
  title: string;
  items: Array<{
    label: string;
    value: number;
    icon?: ReactNode;
  }>;
  icon?: ReactNode;
  className?: string;
}

export function CalculationSection({ title, items, icon, className }: CalculationSectionProps) {
  return (
    <div className={cn("rounded-lg p-4", className)}>
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => 
          item.value > 0 && (
            <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
              <Badge className="bg-blue-600 text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.value)}
              </Badge>
            </div>
          )
        )}
      </div>
    </div>
  );
}
