import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Square as SquareIcon, Play, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ShapeType = 'circle' | 'square' | null;

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [shape, setShape] = useState<ShapeType>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const createShape = (type: 'circle' | 'square') => {
    setShape(type);
    const typeClass = type === 'circle' ? 'Circle' : 'Square';
    setLogs(prev => [...prev, t('labs.polymorphism.newShape', { type: typeClass })]);
    setActiveCode('instantiate');
    setTimeout(() => setActiveCode(null), 1000);
  };

  const callDraw = () => {
    if (!shape) {
      setLogs(prev => [...prev, t('labs.polymorphism.errorNull')]);
      return;
    }
    setActiveCode('draw');
    const typeClass = shape === 'circle' ? 'Circle' : 'Square';
    setLogs(prev => [...prev, t('labs.polymorphism.drawCall', { type: typeClass })]);
    setTimeout(() => setActiveCode(null), 1000);
  };

  const reset = () => {
    setShape(null);
    setLogs([]);
    setActiveCode(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={() => createShape('circle')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
        >
          <Circle size={18} /> {t('labs.polymorphism.btnCircle')}
        </button>
        <button
          onClick={() => createShape('square')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
        >
          <SquareIcon size={18} /> {t('labs.polymorphism.btnSquare')}
        </button>
        <div className="w-px h-8 bg-gray-300 mx-2"></div>
        <button
          onClick={callDraw}
          disabled={!shape}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
            shape 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Play size={18} /> {t('labs.polymorphism.btnDraw')}
        </button>
        <button
          onClick={reset}
          className="ml-auto p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          title={t('labs.common.reset')}
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-sm font-semibold text-gray-500">{t('labs.polymorphism.heap')}</div>
          
          <AnimatePresence mode="wait">
            {shape ? (
              <motion.div
                key={shape}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative"
              >
                <div className={`w-32 h-32 flex items-center justify-center text-white text-xl font-bold shadow-xl ${
                  shape === 'circle' ? 'rounded-full bg-purple-500' : 'rounded-xl bg-indigo-500'
                }`}>
                  {shape === 'circle' ? 'Circle' : 'Square'}
                </div>
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  @{Math.random().toString(16).substr(2, 6)}
                </motion.div>
              </motion.div>
            ) : (
              <div className="text-gray-400 text-center">
                <div className="mb-2">null</div>
                <div className="text-sm">{t('labs.polymorphism.noObject')}</div>
              </div>
            )}
          </AnimatePresence>

          {/* Reference Line */}
          <div className="absolute left-8 bottom-8 flex items-center gap-2 font-mono text-sm">
            <div className="bg-yellow-100 px-2 py-1 rounded border border-yellow-200 text-yellow-800">
              {t('labs.polymorphism.shapeRef')}
            </div>
            <div className="text-gray-400">──➤</div>
            <div className={`px-2 py-1 rounded border ${shape ? 'bg-green-100 border-green-200 text-green-800' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
              {shape ? t('labs.polymorphism.object') : 'null'}
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
              <div className="text-gray-500">{t('labs.polymorphism.commentExample')}</div>
              <div><span className="text-purple-400">Shape</span> s;</div>
              <div className={`${activeCode === 'instantiate' ? 'bg-blue-500/30 -mx-4 px-4 py-1' : ''} transition-colors duration-300`}>
                s = <span className="text-blue-400">new</span> <span className="text-yellow-300">{shape === 'circle' ? 'Circle' : shape === 'square' ? 'Square' : '...'}</span>();
              </div>
              <div className={`${activeCode === 'draw' ? 'bg-blue-500/30 -mx-4 px-4 py-1' : ''} transition-colors duration-300`}>
                s.<span className="text-blue-300">draw</span>(); <span className="text-gray-500">{t('labs.polymorphism.commentBinding')}</span>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <div className="flex-1 bg-black rounded-xl shadow-lg p-4 font-mono text-sm overflow-hidden flex flex-col">
            <div className="text-gray-500 border-b border-gray-800 pb-2 mb-2">{t('labs.polymorphism.console')}</div>
            <div className="flex-1 overflow-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
              {logs.length === 0 && <span className="text-gray-600 italic">{t('labs.polymorphism.ready')}</span>}
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
