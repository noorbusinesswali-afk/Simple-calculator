import React from 'react';
import { Player } from '../types';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
  isHint: boolean;
  disabled: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, isHint, disabled }) => {
  const baseStyle = "h-24 sm:h-32 w-24 sm:w-32 rounded-2xl text-5xl sm:text-6xl font-bold flex items-center justify-center transition-all duration-300 shadow-lg";
  
  let colorStyle = "bg-slate-800 hover:bg-slate-700 text-slate-200";
  if (value === 'X') colorStyle = "bg-slate-800 text-cyan-400 shadow-cyan-900/20";
  if (value === 'O') colorStyle = "bg-slate-800 text-orange-400 shadow-orange-900/20";
  
  if (isWinningSquare) {
    colorStyle = value === 'X' 
      ? "bg-cyan-500 text-white shadow-cyan-500/50 scale-105" 
      : "bg-orange-500 text-white shadow-orange-500/50 scale-105";
  } else if (isHint && !value) {
    colorStyle = "bg-slate-800 border-2 border-dashed border-emerald-500/50 animate-pulse";
  }

  return (
    <button
      className={`${baseStyle} ${colorStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value === 'X' && <i className="fa-solid fa-xmark"></i>}
      {value === 'O' && <i className="fa-regular fa-circle"></i>}
      {isHint && !value && <i className="fa-solid fa-lightbulb text-emerald-500/50 text-2xl"></i>}
    </button>
  );
};
