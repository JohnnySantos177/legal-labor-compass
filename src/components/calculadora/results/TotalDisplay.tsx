
import { formatCurrency } from '@/utils/format';

interface TotalDisplayProps {
  total: number;
}

export function TotalDisplay({ total }: TotalDisplayProps) {
  return (
    <div className="pt-4 border-t border-gray-200">
      <div className="flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
