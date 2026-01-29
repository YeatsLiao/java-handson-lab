import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StackVar {
  id: string;
  type: string;
  name: string;
  value: string;
  color: string;
}

const COLORS: Record<string, string> = {
  int: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
  double: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  boolean: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300',
  char: 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300',
  long: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300',
};

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [variables, setVariables] = useState<StackVar[]>([]);
  const [selectedType, setSelectedType] = useState('int');
  const [varName, setVarName] = useState('a');
  const [varValue, setVarValue] = useState('10');

  const addVariable = () => {
    if (!varName || !varValue) return;
    
    // Prevent duplicate names
    if (variables.some(v => v.name === varName)) {
      alert(t('labs.demo.varExists', { name: varName }));
      return;
    }

    const newVar: StackVar = {
      id: Date.now().toString(),
      type: selectedType,
      name: varName,
      value: varValue,
      color: COLORS[selectedType] || 'bg-gray-100 dark:bg-gray-700',
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
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          {t('labs.common.codeConsole')}
        </h3>
        <div className="flex flex-wrap items-end gap-3 font-mono text-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 dark:text-gray-500">{t('labs.demo.type')}</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            >
              {Object.keys(COLORS).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          
          <div className="flex items-end gap-2 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 dark:text-gray-500">{t('labs.demo.name')}</label>
              <input 
                type="text" 
                value={varName}
                onChange={(e) => setVarName(e.target.value)}
                className="w-20 px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                placeholder="x"
              />
            </div>

            <div className="pb-3 text-gray-400 font-bold">=</div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 dark:text-gray-500">{t('labs.demo.value')}</label>
              <input 
                type="text" 
                value={varValue}
                onChange={(e) => setVarValue(e.target.value)}
                className="w-24 px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                placeholder="10"
              />
            </div>

            <div className="pb-3 text-gray-400 font-bold">;</div>
          </div>

          <button 
            onClick={addVariable}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus size={16} /> {t('labs.demo.declare')}
          </button>

          <button 
            onClick={clearStack}
            className="ml-auto px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title={t('labs.demo.clear')}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex justify-center items-end overflow-hidden relative">
        <div className="absolute top-4 left-4 text-gray-400 dark:text-gray-500 font-bold text-sm tracking-widest">
          {t('labs.common.stack')} (LIFO)
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
                <div className="font-mono font-bold bg-white/50 dark:bg-black/20 px-2 py-1 rounded">
                  {v.value}
                </div>
              </div>
            ))}
          
          {variables.length === 0 && (
            <div className="text-center text-gray-300 dark:text-gray-600 py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
              {t('labs.common.empty')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
