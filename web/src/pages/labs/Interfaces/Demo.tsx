import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, Mouse, Printer, Laptop, RefreshCw } from 'lucide-react';

type DeviceType = 'keyboard' | 'mouse' | 'printer' | null;

export const Demo: React.FC = () => {
  const [device, setDevice] = useState<DeviceType>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const connectDevice = (type: DeviceType) => {
    if (device === type) return;
    setDevice(type);
    setLogs(prev => [...prev, `> USB device = new ${type?.charAt(0).toUpperCase()}${type?.slice(1)}();`, `> computer.connect(device);`]);
    setActiveCode('connect');
    
    setTimeout(() => {
      setActiveCode('work');
      let workLog = "";
      switch (type) {
        case 'keyboard': workLog = "Type: Hello World"; break;
        case 'mouse': workLog = "Click: (x: 100, y: 200)"; break;
        case 'printer': workLog = "Print: Document.pdf"; break;
      }
      setLogs(prev => [...prev, `> device.work(); // ${workLog}`]);
      setTimeout(() => setActiveCode(null), 1000);
    }, 1000);
  };

  const reset = () => {
    setDevice(null);
    setLogs([]);
    setActiveCode(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={() => connectDevice('keyboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${device === 'keyboard' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Keyboard size={18} /> Keyboard
        </button>
        <button
          onClick={() => connectDevice('mouse')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${device === 'mouse' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Mouse size={18} /> Mouse
        </button>
        <button
          onClick={() => connectDevice('printer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${device === 'printer' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Printer size={18} /> Printer
        </button>
        
        <button
          onClick={reset}
          className="ml-auto p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          title="Disconnect All"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="flex items-center gap-8">
            {/* Computer */}
            <div className="flex flex-col items-center z-10">
              <Laptop size={64} className="text-gray-700" />
              <span className="mt-2 font-mono text-sm bg-gray-100 px-2 py-1 rounded">Computer</span>
            </div>

            {/* USB Cable */}
            <div className="w-16 h-2 bg-gray-300 rounded relative">
               <AnimatePresence>
                 {device && (
                   <motion.div 
                     initial={{ width: 0, opacity: 0 }}
                     animate={{ width: "100%", opacity: 1 }}
                     exit={{ width: 0, opacity: 0 }}
                     className="absolute inset-0 bg-blue-500 rounded"
                   />
                 )}
               </AnimatePresence>
            </div>

            {/* Device */}
            <div className="w-24 h-24 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {device ? (
                  <motion.div
                    key={device}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 border-2 border-blue-200">
                      {device === 'keyboard' && <Keyboard size={32} />}
                      {device === 'mouse' && <Mouse size={32} />}
                      {device === 'printer' && <Printer size={32} />}
                    </div>
                    <span className="mt-2 text-xs font-mono text-gray-500 capitalize">{device}</span>
                  </motion.div>
                ) : (
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-300">
                    USB
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Code & Console Area */}
        <div className="flex flex-col gap-4">
          {/* Code Preview */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-4 font-mono text-sm overflow-hidden">
            <div className="flex gap-1.5 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-1 text-gray-300">
              <div className="text-gray-500">// Interface Polymorphism</div>
              <div><span className="text-purple-400">interface</span> USB &#123; <span className="text-purple-400">void</span> work(); &#125;</div>
              <br/>
              <div><span className="text-purple-400">void</span> connect(USB device) &#123;</div>
              <div className={`${activeCode === 'work' ? 'bg-blue-500/30 -mx-4 px-4 py-1' : ''} transition-colors duration-300 pl-4`}>
                device.<span className="text-blue-300">work</span>(); <span className="text-gray-500">// Dynamic Call</span>
              </div>
              <div>&#125;</div>
              <br/>
              <div className={`${activeCode === 'connect' ? 'bg-blue-500/30 -mx-4 px-4 py-1' : ''} transition-colors duration-300`}>
                computer.connect(<span className="text-blue-400">new</span> <span className="text-yellow-300">{device ? device.charAt(0).toUpperCase() + device.slice(1) : '...'}</span>());
              </div>
            </div>
          </div>

          {/* Console Output */}
          <div className="flex-1 bg-black rounded-xl shadow-lg p-4 font-mono text-sm overflow-hidden flex flex-col">
            <div className="text-gray-500 border-b border-gray-800 pb-2 mb-2">Console Output</div>
            <div className="flex-1 overflow-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
              {logs.length === 0 && <span className="text-gray-600 italic">Ready...</span>}
              {logs.map((log, index) => (
                <div key={index} className="text-green-400 animate-fade-in">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
