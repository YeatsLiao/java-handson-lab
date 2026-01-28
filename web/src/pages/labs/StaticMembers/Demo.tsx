import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RefreshCw, Box } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Instance {
  id: number;
  count: number;
}

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [instances, setInstances] = useState<Instance[]>([]);
  const [globalCount, setGlobalCount] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeHighlight, setActiveHighlight] = useState<'static' | number | null>(null);

  useEffect(() => {
    setLogs([]);
  }, [t]);

  const createInstance = () => {
    if (instances.length >= 3) {
      setLogs(prev => [...prev, t('labs.staticMembers.maxInstances')]);
      return;
    }
    const newInstance = { id: nextId, count: 0 };
    setInstances(prev => [...prev, newInstance]);
    setNextId(prev => prev + 1);
    setLogs(prev => [...prev, t('labs.staticMembers.newCounter', { id: nextId })]);
  };

  const incrementInstance = (id: number) => {
    setInstances(prev => prev.map(inst => 
      inst.id === id ? { ...inst, count: inst.count + 1 } : inst
    ));
    const instance = instances.find(i => i.id === id);
    if (instance) {
      setLogs(prev => [...prev, t('labs.staticMembers.incrementInstance', { id, value: instance.count + 1 })]);
    }
    setActiveHighlight(id);
    setTimeout(() => setActiveHighlight(null), 500);
  };

  const incrementStatic = () => {
    setGlobalCount(prev => prev + 1);
    setLogs(prev => [...prev, t('labs.staticMembers.incrementStatic', { value: globalCount + 1 })]);
    setActiveHighlight('static');
    setTimeout(() => setActiveHighlight(null), 500);
  };

  const reset = () => {
    setInstances([]);
    setGlobalCount(0);
    setNextId(1);
    setLogs([]);
    setActiveHighlight(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={createInstance}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md active:transform active:scale-95"
        >
          <Plus size={18} /> {t('labs.staticMembers.btnNewCounter')}
        </button>
        <button
          onClick={incrementStatic}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium border border-purple-200"
        >
          <Plus size={18} /> {t('labs.staticMembers.btnIncrementStatic')}
        </button>
        
        <button
          onClick={reset}
          className="ml-auto p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          title="Reset"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px] flex flex-col relative overflow-auto bg-grid-slate-100">
          
          {/* Method Area (Static) */}
          <div className="mb-8">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('labs.staticMembers.methodArea')}</div>
            <motion.div 
              className={`inline-flex items-center gap-4 bg-purple-50 border-2 ${activeHighlight === 'static' ? 'border-purple-500 bg-purple-100 scale-105' : 'border-purple-200'} rounded-xl p-4 transition-all duration-300`}
            >
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center text-purple-700">
                <Box size={20} />
              </div>
              <div>
                <div className="text-xs text-purple-600 font-mono">{t('labs.staticMembers.staticVar')}</div>
                <div className="text-2xl font-bold text-purple-900">{globalCount}</div>
              </div>
            </motion.div>
          </div>

          {/* Heap Area (Instances) */}
          <div className="flex-1 bg-gray-50 rounded-xl border border-dashed border-gray-300 p-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{t('labs.staticMembers.heapMemory')}</div>
            
            <div className="flex flex-wrap gap-4">
              <AnimatePresence>
                {instances.map((inst) => (
                  <motion.div
                    key={inst.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={`bg-white rounded-xl shadow-sm border-2 ${activeHighlight === inst.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-blue-100'} p-4 w-48 transition-all duration-300`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-mono text-sm font-bold text-blue-800">c{inst.id}</div>
                      <div className="text-xs text-gray-400">{t('labs.staticMembers.reference')}</div>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Instance Variable */}
                      <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                        <div className="text-xs text-blue-600 font-mono mb-1">{t('labs.staticMembers.instanceVar')}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-900">{inst.count}</span>
                          <button 
                            onClick={() => incrementInstance(inst.id)}
                            className="p-1 hover:bg-blue-200 rounded text-blue-600 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Static Reference Visualization */}
                      <div className="border-t border-gray-100 pt-2">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                          <span>↳ {t('labs.staticMembers.globalCountLabel')}</span>
                          <span className="font-mono text-purple-600 font-bold">{globalCount}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {instances.length === 0 && (
                <div className="w-full h-32 flex items-center justify-center text-gray-400 italic text-sm">
                  {t('labs.staticMembers.noInstances')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Code & Console Area */}
        <div className="flex flex-col gap-4">
          {/* Code Preview */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-4 font-mono text-sm overflow-hidden">
            <div className="flex gap-1.5 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-1 text-gray-300">
              <div className="text-gray-500">{t('labs.staticMembers.codeComment')}</div>
              <div><span className="text-purple-400">class</span> Counter &#123;</div>
              <div className="pl-4">
                <span className="text-purple-400">static int</span> globalCount = <span className="text-green-300">{globalCount}</span>;
              </div>
              <div className="pl-4">
                <span className="text-purple-400">int</span> count = 0;
              </div>
              <div>&#125;</div>
            </div>
          </div>

          {/* Console Output */}
          <div className="flex-1 bg-black rounded-xl shadow-lg p-4 font-mono text-sm overflow-hidden flex flex-col">
            <div className="text-gray-500 border-b border-gray-800 pb-2 mb-2">{t('labs.staticMembers.console')}</div>
            <div className="flex-1 overflow-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
              {logs.length === 0 && <span className="text-gray-600 italic">{t('labs.staticMembers.ready')}</span>}
              {logs.map((log, index) => (
                <div key={index} className="text-green-400 animate-fade-in">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
