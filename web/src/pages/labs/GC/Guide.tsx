import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Java 堆内存结构</h3>
        <p className="text-gray-600 mb-4">
          为了优化垃圾回收效率，JVM 将堆内存划分为不同的代 (Generation)：
        </p>
        <div className="flex gap-4 mb-4">
           <div className="flex-1 border p-2 rounded bg-green-50">
             <div className="font-bold text-center">Young Generation (新生代)</div>
             <div className="flex gap-2 mt-2 text-xs text-center">
               <div className="flex-1 bg-green-200 p-1 rounded">Eden</div>
               <div className="w-1/4 bg-green-300 p-1 rounded">S0</div>
               <div className="w-1/4 bg-green-300 p-1 rounded">S1</div>
             </div>
           </div>
           <div className="flex-1 border p-2 rounded bg-blue-50">
             <div className="font-bold text-center">Old Generation (老年代)</div>
             <div className="mt-2 bg-blue-200 p-1 rounded h-6 text-xs text-center">Tenured</div>
           </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">GC 流程 (Minor GC)</h3>
        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>分配:</strong> 新对象优先在 Eden 区分配。</li>
          <li><strong>标记:</strong> 当 Eden 满时，触发 Minor GC，标记所有存活对象。</li>
          <li><strong>复制:</strong> 将 Eden 和当前 Survivor 区的存活对象复制到另一个空闲的 Survivor 区。</li>
          <li><strong>晋升:</strong> 经历多次 GC 仍存活的对象（年龄达到阈值），会被移动到老年代 (Old Gen)。</li>
          <li><strong>清除:</strong> 清空 Eden 和原来的 Survivor 区。</li>
        </ol>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">对象可达性</h3>
        <p className="text-gray-600 mb-4">
          GC 通过<strong>可达性分析 (Reachability Analysis)</strong> 算法判断对象是否存活。
          从 <strong>GC Roots</strong> (如栈帧中的局部变量、静态变量) 出发，无法到达的对象将被回收。
        </p>
      </section>
    </div>
  );
};
