import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Entry {
  key: string;
  value: string;
  hash: number;
}

const BUCKET_COUNT = 4; // Small number for demo collisions

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [buckets, setBuckets] = useState<Entry[][]>(Array(BUCKET_COUNT).fill([]));
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [log, setLog] = useState<string[]>([]);

  // Initialize log on first render
  React.useEffect(() => {
    setLog([t('labs.hashMap.init')]);
  }, [t]);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  // Simple hash function for demo
  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const put = () => {
    if (!inputKey || !inputValue) return;

    const hash = simpleHash(inputKey);
    const index = hash % BUCKET_COUNT;
    
    addLog(t('labs.hashMap.put', { key: inputKey, value: inputValue, hash, index }));

    setBuckets(prev => {
      const newBuckets = [...prev];
      const bucket = [...newBuckets[index]];
      
      // Check if key exists (update)
      const existingIdx = bucket.findIndex(e => e.key === inputKey);
      if (existingIdx >= 0) {
        addLog(t('labs.hashMap.update', { key: inputKey, oldVal: bucket[existingIdx].value, newVal: inputValue }));
        bucket[existingIdx] = { ...bucket[existingIdx], value: inputValue };
      } else {
        if (bucket.length > 0) {
          addLog(t('labs.hashMap.collision', { index }));
        }
        bucket.push({ key: inputKey, value: inputValue, hash });
      }
      
      newBuckets[index] = bucket;
      return newBuckets;
    });

    setInputKey('');
    setInputValue('');
  };

  const clear = () => {
    setBuckets(Array(BUCKET_COUNT).fill([]));
    setLog([t('labs.hashMap.reset')]);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Input Area */}
      <div className="flex flex-wrap gap-4 items-end bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">{t('labs.hashMap.key')}</label>
          <input
            type="text"
            value={inputKey}
            onChange={e => setInputKey(e.target.value)}
            className="px-3 py-2 border rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="e.g. apple"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">{t('labs.hashMap.value')}</label>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="px-3 py-2 border rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="e.g. 100"
          />
        </div>
        <button
          onClick={put}
          disabled={!inputKey || !inputValue}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} /> {t('labs.hashMap.btnPut')}
        </button>
        <button
          onClick={clear}
          className="ml-auto px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title={t('labs.hashMap.reset')}
        >
        
          <Trash2 size={20} />
        </button>
      </div>

      {/* Visualization Area */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 overflow-y-auto">
        <div className="space-y-4">
          {buckets.map((bucket, i) => (
            <div key={i} className="flex items-center">
              {/* Bucket Index */}
              <div className="w-16 h-12 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 flex items-center justify-center font-mono font-bold text-gray-500 dark:text-gray-400 rounded-l">
                [{i}]
              </div>
              
              {/* Chain */}
              <div className="flex-1 flex items-center p-2 border-t border-b border-r border-gray-100 dark:border-gray-700 min-h-[3rem] overflow-x-auto gap-2 bg-gray-50/50 dark:bg-gray-800/50 rounded-r">
                <AnimatePresence>
                  {bucket.map((entry, idx) => (
                    <motion.div
                      key={entry.key}
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      className="flex items-center"
                    >
                      {/* Entry Box */}
                      <div className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded text-sm shadow-sm">
                        <span className="font-bold text-purple-700 dark:text-purple-300">{entry.key}</span>
                        <span className="mx-1 text-purple-400 dark:text-purple-500">=</span>
                        <span className="text-purple-900 dark:text-purple-200">{entry.value}</span>
                      </div>
                      
                      {/* Arrow if not last */}
                      {idx < bucket.length - 1 && (
                        <div className="mx-1 text-gray-400 dark:text-gray-600">→</div>
                      )}
                    </motion.div>
                  ))}
                  {bucket.length === 0 && <span className="text-gray-300 dark:text-gray-600 text-xs italic ml-2">null</span>}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 h-40 overflow-y-auto">
        <div className="space-y-1">
          {log.map((entry, i) => (
            <div key={i}>&gt; {entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
