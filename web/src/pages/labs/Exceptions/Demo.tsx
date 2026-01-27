import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, ArrowDown } from 'lucide-react';

type Step = 'start' | 'try' | 'exception' | 'catch' | 'finally' | 'end';

export const Demo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('start');
  const [hasException, setHasException] = useState(true);
  const [log, setLog] = useState<string[]>(['准备就绪']);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const runStep = async () => {
    // Reset
    if (currentStep === 'end') {
      setCurrentStep('start');
      setLog(['准备就绪']);
      return;
    }

    if (currentStep === 'start') {
      setCurrentStep('try');
      addLog('进入 try 代码块...');
      return;
    }

    if (currentStep === 'try') {
      if (hasException) {
        setCurrentStep('exception');
        addLog('❌ 发生异常: ArithmeticException (/ by zero)');
      } else {
        setCurrentStep('finally'); // Skip catch
        addLog('✅ try 块执行成功，跳过 catch');
      }
      return;
    }

    if (currentStep === 'exception') {
      setCurrentStep('catch');
      addLog('进入 catch (ArithmeticException e) 块...');
      return;
    }

    if (currentStep === 'catch') {
      setCurrentStep('finally');
      addLog('异常处理完毕，准备进入 finally...');
      return;
    }

    if (currentStep === 'finally') {
      setCurrentStep('end');
      addLog('执行 finally 块 (释放资源)');
      addLog('流程结束');
      return;
    }
  };

  const reset = () => {
    setCurrentStep('start');
    setLog(['准备就绪']);
  };

  const getStepColor = (step: Step) => {
    if (currentStep === step) return 'bg-yellow-100 border-yellow-500 text-yellow-800 scale-105 shadow-md';
    if (step === 'catch' && !hasException && currentStep !== 'start' && currentStep !== 'try') return 'opacity-30'; // Skipped catch
    return 'bg-white border-gray-200 text-gray-500';
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-gray-700">场景设置:</label>
          <button
            onClick={() => { setHasException(!hasException); reset(); }}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              hasException ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'
            }`}
          >
            {hasException ? '⚠️ 触发异常' : '✅ 正常执行'}
          </button>
        </div>
        
        <div className="flex gap-2 ml-auto">
          <button
            onClick={runStep}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            {currentStep === 'end' ? <RotateCcw size={18} /> : <Play size={18} />}
            {currentStep === 'end' ? '重置 (Reset)' : '下一步 (Next)'}
          </button>
        </div>
      </div>

      {/* Flow Visualization */}
      <div className="flex-1 bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
        <div className="space-y-4 w-64">
          
          {/* Try Block */}
          <motion.div 
            layout
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${getStepColor('try')}`}
          >
            <div className="font-bold flex items-center gap-2">
              <span className="text-xs uppercase bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">Code</span>
              try &#123; ... &#125;
            </div>
            <div className="text-sm mt-2">
              {hasException ? 'int a = 10 / 0;' : 'int a = 10 / 2;'}
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowDown className={`text-gray-300 ${currentStep === 'exception' ? 'text-red-500 animate-bounce' : ''}`} />
          </div>

          {/* Catch Block */}
          <motion.div 
            layout
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${getStepColor('catch')}`}
          >
            <div className="font-bold flex items-center gap-2">
              <span className="text-xs uppercase bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">Handler</span>
              catch (e) &#123; ... &#125;
            </div>
            <div className="text-sm mt-2">
              System.err.println(e);
            </div>
          </motion.div>

           {/* Arrow */}
           <div className="flex justify-center">
            <ArrowDown className="text-gray-300" />
          </div>

          {/* Finally Block */}
          <motion.div 
            layout
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${getStepColor('finally')}`}
          >
            <div className="font-bold flex items-center gap-2">
              <span className="text-xs uppercase bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">Always</span>
              finally &#123; ... &#125;
            </div>
            <div className="text-sm mt-2">
              closeResources();
            </div>
          </motion.div>

        </div>

        {/* Status Indicator */}
        <AnimatePresence>
          {currentStep === 'exception' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-1/2 right-10 bg-red-100 border border-red-300 p-4 rounded-lg text-red-700 shadow-lg"
            >
              <div className="flex items-center gap-2 font-bold text-lg mb-1">
                <AlertTriangle /> Exception Thrown!
              </div>
              <div className="text-sm">ArithmeticException: / by zero</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logs */}
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
