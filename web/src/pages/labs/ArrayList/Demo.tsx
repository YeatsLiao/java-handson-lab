import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

export const Demo: React.FC = () => {
  const [capacity, setCapacity] = useState(4);
  const [elements, setElements] = useState<number[]>([]);
  const [isResizing, setIsResizing] = useState(false);
  const [log, setLog] = useState<string[]>(['初始化 ArrayList, 默认容量: 4']);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const addElement = async () => {
    if (isResizing) return;

    if (elements.length >= capacity) {
      setIsResizing(true);
      const newCapacity = capacity + (capacity >> 1); // 1.5x
      addLog(`容量不足 (${capacity})，触发扩容 -> ${newCapacity}`);
      
      // Simulate delay for resizing animation
      setTimeout(() => {
        setCapacity(newCapacity);
        setIsResizing(false);
        const newValue = Math.floor(Math.random() * 100);
        setElements(prev => [...prev, newValue]);
        addLog(`扩容完成，添加元素: ${newValue}`);
      }, 1500);
    } else {
      const newValue = Math.floor(Math.random() * 100);
      setElements(prev => [...prev, newValue]);
      addLog(`添加元素: ${newValue}, 当前大小: ${elements.length + 1}/${capacity}`);
    }
  };

  const clear = () => {
    setCapacity(4);
    setElements([]);
    setLog(['重置 ArrayList, 容量: 4']);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={addElement}
          disabled={isResizing}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
            isResizing ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isResizing ? <RefreshCw className="animate-spin" size={20} /> : <Plus size={20} />}
          {isResizing ? '正在扩容...' : '添加元素 (Add)'}
        </button>
        <button
          onClick={clear}
          disabled={isResizing}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          <Trash2 size={20} />
          重置 (Reset)
        </button>
      </div>

      {/* Visualization Area */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[200px] flex flex-col justify-center">
        <div className="mb-4 flex justify-between text-sm text-gray-500">
          <span>Size: {elements.length}</span>
          <span>Capacity: {capacity}</span>
        </div>
        
        <div className="relative">
          {/* Array Container */}
          <div 
            className="flex border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-500"
            style={{ width: `${Math.min(capacity * 60, 100)}%`, maxWidth: '100%' }}
          >
            {/* Slots */}
            {Array.from({ length: capacity }).map((_, index) => {
              const hasElement = index < elements.length;
              return (
                <div
                  key={index}
                  className={`flex-1 h-16 border-r border-gray-200 last:border-r-0 flex items-center justify-center text-lg font-bold transition-colors duration-300 ${
                    hasElement ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-300'
                  }`}
                >
                  <AnimatePresence mode="popLayout">
                    {hasElement && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        {elements[index]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          
          {/* Resizing Indicator */}
          {isResizing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-20 left-0 w-full text-center text-orange-500 font-bold"
            >
              正在创建新数组 (Capacity: {capacity + (capacity >> 1)})...
            </motion.div>
          )}
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
