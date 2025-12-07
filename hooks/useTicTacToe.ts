import { useState, useCallback } from 'react';
import { Player, WinState } from '../types';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export const useTicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const calculateWinner = useCallback((currentBoard: Player[]): WinState | null => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line };
      }
    }
    if (!currentBoard.includes(null)) {
      return { winner: 'Draw', line: null };
    }
    return null;
  }, []);

  const winState = calculateWinner(board);

  const handleClick = (index: number) => {
    if (board[index] || winState) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return {
    board,
    xIsNext,
    currentPlayer: (xIsNext ? 'X' : 'O') as Player,
    winState,
    handleClick,
    resetGame
  };
};