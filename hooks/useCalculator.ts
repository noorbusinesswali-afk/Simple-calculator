import { useReducer } from 'react';
import { CalculatorAction, CalculatorActionType, CalculatorState } from '../types';

const INITIAL_STATE: CalculatorState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

function evaluate({ currentOperand, previousOperand, operation }: CalculatorState): string {
  const prev = parseFloat(previousOperand || '0');
  const current = parseFloat(currentOperand || '0');
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = 0;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case CalculatorActionType.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload?.digit || null,
          overwrite: false,
        };
      }
      if (action.payload?.digit === '0' && state.currentOperand === '0') return state;
      if (action.payload?.digit === '.' && state.currentOperand?.includes('.')) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload?.digit}`,
      };

    case CalculatorActionType.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload?.operation || null,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload?.operation || null,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload?.operation || null,
        currentOperand: null,
      };

    case CalculatorActionType.CLEAR:
      return INITIAL_STATE;

    case CalculatorActionType.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case CalculatorActionType.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    default:
        return state;
  }
}

export const useCalculator = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return { state, dispatch };
};
