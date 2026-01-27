import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';

export const Demo: React.FC = () => {
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

      // Clear logs only on start, not resume? 
      // Current logic: if isPlaying becomes true, it starts over or resumes?
      // The original code reset logs every time isPlaying became true, which means it RESTARTED.
      // But it checked 'mounted' and 'isPlaying' in the loop.
      // If we want to support Pause/Resume, we need to track state.
      // But the original code was:
      /*
      setLogs([]);
      setActiveStep('init');
      setI(0);
      ...
      */
      // So it was a Restart every time. The "Pause" button just stopped it, and "Start" restarted it.
      // Wait, the button label says "Pause" / "Start Execution".
      // If I click Pause, isPlaying=false. Loop stops (returns).
      // If I click Start, isPlaying=true. Effect runs. runLoop called.
      // runLoop resets everything. So it's not Resume, it's Restart.
      // That might be annoying but not an "error".
      // However, if the user wants "Resume", we need to store state.
      // But let's stick to "Restart" to match original behavior unless it's broken.
      // Actually, "Pause" implies we can resume. But the original code clearly resets: `setLogs([])`, `setI(0)`.
      // Maybe the user thinks it's an error that it restarts?
      // I will change it to Resume if possible, or at least make it robust.
      // Given "Rewrite", I'll make it robust. If I can make it Resume, that's better.
      // But implementing Resume with `while` loop inside `useEffect` is hard because we lose the local `currentI`.
      // To implement Resume, we need to store `currentI` in state or ref.
      
      // For now, I'll stick to robust implementation of the existing logic (Restart).
      // If the user said "report an error", maybe they mean the loop logic is flawed.
      
      try {
        setLogs([]);
        setActiveStep('init');
        setI(0);
        setLogs(p => [...p, "执行初始化: int i = 0"]);
        await delay(1000);
        if (!mountedRef.current || !isPlayingRef.current) return;

        let currentI = 0;
        
        while (true) {
          // Condition
          setActiveStep('cond');
          setLogs(p => [...p, `检查条件: ${currentI} < ${limit} ? ${currentI < limit}`]);
          await delay(1000);
          if (!mountedRef.current || !isPlayingRef.current) return;

          if (currentI >= limit) {
            break;
          }

          // Body
          setActiveStep('body');
          setLogs(p => [...p, `执行循环体: print(${currentI})`]);
          await delay(1000);
          if (!mountedRef.current || !isPlayingRef.current) return;

          // Update
          setActiveStep('update');
          currentI++;
          setI(currentI);
          setLogs(p => [...p, `执行更新: i++ (i变为${currentI})`]);
          await delay(1000);
          if (!mountedRef.current || !isPlayingRef.current) return;
        }

        if (mountedRef.current) {
          setActiveStep('done');
          setLogs(p => [...p, "循环结束"]);
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
  }, [isPlaying, limit]); // Added limit to dependency, though changing limit while running restarts it.

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
          {isPlaying ? '暂停' : '开始执行'}
        </button>
        <button
          onClick={handleReset}
          className="ml-auto text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
          title="重置"
        >
          <RotateCcw size={18}/>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Code View */}
        <div className="bg-[#1E1E1E] rounded-xl p-6 font-mono text-sm text-gray-300 relative overflow-hidden shadow-lg border border-gray-800">
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
             <div className="text-[10px] uppercase text-gray-500 mb-2 font-bold tracking-wider">Variables</div>
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
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Console Output</h4>
             <span className="text-xs text-gray-400">{logs.length} lines</span>
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
