export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface AiTaskResponse {
  tasks: string[];
}

export type Player = 'X' | 'O' | null;

export interface WinState {
  winner: Player | 'Draw';
  line: number[] | null;
}

export interface CalculatorState {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
}

export enum CalculatorActionType {
  ADD_DIGIT = 'ADD_DIGIT',
  CHOOSE_OPERATION = 'CHOOSE_OPERATION',
  CLEAR = 'CLEAR',
  DELETE_DIGIT = 'DELETE_DIGIT',
  EVALUATE = 'EVALUATE'
}

export interface CalculatorAction {
  type: CalculatorActionType;
  payload?: {
    digit?: string;
    operation?: string;
  };
}