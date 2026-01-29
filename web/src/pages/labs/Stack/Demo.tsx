import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StackFrame {
  id: number;
  methodName: string;
  args: string;
  returnVal?: number;
  status: 'active' | 'waiting' | 'returning';
}

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [frames, setFrames] = useState<StackFrame[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [n, setN] = useState(3);
  
  const isRunningRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      isRunningRef.current = false;
    };
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runFactorial = async () => {
    if (isRunning) return;
    setIsRunning(true);
    isRunningRef.current = true;
    setFrames([]);

    try {
      await factorial(n, 0);
    } catch (e) {
      console.error(e);
    } finally {
      if (mountedRef.current) setIsRunning(false);
      isRunningRef.current = false;
    }
  };

  const factorial = async (num: number, depth: number): Promise<number> => {
    if (!mountedRef.current || !isRunningRef.current) return 0;
    
    // Stack Overflow Check (Simulation)
    if (depth > 5) {
      alert(t('labs.stack.overflow'));
      return 0;
    }

    const frameId = Date.now() + Math.random();
    
    // Push Frame
    setFrames(prev => {
        const newFrames = prev.map(f => ({ ...f, status: 'waiting' as const }));
        return [{ 
            id: frameId, 
            methodName: 'factorial', 
            args: `n=${num}`, 
            status: 'active' 
        }, ...newFrames];
    });

    await delay(800);
    if (!mountedRef.current || !isRunningRef.current) return 0;

    let result = 1;
    if (num <= 1) {
      result = 1;
    } else {
      const childResult = await factorial(num - 1, depth + 1);
      if (!mountedRef.current || !isRunningRef.current) return 0;
      result = num * childResult;
    }

    // Returning
    setFrames(prev => prev.map(f => 
      f.id === frameId ? { ...f, returnVal: result, status: 'returning' } : f
    ));
    await delay(800);
    if (!mountedRef.current || !isRunningRef.current) return 0;

    // Pop Frame
    if (mountedRef.current) {
      setFrames(prev => {
        const newFrames = prev.filter(f => f.id !== frameId);
        // Reactivate top frame
        if (newFrames.length > 0) {
            const [top, ...rest] = newFrames;
            return [{ ...top, status: 'active' }, ...rest];
        }
        return newFrames;
      });
    }

    return result;
  };

  const handleReset = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    setFrames([]);
  };

  const getFrameStyles = (status: 'active' | 'waiting' | 'returning') => {
    switch (status) {
      case 'active':
        return 'border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30';
      case 'returning':
        return 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/30';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <span className="font-mono">factorial(</span>
          <input 
            type="number" 
            value={n}
            onChange={(e) => setN(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-12 px-2 py-1 border rounded text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
            disabled={isRunning}
          />
          <span className="font-mono">)</span>
        </div>
        
        <button
          onClick={runFactorial}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {isRunning ? t('labs.stack.running') : <><Play size={16} /> {t('labs.stack.run')}</>}
        </button>

        <button
          onClick={handleReset}
          disabled={isRunning}
          className="ml-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          title={t('labs.stack.reset')}
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 p-4 md:p-8 flex flex-col-reverse items-center gap-2 overflow-y-auto min-h-[400px] relative">
        <div className="w-full text-center text-gray-300 dark:text-gray-600 font-mono text-sm border-t border-gray-200 dark:border-gray-700 pt-2">{t('labs.stack.bottom')}</div>
        
          {frames.map((frame, index) => (
            <div
              key={frame.id}
              className={`w-full max-w-[16rem] md:w-64 p-4 rounded-lg border-2 shadow-sm transition-all duration-300 relative animate-in slide-in-from-bottom-4 ${getFrameStyles(frame.status)}`}
            >
              <div className="mb-1 md:absolute md:-left-12 md:top-1/2 md:-translate-y-1/2 text-xs font-mono text-gray-400 md:mb-0">
                {t('labs.stack.frame', { index: frames.length - index })}
              </div>
              
              <div className="font-bold text-gray-800 dark:text-gray-200">{frame.methodName}</div>
              <div className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">{frame.args}</div>
              
              {frame.returnVal !== undefined && (
                <div 
                  className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-sm font-mono text-green-600 dark:text-green-400 font-bold animate-in fade-in"
                >
                  return {frame.returnVal};
                </div>
              )}
              
              {frame.status === 'waiting' && (
                <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-900/50 flex items-center justify-center rounded-lg backdrop-blur-[1px]">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border dark:border-gray-600 shadow-sm">{t('labs.stack.waiting')}</span>
                </div>
              )}
            </div>
          ))}

        {frames.length === 0 && !isRunning && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600 pointer-events-none">
                {t('labs.stack.empty')}
            </div>
        )}
      </div>
    </div>
  );
};
