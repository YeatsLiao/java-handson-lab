import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock, Lock, CheckCircle, Power } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ThreadState = 'NEW' | 'RUNNABLE' | 'BLOCKED' | 'WAITING' | 'TIMED_WAITING' | 'TERMINATED';

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<ThreadState>('NEW');
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    setLog([t('labs.threads.logCreated')]);
  }, [t]);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const transitions = {
    start: () => {
      if (state === 'NEW') {
        setState('RUNNABLE');
        addLog(t('labs.threads.logStart'));
      }
    },
    wait: () => {
      if (state === 'RUNNABLE') {
        setState('WAITING');
        addLog(t('labs.threads.logWait'));
      }
    },
    notify: () => {
      if (state === 'WAITING') {
        setState('RUNNABLE');
        addLog(t('labs.threads.logNotify'));
      }
    },
    sleep: () => {
      if (state === 'RUNNABLE') {
        setState('TIMED_WAITING');
        addLog(t('labs.threads.logSleep'));
        setTimeout(() => {
          setState(s => s === 'TIMED_WAITING' ? 'RUNNABLE' : s);
          addLog(t('labs.threads.logTimeUp'));
        }, 2000);
      }
    },
    sync: () => {
      if (state === 'RUNNABLE') {
        setState('BLOCKED');
        addLog(t('labs.threads.logSync'));
      }
    },
    acquire: () => {
      if (state === 'BLOCKED') {
        setState('RUNNABLE');
        addLog(t('labs.threads.logAcquire'));
      }
    },
    finish: () => {
      if (state === 'RUNNABLE') {
        setState('TERMINATED');
        addLog(t('labs.threads.logFinish'));
      }
    },
    reset: () => {
      setState('NEW');
      setLog([t('labs.threads.logReset')]);
    }
  };

  const getStateColor = (s: ThreadState) => {
    switch (s) {
      case 'NEW': return 'bg-gray-100 text-gray-600 border-gray-300';
      case 'RUNNABLE': return 'bg-green-100 text-green-700 border-green-400 shadow-green-200';
      case 'BLOCKED': return 'bg-red-100 text-red-700 border-red-300';
      case 'WAITING': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'TIMED_WAITING': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'TERMINATED': return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <button onClick={transitions.start} disabled={state !== 'NEW'} className="btn-control bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded flex items-center gap-1">
          <Play size={16} /> start()
        </button>
        
        <button onClick={transitions.wait} disabled={state !== 'RUNNABLE'} className="btn-control bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded flex items-center gap-1">
          <Pause size={16} /> wait()
        </button>
        
        <button onClick={transitions.notify} disabled={state !== 'WAITING'} className="btn-control bg-green-600 text-white hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded flex items-center gap-1">
          <Play size={16} /> notify()
        </button>
        
        <button onClick={transitions.sleep} disabled={state !== 'RUNNABLE'} className="btn-control bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded flex items-center gap-1">
          <Clock size={16} /> sleep()
        </button>
        
        <button onClick={transitions.sync} disabled={state !== 'RUNNABLE'} className="btn-control bg-red-500 text-white hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded flex items-center gap-1">
          <Lock size={16} /> Block
        </button>
        
        <button onClick={transitions.acquire} disabled={state !== 'BLOCKED'} className="btn-control bg-green-600 text-white hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded flex items-center gap-1">
          <CheckCircle size={16} /> Acquire
        </button>

        <button onClick={transitions.finish} disabled={state !== 'RUNNABLE'} className="btn-control bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded flex items-center gap-1">
          <Power size={16} /> Finish
        </button>

        <button onClick={transitions.reset} className="ml-auto px-3 py-1.5 text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
          Reset
        </button>
      </div>

      {/* Visualization */}
      <div className="flex-1 bg-white p-4 md:p-8 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center relative overflow-auto">
        <div className="relative w-full max-w-2xl h-80">
          
          {/* Central State Display */}
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
                key={state}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-48 h-48 rounded-full flex flex-col items-center justify-center border-4 shadow-xl transition-colors duration-500 z-10 ${getStateColor(state)}`}
             >
                <div className="text-3xl font-bold">{state}</div>
                <div className="text-xs mt-2 opacity-80">{t('labs.threads.currentState')}</div>
             </motion.div>
          </div>

          {/* Background Connections (Simplified for visual effect) */}
          <svg className="absolute inset-0 w-full h-full text-gray-200 pointer-events-none" style={{ zIndex: 0 }}>
             <circle cx="50%" cy="50%" r="40%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 h-32 overflow-y-auto">
        <div className="space-y-1">
          {log.map((entry, i) => (
            <div key={i}>&gt; {entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
