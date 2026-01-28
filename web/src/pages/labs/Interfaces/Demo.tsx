import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Usb, Keyboard, Mouse, Printer, Power, ArrowDown, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [device, setDevice] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Initialize logs
  React.useEffect(() => {
    setLogs([t('labs.interfaces.ready')]);
  }, [t]);

  const connect = (type: string) => {
    setDevice(type);
    const typeLabel = t(`labs.interfaces.${type}`);
    setLogs(prev => [
      ...prev, 
      t('labs.interfaces.connecting', { type: typeLabel }), 
      t('labs.interfaces.driverLoaded', { type: typeLabel }), 
      t('labs.interfaces.deviceReady', { type: typeLabel })
    ]);
  };

  const disconnect = () => {
    if (device) {
      const deviceLabel = t(`labs.interfaces.${device}`);
      setLogs(prev => [...prev, t('labs.interfaces.disconnecting', { device: deviceLabel }), t('labs.interfaces.removed')]);
      setDevice(null);
    }
  };

  const DeviceIcon = ({ type, size = 24 }: { type: string, size?: number }) => {
    switch (type) {
      case 'keyboard': return <Keyboard size={size} />;
      case 'mouse': return <Mouse size={size} />;
      case 'printer': return <Printer size={size} />;
      default: return <Usb size={size} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* 1. Control Panel (Sticky Top) */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-700 text-sm">{t('labs.interfaces.title')}</h3>
          <button 
            onClick={disconnect}
            disabled={!device}
            className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition-colors
              ${device ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
            `}
          >
            <Power size={14} /> {t('labs.interfaces.eject')}
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {['keyboard', 'mouse', 'printer'].map(type => (
            <button
              key={type}
              onClick={() => connect(type)}
              className={`
                flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 transition-all
                ${device === type 
                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}
              `}
            >
              <DeviceIcon type={type} size={20} />
              <span className="text-[10px] uppercase font-bold tracking-wider">{t(`labs.interfaces.${type}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Visual Flow (Natural Stack) */}
      <div className="flex-1 p-4 flex flex-col items-center gap-4">
        
        {/* Computer Block */}
        <div className="w-full bg-slate-800 text-slate-200 rounded-xl p-4 shadow-md flex items-center gap-4">
          <div className="p-3 bg-slate-700 rounded-lg">
            <Laptop size={24} className="text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono text-slate-400">{t('labs.interfaces.host')}</div>
            <div className="font-bold truncate">{t('labs.interfaces.myComputer')}</div>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        {/* Connection Line */}
        <ArrowDown className="text-slate-300" size={24} />

        {/* Interface Block */}
        <div className="w-full bg-white border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-slate-100 text-[10px] text-slate-500 px-2 py-0.5 rounded-br">
            {t('labs.interfaces.interface')}
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-blue-500 mt-2">
            <Usb size={24} />
          </div>
          <div className="flex-1 mt-2">
            <div className="font-bold text-slate-700 text-sm">{t('labs.interfaces.usbPort')}</div>
            <div className="text-xs text-slate-500">{t('labs.interfaces.usbDesc')}</div>
          </div>
        </div>

        {/* Connection Line (Dynamic) */}
        <motion.div 
          animate={{ 
            opacity: device ? 1 : 0.2, 
            y: device ? 0 : -10,
            scale: device ? 1 : 0.8
          }} 
        >
          <ArrowDown className={device ? "text-blue-500" : "text-slate-200"} size={24} />
        </motion.div>

        {/* Device Block (Dynamic) */}
        <AnimatePresence mode="wait">
          {device ? (
            <motion.div
              key={device}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full bg-blue-600 text-white rounded-xl p-4 shadow-lg flex items-center gap-4"
            >
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <DeviceIcon type={device} size={28} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-blue-200 uppercase font-bold">{t('labs.interfaces.connectedDevice')}</div>
                <div className="font-bold text-lg capitalize">{t(`labs.interfaces.${device}`)}</div>
              </div>
              <div className="p-1 bg-green-400 rounded-full" />
            </motion.div>
          ) : (
            <div className="w-full h-20 border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-300 text-sm italic">
              {t('labs.interfaces.noDevice')}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Console / Logs (Fixed Bottom) */}
      <div className="bg-slate-900 text-green-400 p-4 font-mono text-xs border-t border-slate-800 max-h-48 overflow-y-auto">
        <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-1 sticky top-0 bg-slate-900">
          <Terminal size={12} />
          <span className="font-bold">{t('labs.interfaces.systemLog')}</span>
        </div>
        <div className="flex flex-col gap-1">
          {logs.slice(-5).map((log, i) => (
            <div key={i} className="opacity-90">{log}</div>
          ))}
          <div className="h-2" /> {/* spacer */}
        </div>
      </div>
    </div>
  );
};
