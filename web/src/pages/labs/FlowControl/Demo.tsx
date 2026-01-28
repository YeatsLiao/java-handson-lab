import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [i, setI] = useState<number | null>(null);
  const [limit, setLimit] = useState(5);
  const [activeStep, setActiveStep] = useState<'init' | 'cond' | 'body' | 'update' | 'done' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const mountedRef = useRef(true);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      isPlayingRef.current = false;
    };
  }, []);

  // Sync ref with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const runLoop = async () => {
      if (!isPlaying) return;

      try {
        setLogs([]);
        setActiveStep('init');
        setI(0);
        setLogs(p => [...p, t('labs.flowControl.init')]);
        await delay(1000);
        if (!mountedRef.current || !isPlayingRef.current) return;

        let currentI = 0;
        
        while (true) {
          // Condition
          setActiveStep('cond');
          setLogs(p => [...p, t('labs.flowControl.check', { currentI, limit, result: currentI < limit })]);
          await delay(1000);
          if (!mountedRef.current || !isPlayingRef.current) return;

          if (currentI >= limit) {
            break;
          }

          // Body
          setActiveStep('body');
          setLogs(p => [...p, t('labs.flowControl.body', { currentI })]);
          await delay(1000);
          if (!mountedRef.current || !isPlayingRef.current) return;

          // Update
          setActiveStep('update');
          currentI++;
          setI(currentI);
          setLogs(p => [...p, t('labs.flowControl.update', { currentI })]);
          await delay(1000);
          if (!mountedRef.current || !isPlayingRef.current) return;
        }

        if (mountedRef.current) {
          setActiveStep('done');
          setLogs(p => [...p, t('labs.flowControl.done')]);
          setIsPlaying(false);
        }
      } catch (e) {
        console.error("Loop error:", e);
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      runLoop();
    }
  }, [isPlaying, limit, t]);

  const handleReset = () => {
    setIsPlaying(false);
    setI(null);
    setActiveStep(null);
    setLogs([]);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
        <div className="font-mono text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
          for (int i = 0; i &lt; 
          <input 
            type="number" 
            value={limit}
            onChange={e => setLimit(Math.max(1, parseInt(e.target.value)||1))}
            className="w-12 mx-2 px-1 border rounded text-center bg-white"
            disabled={isPlaying}
          />
          ; i++)
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all shadow-sm active:scale-95 ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isPlaying ? <Pause size={16}/> : <Play size={16}/>}
          {isPlaying ? t('labs.flowControl.pause') : t('labs.flowControl.start')}
        </button>
        <button
          onClick={handleReset}
          className="ml-auto text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
          title={t('labs.flowControl.reset')}
        >
          <RotateCcw size={18}/>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Code View */}
        <div className="bg-[#1E1E1E] rounded-xl p-6 font-mono text-sm text-gray-300 relative overflow-auto shadow-lg border border-gray-800">
           <div className="absolute top-0 left-0 w-full h-8 bg-[#252526] flex items-center px-4 text-xs text-gray-500 border-b border-gray-700">
             LoopDemo.java
           </div>
           <div className="mt-6 space-y-1">
             <div className={`p-2 rounded transition-colors duration-300 border-l-2 ${activeStep === 'init' ? 'bg-[#264F78] border-blue-400 text-white' : 'border-transparent'}`}>
               for (int i = 0; 
             </div>
             <div className={`p-2 rounded transition-colors duration-300 border-l-2 ${activeStep === 'cond' ? 'bg-[#264F78] border-blue-400 text-white' : 'border-transparent'}`}>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i &lt; {limit}; 
             </div>
             <div className={`p-2 rounded transition-colors duration-300 border-l-2 ${activeStep === 'update' ? 'bg-[#264F78] border-blue-400 text-white' : 'border-transparent'}`}>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i++) &#123;
             </div>
             <div className={`p-2 rounded transition-colors duration-300 border-l-2 ${activeStep === 'body' ? 'bg-[#264F78] border-blue-400 text-white' : 'border-transparent'}`}>
               &nbsp;&nbsp;System.out.println(i);
             </div>
             <div className="p-2 border-l-2 border-transparent">
               &#125;
             </div>
           </div>
           
           {/* Variable Watcher */}
           <div className="absolute bottom-6 right-6 bg-[#252526] p-4 rounded-lg border border-gray-700 shadow-xl">
             <div className="text-[10px] uppercase text-gray-500 mb-2 font-bold tracking-wider">{t('labs.flowControl.variables')}</div>
             <div className="flex items-center gap-3 font-mono text-base">
               <span className="text-[#569CD6]">int</span>
               <span className="text-[#9CDCFE]">i</span>
               <span className="text-gray-400">=</span>
               <span className={`font-bold ${activeStep === 'update' ? 'text-[#CE9178] scale-110' : 'text-[#B5CEA8]'} transition-all`}>
                 {i === null ? 'null' : i}
               </span>
             </div>
           </div>
        </div>

        {/* Console Log */}
        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm overflow-hidden">
           <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('labs.flowControl.console')}</h4>
             <span className="text-xs text-gray-400">{t('labs.flowControl.lines', { count: logs.length })}</span>
           </div>
           <div className="flex-1 p-4 font-mono text-xs overflow-y-auto max-h-[400px] space-y-1">
              {logs.map((log, idx) => (
                <div 
                   key={idx} 
                   className="border-b border-gray-50 pb-1 last:border-0 text-gray-600 animate-in fade-in slide-in-from-left-2 duration-300"
                >
                  <span className="text-gray-300 mr-3 select-none">{(idx + 1).toString().padStart(2, '0')}</span>
                  {log}
                </div>
              ))}
             <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
           </div>
        </div>
      </div>
    </div>
  );
};
