import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Unlock, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false); // Mode
  const [isRunning, setIsRunning] = useState(false);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  
  // Refs for simulation loop
  const countRef = useRef(0);
  const isLockedRef = useRef(false);
  const runningRef = useRef(false);

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  const runSimulation = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setIsRunning(true);
    setCount(0);
    countRef.current = 0;

    // Simulate 2 threads: T1 and T2
    let t1Ops = 0;
    let t2Ops = 0;

    const interval = setInterval(() => {
      if (t1Ops >= 10 && t2Ops >= 10) {
        clearInterval(interval);
        runningRef.current = false;
        setIsRunning(false);
        setActiveThread(null);
        return;
      }

      // Randomly pick a thread to execute
      const pickT1 = Math.random() > 0.5;
      
      if ((pickT1 && t1Ops < 10) || t2Ops >= 10) {
        // T1 runs
        setActiveThread('T1');
        t1Ops++;
        simulateIncrement();
      } else {
        // T2 runs
        setActiveThread('T2');
        t2Ops++;
        simulateIncrement();
      }

    }, 200);
  };

  const simulateIncrement = () => {
    if (isLockedRef.current) {
      // Safe: Read current, increment, write
      countRef.current += 1;
      setCount(countRef.current);
    } else {
      // Unsafe: Race condition simulation
      // With some probability, the read value is stale if we were doing real parallelism.
      // Since JS is single threaded, we simulate the EFFECT of race condition.
      // In a real race, updates get lost. 
      // We simulate a lost update with 30% chance if not locked.
      const lostUpdate = Math.random() < 0.3;
      if (!lostUpdate) {
        countRef.current += 1;
      }
      setCount(countRef.current);
    }
  };

  const reset = () => {
    setCount(0);
    countRef.current = 0;
    setIsRunning(false);
    setActiveThread(null);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-sm font-bold text-gray-700">{t('labs.locks.mode')}</label>
          <button
            onClick={() => { setIsLocked(!isLocked); reset(); }}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors ${
              isLocked 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
            {isLocked ? t('labs.locks.safe') : t('labs.locks.unsafe')}
          </button>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="md:ml-auto w-full md:w-auto mt-2 md:mt-0 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
          {t('labs.locks.startSim')}
        </button>
      </div>

      {/* Visualization */}
      <div className="flex-1 bg-white p-4 md:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative overflow-auto">
        
        {/* Shared Resource */}
        <div className="mb-12 relative">
           <motion.div 
             className="w-40 h-40 bg-gray-100 rounded-full flex flex-col items-center justify-center border-4 border-gray-300 shadow-inner"
             animate={{ 
               borderColor: activeThread ? (activeThread === 'T1' ? '#3b82f6' : '#eab308') : '#d1d5db',
               scale: activeThread ? 1.05 : 1
             }}
           >
             <div className="text-4xl font-bold text-gray-800">{count}</div>
             <div className="text-sm text-gray-500 mt-1">{t('labs.locks.sharedCount')}</div>
             {isLocked && <div className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full shadow"><Lock size={16}/></div>}
           </motion.div>
        </div>

        {/* Threads */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-20 w-full justify-center items-center">
          {/* Thread 1 */}
          <motion.div 
            className={`p-6 rounded-lg border-2 flex flex-col items-center w-40 transition-colors ${activeThread === 'T1' ? 'bg-blue-50 border-blue-500 shadow-lg' : 'bg-white border-gray-200 opacity-50'}`}
          >
            <div className="font-bold text-blue-600 mb-2">{t('labs.locks.thread1')}</div>
            <div className="text-xs text-gray-500">{t('labs.locks.executing')}</div>
          </motion.div>

          {/* Thread 2 */}
          <motion.div 
             className={`p-6 rounded-lg border-2 flex flex-col items-center w-40 transition-colors ${activeThread === 'T2' ? 'bg-yellow-50 border-yellow-500 shadow-lg' : 'bg-white border-gray-200 opacity-50'}`}
          >
            <div className="font-bold text-yellow-600 mb-2">{t('labs.locks.thread2')}</div>
            <div className="text-xs text-gray-500">{t('labs.locks.executing')}</div>
          </motion.div>
        </div>

        {/* Result Message */}
        {!isRunning && count > 0 && (
          <div className={`mt-8 px-6 py-3 rounded-lg font-bold ${
            count === 20 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {t('labs.locks.result', { 
              count, 
              status: count < 20 ? t('labs.locks.dataLoss') : t('labs.locks.correct')
            })}
          </div>
        )}

      </div>
    </div>
  );
};
