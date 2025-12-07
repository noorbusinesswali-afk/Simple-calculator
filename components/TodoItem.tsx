import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-200 border ${
      todo.completed 
        ? 'bg-slate-900/30 border-slate-800/50 opacity-60' 
        : 'bg-slate-800/80 border-slate-700 hover:border-indigo-500/30 shadow-sm'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-slate-500 hover:border-indigo-400'
        }`}
      >
        {todo.completed && <i className="fa-solid fa-check text-xs"></i>}
      </button>

      <span className={`flex-grow font-medium transition-all ${
        todo.completed ? 'line-through text-slate-500' : 'text-slate-200'
      }`}>
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-500 hover:text-red-400 hover:bg-slate-700/50 rounded-lg"
        aria-label="Delete task"
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};
