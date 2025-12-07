import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoItem } from './components/TodoItem';
import { Button } from './components/Button';
import { generateSubtasks } from './services/geminiService';

const App: React.FC = () => {
  const { todos, addTodo, addMultipleTodos, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const handleMagicAdd = async () => {
    if (!inputValue.trim() || isGenerating) return;
    
    setIsGenerating(true);
    const tasks = await generateSubtasks(inputValue);
    addMultipleTodos(tasks);
    setInputValue(''); // Clear input after generating
    setIsGenerating(false);
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-2xl flex flex-col h-[90vh]">
        
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Smart Tasks
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'} • {completedCount} completed
            </p>
          </div>
          {completedCount > 0 && (
            <button 
              onClick={clearCompleted}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1 rounded-full border border-slate-800 hover:bg-slate-800"
            >
              Clear Done
            </button>
          )}
        </header>

        {/* Input Area */}
        <div className="bg-slate-900 p-2 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-2 mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="What needs to be done? (or ask AI to plan...)"
            className="flex-grow bg-transparent text-white placeholder-slate-500 px-4 py-3 outline-none"
            disabled={isGenerating}
          />
          
          <button
            onClick={handleMagicAdd}
            disabled={isGenerating || !inputValue.trim()}
            className="p-3 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            title="Generate subtasks with AI"
          >
             {isGenerating ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
          </button>

          <Button 
            label={<i className="fa-solid fa-plus"></i>} 
            onClick={handleAdd}
            disabled={isGenerating || !inputValue.trim()}
            className="rounded-xl px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white min-w-[50px]"
          />
        </div>

        {/* Todo List */}
        <div className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {todos.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 pb-20">
              <i className="fa-regular fa-clipboard text-6xl opacity-20"></i>
              <p>No tasks yet. Add one above!</p>
              <div className="text-xs bg-slate-900/50 p-3 rounded-lg border border-slate-800/50 text-slate-500 max-w-xs text-center">
                <span className="text-indigo-400"><i className="fa-solid fa-lightbulb"></i> Tip:</span> Type a goal like "Weekly Grocery" and click the wand <i className="fa-solid fa-wand-magic-sparkles text-xs"></i> to auto-generate a list.
              </div>
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default App;
