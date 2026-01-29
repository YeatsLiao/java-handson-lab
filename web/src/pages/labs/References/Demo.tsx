import React, { useState, useMemo } from 'react';
import { Plus, Copy, Trash2 } from 'lucide-react';
import XarrowSrc, { Xwrapper as XwrapperSrc } from 'react-xarrows';
import { useTranslation } from 'react-i18next';

// Workaround for Vite/CJS interop issue with react-xarrows
const Xarrow = (XarrowSrc as any).default ?? XarrowSrc;
const Xwrapper = (XarrowSrc as any).Xwrapper ?? XwrapperSrc;

interface HeapObject {
  id: string;
  className: string;
  data: string;
  color: string;
}

interface StackRef {
  id: string;
  name: string;
  targetId: string | null; // Points to HeapObject id
}

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [heapObjects, setHeapObjects] = useState<HeapObject[]>([]);
  const [stackRefs, setStackRefs] = useState<StackRef[]>([]);
  
  const [varName, setVarName] = useState('u1');
  const [objData, setObjData] = useState('Alice');

  // Helper to ensure we don't crash if target doesn't exist yet
  const validTargetIds = useMemo(() => {
    const ids = new Set<string>();
    heapObjects.forEach(h => ids.add(h.id));
    return ids;
  }, [heapObjects]);

  // Create new object: User u = new User("...");
  const createObject = () => {
    if (stackRefs.some(r => r.name === varName)) {
      alert(t('labs.references.varExists', { name: varName }));
      return;
    }

    const newObjId = `obj-${Date.now()}`;
    const newObj: HeapObject = {
      id: newObjId,
      className: 'User',
      data: `name="${objData}"`,
      color: 'bg-green-100 border-green-200 text-green-900',
    };

    const newRef: StackRef = {
      id: `ref-${Date.now()}`,
      name: varName,
      targetId: newObjId,
    };

    setHeapObjects(prev => [...prev, newObj]);
    setStackRefs(prev => [newRef, ...prev]);
    
    // Auto increment
    setVarName(prev => {
      const num = parseInt(prev.replace(/\D/g, '')) || 0;
      return `u${num + 1}`;
    });
  };

  // Assign reference: u2 = u1;
  const assignReference = () => {
    if (stackRefs.length === 0) return;
    const sourceRef = stackRefs[0]; // Simple demo: always copy from top
    
    const newRefName = `u${stackRefs.length + 1}`;
    const newRef: StackRef = {
      id: `ref-${Date.now()}`,
      name: newRefName,
      targetId: sourceRef.targetId, // Point to SAME object
    };
    
    setStackRefs(prev => [newRef, ...prev]);
  };

  const clearAll = () => {
    setHeapObjects([]);
    setStackRefs([]);
    setVarName('u1');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          {t('labs.common.codeConsole')}
        </h3>
        <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
          {/* New Object Control */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-purple-600 dark:text-purple-400">User</span>
            <input 
              type="text" 
              value={varName}
              onChange={(e) => setVarName(e.target.value)}
              className="w-12 px-2 py-1 border rounded focus:ring-1 outline-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-200"
            />
            <span className="text-gray-500 dark:text-gray-400">=</span>
            <span className="text-blue-600 dark:text-blue-400">new</span>
            <span className="text-purple-600 dark:text-purple-400">User</span>
            <span className="text-gray-600 dark:text-gray-400">("</span>
            <input 
              type="text" 
              value={objData}
              onChange={(e) => setObjData(e.target.value)}
              className="w-20 px-2 py-1 border rounded focus:ring-1 outline-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-200"
            />
            <span className="text-gray-600 dark:text-gray-400">");</span>
            <button 
              onClick={createObject}
              className="ml-2 bg-blue-600 text-white p-1 rounded hover:bg-blue-700 transition-colors"
              title={t('labs.common.execute')}
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* Reference Assignment Control */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
             <span className="text-gray-400 text-xs">{t('labs.references.refAssignment')}</span>
             <button 
               onClick={assignReference}
               disabled={stackRefs.length === 0}
               className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded hover:bg-indigo-200 dark:hover:bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
             >
               <Copy size={14} /> u{stackRefs.length + 1} = {stackRefs[0]?.name || '...'}
             </button>
          </div>

           <button 
             onClick={clearAll} 
             className="ml-auto text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
           >
             <Trash2 size={18} />
           </button>
        </div>
      </div>

      <Xwrapper>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
          {/* Stack Area */}
          <div className="col-span-1 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col relative overflow-auto max-h-[600px]">
             <div className="absolute top-4 left-4 text-xs font-bold text-gray-400 tracking-widest">{t('labs.common.stack')}</div>
             <div className="mt-8 flex flex-col gap-3">
                 {stackRefs.map(ref => (
                   <div 
                     key={ref.id} 
                     id={ref.id}
                     className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-sm flex justify-between items-center relative z-10 animate-in fade-in slide-in-from-left-4 duration-300"
                   >
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">User</span>
                        <span className="font-bold font-mono text-purple-700 dark:text-purple-400">{ref.name}</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono text-gray-500 dark:text-gray-400">
                        {ref.targetId ? `@${ref.targetId.slice(-4)}` : 'null'}
                      </div>
                   </div>
                 ))}
               {stackRefs.length === 0 && <div className="text-center text-gray-300 dark:text-gray-600 mt-10">{t('labs.common.empty')}</div>}
             </div>
          </div>

          {/* Heap Area */}
          <div className="col-span-1 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 p-6 relative overflow-auto max-h-[600px]">
             <div className="absolute top-4 left-4 text-xs font-bold text-blue-400 dark:text-blue-300 tracking-widest">{t('labs.common.heap')}</div>
             <div className="mt-8 flex flex-wrap gap-4 content-start">
                  {heapObjects.map(obj => (
                    <div 
                      key={obj.id}
                      id={obj.id}
                      className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-md border-2 z-10 bg-white dark:bg-gray-800 ${obj.color} animate-in zoom-in duration-300`}
                    >
                       <span className="text-xs font-bold mb-1">{obj.className}</span>
                       <span className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-2">@{obj.id.slice(-4)}</span>
                       <span className="text-sm font-mono bg-white/50 dark:bg-black/20 px-2 rounded">{obj.data}</span>
                    </div>
                  ))}
             </div>
          </div>

          {/* Arrows */}
          {stackRefs.map(ref => ref.targetId && validTargetIds.has(ref.targetId) && (
            <Xarrow
              key={ref.id}
              start={ref.id}
              end={ref.targetId}
              color="#9CA3AF"
              startAnchor="right"
              endAnchor="left"
              path="grid"
              strokeWidth={2}
              headSize={5}
              curveness={0.5}
              zIndex={0}
            />
          ))}
        </div>
      </Xwrapper>
    </div>
  );
};
