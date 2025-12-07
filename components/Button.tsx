import React from 'react';

interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-slate-700 hover:bg-slate-600 text-white shadow-lg active:scale-95";
      break;
    case 'secondary':
      variantStyles = "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95";
      break;
    case 'accent':
      variantStyles = "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30 shadow-lg active:scale-95";
      break;
    case 'ghost':
        variantStyles = "text-slate-400 hover:text-white hover:bg-slate-800/50";
        break;
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
