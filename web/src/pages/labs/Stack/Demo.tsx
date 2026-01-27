import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface StackFrame {
  id: number;
  methodName: string;
  args: string;
  returnVal?: number;
  status: 'active' | 'waiting' | 'returning';
}

export const Demo: React.FC = () => {
  const [frames, setFrames] = useState<StackFrame[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [n, setN] = useState(3);
  const [maxDepth] = useState(5);
  
  // Use refs to track mounted state and running state for async operations
  const mountedRef = useRef(true);
  const isRunningRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      isRunningRef.current = false; // Stop execution on unmount
    };
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runFactorial = async () => {
    if (isRunningRef.current) return;
    
    setIsRunning(true);
    isRunningRef.current = true;
    setFrames([]);

    try {
      await factorial(n, 0);
    } catch (error) {
      console.error("Animation error:", error);
    } finally {
      if (mountedRef.current) {
        setIsRunning(false);
        isRunningRef.current = false;
      }
    }
  };

  const factorial = async (currentN: number, depth: number): Promise<number> => {
    if (!mountedRef.current || !isRunningRef.current) return 0;

    if (depth > maxDepth) {
      alert("Stack Overflow! (模拟)");
      return 0;
    }

    // Push Frame
    const frameId = Date.now() + depth;
    
    if (mountedRef.current) {
      setFrames(prev => [
        { 
          id: frameId, 
          methodName: 'factorial', 
          args: `n=${currentN}`, 
          status: 'active' 
        },
        ...prev.map(f => ({ ...f, status: 'waiting' } as StackFrame))
      ]);
    }

    await delay(1000);
    if (!mountedRef.current || !isRunningRef.current) return 0;

    let result = 1;
    if (currentN <= 1) {
      result = 1;
    } else {
      const subResult = await factorial(currentN - 1, depth + 1);
      if (!mountedRef.current || !isRunningRef.current) return 0;
      
      // Reactivate current frame after child returns
      if (mountedRef.current) {
        setFrames(prev => prev.map(f => 
          f.id === frameId ? { ...f, status: 'active' } : f
        ));
      }
      await delay(800);
      if (!mountedRef.current || !isRunningRef.current) return 0;
      
      result = currentN * subResult;
    }

    // Update return value
    if (mountedRef.current) {
      setFrames(prev => prev.map(f => 
        f.id === frameId ? { ...f, status: 'returning', returnVal: result } : f
      ));
    }
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

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono">factorial(</span>
          <input 
            type="number" 
            value={n}
            onChange={(e) => setN(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-12 px-2 py-1 border rounded text-center"
            disabled={isRunning}
          />
          <span className="font-mono">)</span>
        </div>
        
        <button
          onClick={runFactorial}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {isRunning ? 'Running...' : <><Play size={16} /> Run Recursive Demo</>}
        </button>

        <button
          onClick={handleReset}
          disabled={isRunning}
          className="ml-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Reset"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-8 flex flex-col-reverse items-center gap-2 overflow-y-auto min-h-[400px] relative">
        <div className="w-full text-center text-gray-300 font-mono text-sm border-t border-gray-200 pt-2">Stack Bottom</div>
        
          {frames.map((frame, index) => (
            <div
              key={frame.id}
              className={`w-64 p-4 rounded-lg border-2 shadow-sm transition-all duration-300 relative animate-in slide-in-from-bottom-4`}
              style={{
                borderColor: frame.status === 'active' ? '#3B82F6' : '#E5E7EB',
                backgroundColor: frame.status === 'returning' ? '#ECFDF5' : (frame.status === 'active' ? '#EFF6FF' : '#F9FAFB')
              }}
            >
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400">
                Frame #{frames.length - index}
              </div>
              
              <div className="font-bold text-gray-800">{frame.methodName}</div>
              <div className="text-sm font-mono text-blue-600 mt-1">{frame.args}</div>
              
              {frame.returnVal !== undefined && (
                <div 
                  className="mt-2 pt-2 border-t border-gray-200 text-sm font-mono text-green-600 font-bold animate-in fade-in"
                >
                  return {frame.returnVal};
                </div>
              )}
              
              {frame.status === 'waiting' && (
                <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center rounded-lg backdrop-blur-[1px]">
                  <span className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border shadow-sm">Waiting...</span>
                </div>
              )}
            </div>
          ))}

        {frames.length === 0 && !isRunning && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none">
                Stack Empty
            </div>
        )}
      </div>
    </div>
  );
};
