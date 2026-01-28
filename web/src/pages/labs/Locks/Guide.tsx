import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
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

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Thread Safety Issues</h3>
      <p className="text-gray-600 mb-4">
        When multiple threads access and modify shared variables simultaneously without proper synchronization, **Race Conditions** occur, leading to data inconsistency.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Synchronized Keyword</h3>
      <p className="text-gray-600 mb-4">
        <code>synchronized</code> is Java's built-in locking mechanism. It can modify methods or code blocks.
        At any given time, only one thread can hold the lock and execute the synchronized code, while others must wait.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
        <li><strong>Atomicity:</strong> Ensures operations cannot be interrupted.</li>
        <li><strong>Visibility:</strong> Ensures that changes made by one thread are immediately visible to others.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Code Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-red-600 mb-2">Unsafe</h4>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
            <pre>{`class Counter {
    int count = 0;
    
    void increment() {
        // Non-atomic operation
        // read -> modify -> write
        count++; 
    }
}`}</pre>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-green-600 mb-2">Safe (Synchronized)</h4>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
            <pre>{`class Counter {
    int count = 0;
    
    synchronized void increment() {
        // Lock ensures atomicity
        count++;
    }
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
