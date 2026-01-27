import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">线程安全问题</h3>
        <p className="text-gray-600 mb-4">
          当多个线程同时访问并修改共享变量时，如果没有适当的同步措施，就会发生<strong>竞态条件 (Race Condition)</strong>，导致数据不一致。
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Synchronized 关键字</h3>
        <p className="text-gray-600 mb-4">
          <code>synchronized</code> 是 Java 提供的内置锁机制。它可以修饰方法或代码块。
          同一时刻，只能有一个线程持有锁并执行同步代码块，其他线程必须等待。
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>原子性 (Atomicity):</strong> 保证操作不可被中断。</li>
          <li><strong>可见性 (Visibility):</strong> 保证线程修改后的值对其他线程立即可见。</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">代码对比</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-red-600 mb-2">不安全 (Unsafe)</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
              <pre>{`class Counter {
    int count = 0;
    
    void increment() {
        // 非原子操作
        // read -> modify -> write
        count++; 
    }
}`}</pre>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-green-600 mb-2">安全 (Synchronized)</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
              <pre>{`class Counter {
    int count = 0;
    
    synchronized void increment() {
        // 加锁，保证原子性
        count++;
    }
}`}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
