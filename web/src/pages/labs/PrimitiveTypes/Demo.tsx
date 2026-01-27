import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface StackVar {
  id: string;
  type: string;
  name: string;
  value: string;
  color: string;
}

const COLORS: Record<string, string> = {
  int: 'bg-blue-100 border-blue-200 text-blue-800',
  double: 'bg-green-100 border-green-200 text-green-800',
  boolean: 'bg-purple-100 border-purple-200 text-purple-800',
  char: 'bg-orange-100 border-orange-200 text-orange-800',
  long: 'bg-indigo-100 border-indigo-200 text-indigo-800',
};

export const Demo: React.FC = () => {
  const [variables, setVariables] = useState<StackVar[]>([]);
  const [selectedType, setSelectedType] = useState('int');
  const [varName, setVarName] = useState('a');
  const [varValue, setVarValue] = useState('10');

  const addVariable = () => {
    if (!varName || !varValue) return;
    
    // Prevent duplicate names
    if (variables.some(v => v.name === varName)) {
      alert(`变量名 ${varName} 已存在！`);
      return;
    }

    const newVar: StackVar = {
      id: Date.now().toString(),
      type: selectedType,
      name: varName,
      value: varValue,
      color: COLORS[selectedType] || 'bg-gray-100',
    };

    setVariables(prev => [newVar, ...prev]); // Add to top (Stack push simulation)
    
    // Auto increment name for convenience
    setVarName(prev => String.fromCharCode(prev.charCodeAt(0) + 1));
  };

  const clearStack = () => {
    setVariables([]);
    setVarName('a');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
          代码控制台
        </h3>
        <div className="flex flex-wrap items-end gap-3 font-mono text-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Type</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            >
              {Object.keys(COLORS).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Name</label>
            <input 
              type="text" 
              value={varName}
              onChange={(e) => setVarName(e.target.value)}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="x"
            />
          </div>

          <div className="pb-2 text-gray-400 font-bold">=</div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Value</label>
            <input 
              type="text" 
              value={varValue}
              onChange={(e) => setVarValue(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="10"
            />
          </div>

          <div className="pb-2 text-gray-400 font-bold">;</div>

          <button 
            onClick={addVariable}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus size={16} /> 声明变量
          </button>

          <button 
            onClick={clearStack}
            className="ml-auto px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="清空栈帧"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex justify-center items-end overflow-hidden relative">
        <div className="absolute top-4 left-4 text-gray-400 font-bold text-sm tracking-widest">
          STACK MEMORY (LIFO)
        </div>

        <div className="w-full max-w-md flex flex-col-reverse gap-2 pb-8">
            {variables.map((v) => (
              <div
                key={v.id}
                className={`p-4 rounded-xl border flex justify-between items-center shadow-sm ${v.color} animate-in slide-in-from-top-4 duration-300`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold">{v.type}</span>
                  <span className="font-mono">{v.name}</span>
                </div>
                <div className="font-mono font-bold bg-white/50 px-2 py-1 rounded">
                  {v.value}
                </div>
              </div>
            ))}
          
          {variables.length === 0 && (
            <div className="text-center text-gray-300 py-12 border-2 border-dashed border-gray-200 rounded-xl">
              栈内存为空
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
