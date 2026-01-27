import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, Check, ArrowDown, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'start' | 'try' | 'exception' | 'catch' | 'finally' | 'end';

export const Demo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('start');
  const [hasException, setHasException] = useState(true);
  const [logs, setLogs] = useState<string[]>(['System ready.']);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const runStep = () => {
    if (currentStep === 'end') {
      setCurrentStep('start');
      setLogs(['System ready.']);
      return;
    }

    switch (currentStep) {
      case 'start':
        setCurrentStep('try');
        addLog('> Entering try block...');
        break;
      case 'try':
        if (hasException) {
          setCurrentStep('exception');
          addLog('> ❌ Exception: ArithmeticException');
        } else {
          setCurrentStep('finally');
          addLog('> ✅ Try block success. Skipping catch.');
        }
        break;
      case 'exception':
        setCurrentStep('catch');
        addLog('> Entering catch block...');
        break;
      case 'catch':
        setCurrentStep('finally');
        addLog('> Exception handled. Entering finally...');
        break;
      case 'finally':
        setCurrentStep('end');
        addLog('> Finally block executed.');
        addLog('> Process finished.');
        break;
    }
  };

  const getBlockStyle = (block: 'try' | 'catch' | 'finally') => {
    // Default style
    let style = "border-slate-200 bg-white opacity-50 grayscale";
    
    // Active style
    if (
      (block === 'try' && currentStep === 'try') ||
      (block === 'catch' && (currentStep === 'catch' || currentStep === 'exception')) ||
      (block === 'finally' && currentStep === 'finally')
    ) {
      style = "border-blue-500 bg-blue-50 opacity-100 ring-2 ring-blue-200 shadow-md transform scale-[1.02]";
    }
    
    // Completed style
    const isCompleted = 
      (block === 'try' && currentStep !== 'start' && currentStep !== 'try') ||
      (block === 'catch' && (currentStep === 'finally' || currentStep === 'end') && hasException) ||
      (block === 'finally' && currentStep === 'end');

    if (isCompleted) {
      style = "border-green-500 bg-green-50 opacity-100";
    }

    // Skipped style (specifically for catch)
    if (block === 'catch' && !hasException && (currentStep === 'finally' || currentStep === 'end')) {
       style = "border-slate-200 bg-slate-50 opacity-30 border-dashed";
    }

    return style;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* 1. Controls (Sticky Top) */}
      <div className="bg-white border-b border-slate-200 p-3 shadow-sm z-10 flex items-center justify-between shrink-0">
        <button
          onClick={() => { setHasException(!hasException); setCurrentStep('start'); setLogs(['System ready.']); }}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-colors ${
            hasException ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
          }`}
        >
          {hasException ? '⚠️ Will Fail' : '✅ Will Pass'}
        </button>

        <button
          onClick={runStep}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
        >
          {currentStep === 'end' ? <RotateCcw size={16} /> : <Play size={16} />}
          {currentStep === 'end' ? 'Reset' : 'Next'}
        </button>
      </div>

      {/* 2. Visual Flow (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        
        {/* TRY BLOCK */}
        <div className={`transition-all duration-300 rounded-xl border-2 p-4 ${getBlockStyle('try')}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm uppercase tracking-wider">Try Block</span>
            {getBlockStyle('try').includes('bg-green-50') && <Check size={16} className="text-green-600" />}
          </div>
          <code className="block bg-black/5 p-2 rounded text-xs font-mono text-slate-700">
            int result = 10 / {hasException ? '0' : '2'};
          </code>
        </div>

        {/* INLINE EXCEPTION ALERT */}
        <AnimatePresence>
          {currentStep === 'exception' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-100 border-l-4 border-red-500 p-3 rounded-r-lg"
            >
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <AlertTriangle size={16} />
                <span>ArithmeticException Thrown!</span>
              </div>
              <div className="text-xs text-red-600 mt-1 pl-6">
                Division by zero detected. Jumping to Catch...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center">
          <ArrowDown size={20} className="text-slate-300" />
        </div>

        {/* CATCH BLOCK */}
        <div className={`transition-all duration-300 rounded-xl border-2 p-4 ${getBlockStyle('catch')}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm uppercase tracking-wider">Catch Block</span>
            {getBlockStyle('catch').includes('bg-green-50') && <Check size={16} className="text-green-600" />}
          </div>
          <code className="block bg-black/5 p-2 rounded text-xs font-mono text-slate-700">
            System.err.println(e);
          </code>
        </div>

        <div className="flex justify-center">
          <ArrowDown size={20} className="text-slate-300" />
        </div>

        {/* FINALLY BLOCK */}
        <div className={`transition-all duration-300 rounded-xl border-2 p-4 ${getBlockStyle('finally')}`}>
           <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm uppercase tracking-wider">Finally Block</span>
            {getBlockStyle('finally').includes('bg-green-50') && <Check size={16} className="text-green-600" />}
          </div>
          <code className="block bg-black/5 p-2 rounded text-xs font-mono text-slate-700">
            resource.close();
          </code>
        </div>

      </div>

      {/* 3. Mini Console (Fixed Bottom) */}
      <div className="bg-slate-900 p-3 shrink-0 border-t border-slate-800">
        <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs uppercase font-bold tracking-wider">
          <Terminal size={12} /> Execution Log
        </div>
        <div className="font-mono text-xs text-green-400 h-20 overflow-y-auto flex flex-col gap-1">
          {logs.map((l, i) => (
             <div key={i} className="opacity-90">{l}</div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
};
