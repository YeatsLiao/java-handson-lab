import React, { useState, useMemo } from 'react';
import XarrowSrc, { Xwrapper as XwrapperSrc } from 'react-xarrows';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    if (vars.some(v => v.name === varName)) return alert(t('labs.stringPool.varExists'));
    if (!varName) return alert(t('labs.stringPool.enterName'));

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
    if (vars.some(v => v.name === varName)) return alert(t('labs.stringPool.varExists'));
    if (!varName) return alert(t('labs.stringPool.enterName'));

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
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
          {/* Literal Control */}
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-200 dark:border-green-800">
            <span className="text-purple-600 dark:text-purple-400">String</span>
            <input 
              value={varName} 
              onChange={e => setVarName(e.target.value)}
              className="w-10 px-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-gray-100 outline-none focus:ring-1 focus:ring-green-500"
            />
            <span className="dark:text-gray-300">=</span>
            <span className="text-green-600 dark:text-green-400">"</span>
            <input 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="w-16 px-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-gray-100 outline-none focus:ring-1 focus:ring-green-500"
            />
            <span className="text-green-600 dark:text-green-400">"</span>;
            <button onClick={createLiteral} className="ml-2 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors">
              {t('labs.stringPool.literal')}
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

          {/* New Control */}
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800">
             <span className="dark:text-gray-300">... = </span>
             <span className="text-blue-600 dark:text-blue-400">new</span>
             <span className="text-purple-600 dark:text-purple-400">String</span>
             <span className="dark:text-gray-300">(...)</span>
             <button onClick={createNew} className="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
              {t('labs.stringPool.newString')}
            </button>
          </div>
          
           <button onClick={reset} className="ml-auto text-gray-400 dark:text-gray-500 hover:text-red-500 px-3 py-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors">
             {t('labs.stringPool.reset')}
           </button>
        </div>
      </div>

      <Xwrapper>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
          
          {/* Stack */}
          <div className="col-span-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4 relative flex flex-col">
             <div className="absolute top-3 left-4 text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest">{t('labs.stringPool.stack')}</div>
             <div className="mt-8 flex flex-col gap-2">
               {vars.map(v => (
                 <div key={v.id} id={v.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-sm flex justify-between items-center z-10 animate-in slide-in-from-left-2 duration-300">
                    <span className="font-bold text-purple-700 dark:text-purple-300">{v.name}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">ref</span>
                 </div>
               ))}
               {vars.length === 0 && <div className="text-center text-gray-300 dark:text-gray-600 mt-4 text-sm">{t('labs.common.empty')}</div>}
             </div>
          </div>

          {/* Heap (Normal) */}
          <div className="col-span-1 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 p-4 relative">
             <div className="absolute top-3 left-4 text-xs font-bold text-blue-400 dark:text-blue-500 tracking-widest">{t('labs.stringPool.heap')}</div>
             <div className="mt-8 flex flex-wrap gap-4">
                {heap.map(h => (
                  <div key={h.id} id={h.id} className="w-24 h-16 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 rounded-lg shadow-sm flex flex-col items-center justify-center relative z-10 animate-in zoom-in duration-300">
                     <span className="text-[10px] text-blue-500 dark:text-blue-400 font-bold uppercase mb-1">{t('labs.stringPool.object')}</span>
                     <span className="text-sm font-mono text-gray-700 dark:text-gray-300">"{h.value}"</span>
                  </div>
                ))}
             </div>
          </div>

          {/* String Pool */}
          <div className="col-span-1 bg-green-50/50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800 p-4 relative overflow-auto max-h-[500px]">
             <div className="absolute top-3 left-4 text-xs font-bold text-green-600 dark:text-green-500 tracking-widest">{t('labs.stringPool.pool')}</div>
             <div className="mt-8 flex flex-wrap gap-2 content-start">
                {pool.map(p => (
                  <div key={p.id} id={p.id} className="px-3 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded-lg shadow-sm text-sm font-mono text-green-700 dark:text-green-300 z-10 animate-in zoom-in duration-300">
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
