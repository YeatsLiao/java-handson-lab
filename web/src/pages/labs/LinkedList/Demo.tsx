import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Node {
  id: number;
  value: number;
}

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [nextId, setNextId] = useState(1);
  const [log, setLog] = useState<string[]>([]);

  // Initialize log
  React.useEffect(() => {
    setLog([t('labs.linkedList.init')]);
  }, [t]);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const addFirst = () => {
    const newNode = { id: nextId, value: Math.floor(Math.random() * 100) };
    setNextId(prev => prev + 1);
    setNodes(prev => [newNode, ...prev]);
    addLog(t('labs.linkedList.addFirst', { val: newNode.value }));
  };

  const addLast = () => {
    const newNode = { id: nextId, value: Math.floor(Math.random() * 100) };
    setNextId(prev => prev + 1);
    setNodes(prev => [...prev, newNode]);
    addLog(t('labs.linkedList.addLast', { val: newNode.value }));
  };

  const removeFirst = () => {
    if (nodes.length === 0) return;
    const val = nodes[0].value;
    setNodes(prev => prev.slice(1));
    addLog(t('labs.linkedList.removeFirst', { val }));
  };

  const removeLast = () => {
    if (nodes.length === 0) return;
    const val = nodes[nodes.length - 1].value;
    setNodes(prev => prev.slice(0, -1));
    addLog(t('labs.linkedList.removeLast', { val }));
  };

  const clear = () => {
    setNodes([]);
    setLog([t('labs.linkedList.reset')]);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button onClick={addFirst} className="btn-primary flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus size={16} /> {t('labs.linkedList.btnAddFirst')}
          </button>
          <button onClick={addLast} className="btn-primary flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus size={16} /> {t('labs.linkedList.btnAddLast')}
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={removeFirst} disabled={nodes.length === 0} className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50">
            {t('labs.linkedList.btnRemoveFirst')}
          </button>
          <button onClick={removeLast} disabled={nodes.length === 0} className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50">
            {t('labs.linkedList.btnRemoveLast')}
          </button>
        </div>
        <button onClick={clear} className="ml-auto px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Trash2 size={20} />
        </button>
      </div>

      {/* Visualization Area */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm min-h-[200px] overflow-x-auto">
          <div className="flex items-center min-w-full py-8">
            <div className="mr-4 font-bold text-gray-400 dark:text-gray-500">{t('labs.linkedList.head')}</div>
          
          <AnimatePresence mode="popLayout">
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                layout
                initial={{ scale: 0, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                className="flex items-center"
              >
                {/* Node Box */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-12 border-2 border-blue-500 dark:border-blue-400 rounded bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 relative group">
                    {node.value}
                    {/* Tooltip for Prev/Next */}
                    <div className="absolute -top-8 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {t('labs.linkedList.prevNext', {
                        prev: index > 0 ? nodes[index-1].value : 'null',
                        next: index < nodes.length - 1 ? nodes[index+1].value : 'null'
                      })}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{t('labs.linkedList.node')}</div>
                </div>

                {/* Arrow */}
                {index < nodes.length - 1 && (
                  <div className="mx-2 flex flex-col items-center text-gray-400">
                    <ArrowRight size={16} />
                    <ArrowLeft size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {nodes.length > 0 && <div className="ml-4 font-bold text-gray-400">TAIL</div>}
          {nodes.length === 0 && <div className="text-gray-400 italic">{t('labs.common.empty')}</div>}
        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 h-48 overflow-y-auto">
        <div className="space-y-1">
          {log.map((entry, i) => (
            <div key={i}>&gt; {entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
