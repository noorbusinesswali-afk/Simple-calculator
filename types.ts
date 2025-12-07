export type Player = 'X' | 'O' | null;

export interface WinState {
  winner: Player | 'Draw';
  line: number[] | null;
}

export interface GameState {
  board: Player[];
  xIsNext: boolean;
  winState: WinState | null;
  history: Player[][];
}

export interface AiHint {
  index: number;
  reasoning: string;
}

export enum CalculatorActionType {
  ADD_DIGIT = 'ADD_DIGIT',
  CHOOSE_OPERATION = 'CHOOSE_OPERATION',
  CLEAR = 'CLEAR',
  DELETE_DIGIT = 'DELETE_DIGIT',
  EVALUATE = 'EVALUATE',
}

export interface CalculatorState {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
}

export interface CalculatorAction {
  type: CalculatorActionType;
  payload?: {
    digit?: string;
    operation?: string;
  };
}