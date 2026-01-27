import React, { useState, useMemo } from 'react';
import XarrowSrc, { Xwrapper as XwrapperSrc } from 'react-xarrows';

// Workaround for Vite/CJS interop issue with react-xarrows
const Xarrow = (XarrowSrc as any).default ?? XarrowSrc;
const Xwrapper = (XarrowSrc as any).Xwrapper ?? XwrapperSrc;

interface PoolString {
  id: string;
  value: string;
}

interface HeapString {
  id: string;
  value: string;
  poolRefId: string | null;
}

interface StackVar {
  id: string;
  name: string;
  targetId: string;
  targetType: 'heap' | 'pool';
}

export const Demo: React.FC = () => {
  const [pool, setPool] = useState<PoolString[]>([]);
  const [heap, setHeap] = useState<HeapString[]>([]);
  const [vars, setVars] = useState<StackVar[]>([]);
  
  const [inputVal, setInputVal] = useState('java');
  const [varName, setVarName] = useState('s1');

  // Helper to ensure we don't crash if target doesn't exist yet
  const validTargetIds = useMemo(() => {
    const ids = new Set<string>();
    pool.forEach(p => ids.add(p.id));
    heap.forEach(h => ids.add(h.id));
    return ids;
  }, [pool, heap]);

  const createLiteral = () => {
    if (vars.some(v => v.name === varName)) return alert("变量名已存在");
    if (!varName) return alert("请输入变量名");

    let poolStr = pool.find(p => p.value === inputVal);
    let poolId = poolStr?.id;

    if (!poolStr) {
      poolId = `pool-${Date.now()}`;
      setPool(prev => [...prev, { id: poolId!, value: inputVal }]);
    }

    setVars(prev => [...prev, {
      id: `var-${Date.now()}`,
      name: varName,
      targetId: poolId!,
      targetType: 'pool'
    }]);
    
    incrementVarName();
  };

  const createNew = () => {
    if (vars.some(v => v.name === varName)) return alert("变量名已存在");
    if (!varName) return alert("请输入变量名");

    let poolStr = pool.find(p => p.value === inputVal);
    // Even if poolStr doesn't exist, we might need to create it for interning? 
    // Usually new String("...") creates a heap object, and intern pool string if literal is used.
    // Here we assume "new String(literal)" so literal goes to pool if not there.
    
    if (!poolStr) {
       const newPoolId = `pool-${Date.now()}`;
       poolStr = { id: newPoolId, value: inputVal };
       setPool(prev => [...prev, poolStr!]);
    }

    const heapId = `heap-${Date.now()}`;
    setHeap(prev => [...prev, {
      id: heapId,
      value: inputVal,
      poolRefId: poolStr!.id
    }]);

    setVars(prev => [...prev, {
      id: `var-${Date.now()}`,
      name: varName,
      targetId: heapId,
      targetType: 'heap'
    }]);

    incrementVarName();
  };

  const incrementVarName = () => {
    setVarName(prev => {
      const num = parseInt(prev.replace(/\D/g, '')) || 0;
      return `s${num + 1}`;
    });
  };

  const reset = () => {
    setPool([]);
    setHeap([]);
    setVars([]);
    setVarName('s1');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
          {/* Literal Control */}
          <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg border border-green-200">
            <span className="text-purple-600">String</span>
            <input 
              value={varName} 
              onChange={e => setVarName(e.target.value)}
              className="w-10 px-1 border rounded bg-white outline-none focus:ring-1 focus:ring-green-500"
            />
            <span>=</span>
            <span className="text-green-600">"</span>
            <input 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="w-16 px-1 border rounded bg-white outline-none focus:ring-1 focus:ring-green-500"
            />
            <span className="text-green-600">"</span>;
            <button onClick={createLiteral} className="ml-2 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors">
              Literal
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200"></div>

          {/* New Control */}
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg border border-blue-200">
             <span>... = </span>
             <span className="text-blue-600">new</span>
             <span className="text-purple-600">String</span>
             <span>(...)</span>
             <button onClick={createNew} className="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
              new String()
            </button>
          </div>
          
           <button onClick={reset} className="ml-auto text-gray-400 hover:text-red-500 px-3 py-1 hover:bg-red-50 rounded transition-colors">Reset</button>
        </div>
      </div>

      <Xwrapper>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
          
          {/* Stack */}
          <div className="col-span-1 bg-gray-50 rounded-xl border border-gray-200 p-4 relative flex flex-col">
             <div className="absolute top-3 left-4 text-xs font-bold text-gray-400 tracking-widest">STACK</div>
             <div className="mt-8 flex flex-col gap-2">
               {vars.map(v => (
                 <div key={v.id} id={v.id} className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm flex justify-between items-center z-10 animate-in slide-in-from-left-2 duration-300">
                    <span className="font-bold text-purple-700">{v.name}</span>
                    <span className="text-xs text-gray-400 font-mono">ref</span>
                 </div>
               ))}
               {vars.length === 0 && <div className="text-center text-gray-300 mt-4 text-sm">Empty</div>}
             </div>
          </div>

          {/* Heap (Normal) */}
          <div className="col-span-1 bg-blue-50/50 rounded-xl border border-blue-100 p-4 relative">
             <div className="absolute top-3 left-4 text-xs font-bold text-blue-400 tracking-widest">HEAP (Objects)</div>
             <div className="mt-8 flex flex-wrap gap-4">
                {heap.map(h => (
                  <div key={h.id} id={h.id} className="w-24 h-16 bg-white border border-blue-200 rounded-lg shadow-sm flex flex-col items-center justify-center relative z-10 animate-in zoom-in duration-300">
                     <span className="text-[10px] text-blue-500 font-bold uppercase mb-1">String Object</span>
                     <span className="text-sm font-mono text-gray-700">"{h.value}"</span>
                  </div>
                ))}
             </div>
          </div>

          {/* String Pool */}
          <div className="col-span-1 bg-green-50/50 rounded-xl border border-green-100 p-4 relative">
             <div className="absolute top-3 left-4 text-xs font-bold text-green-600 tracking-widest">STRING POOL</div>
             <div className="mt-8 flex flex-wrap gap-2 content-start">
                {pool.map(p => (
                  <div key={p.id} id={p.id} className="px-3 py-2 bg-white border border-green-300 rounded-lg shadow-sm text-sm font-mono text-green-700 z-10 animate-in zoom-in duration-300">
                     "{p.value}"
                  </div>
                ))}
             </div>
          </div>

          {/* Arrows - Only render if target exists */}
          {vars.map(v => validTargetIds.has(v.targetId) && (
            <Xarrow
              key={v.id}
              start={v.id}
              end={v.targetId}
              color="#9CA3AF"
              startAnchor="right"
              endAnchor="left"
              path="smooth"
              strokeWidth={2}
              headSize={5}
              curveness={0.5}
            />
          ))}
        </div>
      </Xwrapper>
    </div>
  );
};
