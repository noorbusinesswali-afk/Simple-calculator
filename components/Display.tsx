import React from 'react';

interface DisplayProps {
  previousOperand: string | null;
  currentOperand: string | null;
  operation: string | null;
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatOperand(operand: string | null): string {
  if (operand == null) return '';
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
  return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
}

export const Display: React.FC<DisplayProps> = ({ previousOperand, currentOperand, operation }) => {
  return (
    <div className="w-full bg-black/40 rounded-3xl p-6 mb-4 flex flex-col items-end justify-end h-32 sm:h-40 break-all shadow-inner border border-slate-700/50 backdrop-blur-sm">
      <div className="text-slate-400 text-lg sm:text-xl font-light h-8">
        {formatOperand(previousOperand)} {operation}
      </div>
      <div className="text-white text-5xl sm:text-6xl font-light tracking-tight mt-1">
        {formatOperand(currentOperand) || (previousOperand ? '' : '0')}
      </div>
    </div>
  );
};
