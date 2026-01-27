import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

interface GCObject {
  id: number;
  age: number;
  isAlive: boolean; // Simulating reachability
  location: 'Eden' | 'S0' | 'S1' | 'Old';
}

export const Demo: React.FC = () => {
  const [objects, setObjects] = useState<GCObject[]>([]);
  const [nextId, setNextId] = useState(1);
  const [survivorTo, setSurvivorTo] = useState<'S0' | 'S1'>('S0'); // Target survivor space
  const [log, setLog] = useState<string[]>(['Heap initialized']);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  // Limits
  const EDEN_LIMIT = 8;
  const SURVIVOR_LIMIT = 4;
  const TENURING_THRESHOLD = 3; // Promote after age 3

  const allocate = () => {
    const edenObjects = objects.filter(o => o.location === 'Eden');
    if (edenObjects.length >= EDEN_LIMIT) {
      addLog('❌ Eden 区已满！请执行 Minor GC');
      return;
    }

    const newObj: GCObject = {
      id: nextId,
      age: 0,
      isAlive: true, // Default alive
      location: 'Eden'
    };
    
    setObjects(prev => [...prev, newObj]);
    setNextId(prev => prev + 1);
    addLog(`Allocated Object #${newObj.id} in Eden`);
  };

  const toggleReachability = (id: number) => {
    setObjects(prev => prev.map(o => 
      o.id === id ? { ...o, isAlive: !o.isAlive } : o
    ));
  };

  const runMinorGC = () => {
    addLog('🚀 Triggering Minor GC...');
    const targetS = survivorTo === 'S0' ? 'S0' : 'S1';
    const sourceS = survivorTo === 'S0' ? 'S1' : 'S0';
    
    let promotedCount = 0;
    let survivedCount = 0;
    let collectedCount = 0;

    setObjects(prev => {
      // 1. Mark & Copy
      const nextObjects = prev.filter(o => {
        // Keep Old Gen as is
        if (o.location === 'Old') return true;
        
        // Remove dead objects in Young Gen
        if (!o.isAlive) {
          collectedCount++;
          return false; 
        }
        return true;
      }).map(o => {
        if (o.location === 'Old') return o;

        // Alive objects in Eden or Source Survivor
        if (o.location === 'Eden' || o.location === sourceS) {
          const newAge = o.age + 1;
          if (newAge >= TENURING_THRESHOLD) {
            promotedCount++;
            return { ...o, age: newAge, location: 'Old' as const };
          } else {
            survivedCount++;
            return { ...o, age: newAge, location: targetS as 'S0' | 'S1' };
          }
        }
        
        // Objects already in Target Survivor (shouldn't happen in standard model but for safety)
        return o;
      });

      addLog(`GC Result: ${collectedCount} collected, ${survivedCount} moved to ${targetS}, ${promotedCount} promoted to Old Gen`);
      return nextObjects;
    });

    // Flip Survivor
    setSurvivorTo(prev => prev === 'S0' ? 'S1' : 'S0');
  };

  const clear = () => {
    setObjects([]);
    setLog(['Heap cleared']);
    setNextId(1);
    setSurvivorTo('S0');
  };

  const renderZone = (name: string, location: string, limit: number, colorClass: string) => {
    const zoneObjects = objects.filter(o => o.location === location);
    const usage = Math.round((zoneObjects.length / limit) * 100);

    return (
      <div className={`flex-1 border-2 rounded-lg p-2 flex flex-col ${colorClass} min-h-[160px]`}>
        <div className="flex justify-between items-center mb-2 border-b border-black/10 pb-1">
          <span className="font-bold text-sm">{name}</span>
          <span className="text-xs font-mono">{zoneObjects.length}/{limit} ({usage}%)</span>
        </div>
        <div className="flex-1 flex flex-wrap content-start gap-2">
          <AnimatePresence>
            {zoneObjects.map(obj => (
              <motion.div
                key={obj.id}
                layoutId={`obj-${obj.id}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => toggleReachability(obj.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors border-2 shadow-sm ${
                  obj.isAlive 
                    ? 'bg-white border-blue-500 text-blue-600 hover:bg-red-50 hover:border-red-500 hover:text-red-500' 
                    : 'bg-gray-300 border-gray-400 text-gray-500 decoration-line-through'
                }`}
                title={`ID: ${obj.id}, Age: ${obj.age}\nClick to toggle reachability`}
              >
                {obj.id}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <button onClick={allocate} className="btn-primary bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18} /> Allocate Object
        </button>
        
        <button onClick={runMinorGC} className="btn-primary bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded flex items-center gap-2">
          <RefreshCw size={18} /> Minor GC
        </button>

        <button onClick={clear} className="ml-auto text-gray-500 hover:text-gray-700">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
        {/* Young Gen */}
        <div className="flex flex-col gap-2">
           <div className="text-xs font-bold uppercase text-gray-400">Young Generation</div>
           <div className="flex gap-4">
              {renderZone('Eden Space', 'Eden', EDEN_LIMIT, 'bg-green-50 border-green-200')}
              {renderZone('Survivor 0', 'S0', SURVIVOR_LIMIT, survivorTo === 'S1' ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200 opacity-60')}
              {renderZone('Survivor 1', 'S1', SURVIVOR_LIMIT, survivorTo === 'S0' ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200 opacity-60')}
           </div>
        </div>

        {/* Old Gen */}
        <div className="flex flex-col gap-2 flex-1">
           <div className="text-xs font-bold uppercase text-gray-400">Old Generation</div>
           <div className="flex gap-4 h-full">
              {renderZone('Tenured Space', 'Old', 20, 'bg-blue-50 border-blue-200')}
           </div>
        </div>
      </div>

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
