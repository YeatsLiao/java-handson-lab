import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">for 循环的执行顺序</h3>
        <p className="text-gray-600 mb-4">
          标准的 for 循环 <code>for (init; condition; update)</code> 执行步骤如下：
        </p>
        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <li><strong>初始化 (Init):</strong> 执行一次，通常用于声明计数器变量 (<code>int i = 0</code>)。</li>
          <li><strong>条件判断 (Condition):</strong> 每次循环前执行。如果为 true，继续；为 false，退出循环。</li>
          <li><strong>循环体 (Body):</strong> 执行大括号 <code>{`{ ... }`}</code> 中的代码。</li>
          <li><strong>更新 (Update):</strong> 循环体执行完后执行，通常用于递增计数器 (<code>i++</code>)。</li>
          <li>回到步骤 2。</li>
        </ol>
      </section>
    </div>
  );
};
