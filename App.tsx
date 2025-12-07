import React, { useState } from 'react';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Square } from './components/Square';
import { Button } from './components/Button';
import { getAiHint } from './services/geminiService';
import { AiHint } from './types';

const App: React.FC = () => {
  const { board, currentPlayer, winState, handleClick, resetGame } = useTicTacToe();
  const [hint, setHint] = useState<AiHint | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const handleGetHint = async () => {
    if (winState || isLoadingHint) return;
    setIsLoadingHint(true);
    setHint(null);
    const result = await getAiHint(board, currentPlayer);
    setHint(result);
    setIsLoadingHint(false);
  };

  const onSquareClick = (index: number) => {
    if (hint) setHint(null); // Clear hint when user plays
    handleClick(index);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
      
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                Tic-Tac-Toe
            </h1>
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
               <span className="text-slate-400 text-sm">Turn:</span>
               {currentPlayer === 'X' ? (
                   <span className="text-cyan-400 font-bold flex items-center gap-1"><i className="fa-solid fa-xmark"></i> Player X</span>
               ) : (
                   <span className="text-orange-400 font-bold flex items-center gap-1"><i className="fa-regular fa-circle"></i> Player O</span>
               )}
            </div>
        </div>

        {/* Board Container */}
        <div className="bg-slate-900/50 p-6 sm:p-8 rounded-[40px] shadow-2xl border border-slate-800 backdrop-blur-sm relative overflow-hidden">
            
            {/* Winner Overlay */}
            {winState && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="text-center space-y-4">
                        {winState.winner === 'Draw' ? (
                            <h2 className="text-4xl font-bold text-slate-300">It's a Draw!</h2>
                        ) : (
                            <>
                                <h2 className="text-2xl text-slate-400">Winner!</h2>
                                <div className={`text-6xl font-bold ${winState.winner === 'X' ? 'text-cyan-400' : 'text-orange-400'}`}>
                                    {winState.winner === 'X' ? <i className="fa-solid fa-xmark"></i> : <i className="fa-regular fa-circle"></i>}
                                </div>
                            </>
                        )}
                        <Button 
                            label="Play Again" 
                            variant="accent" 
                            onClick={resetGame} 
                            className="mt-6 w-40 mx-auto"
                        />
                    </div>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 relative z-0">
                {board.map((cell, index) => (
                    <Square
                        key={index}
                        value={cell}
                        onClick={() => onSquareClick(index)}
                        isWinningSquare={winState?.line?.includes(index) ?? false}
                        isHint={hint?.index === index}
                        disabled={!!winState}
                    />
                ))}
            </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
            <Button 
                label={<><i className="fa-solid fa-rotate-right"></i> Reset</>} 
                onClick={resetGame} 
                variant="secondary"
            />
            <Button 
                label={isLoadingHint ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <><i className="fa-solid fa-wand-magic-sparkles"></i> AI Hint</>}
                onClick={handleGetHint} 
                variant="primary"
                disabled={!!winState || isLoadingHint}
            />
        </div>

        {/* Hint Display */}
        {hint && (
            <div className="mt-6 bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-bottom-2">
                <i className="fa-solid fa-lightbulb text-emerald-400 mt-1"></i>
                <div>
                    <span className="text-emerald-200 font-medium block mb-1">AI Suggestion:</span>
                    <p className="text-emerald-100/80 text-sm leading-relaxed">{hint.reasoning}</p>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default App;
