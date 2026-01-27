import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">线程生命周期</h3>
        <p className="text-gray-600 mb-4">
          Java 线程在运行过程中会处于不同的状态。理解这些状态及其转换是编写并发程序的基础。
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">六大状态 (Enum Thread.State)</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>NEW:</strong> 线程被创建，但尚未启动 (start() 未调用)。</li>
          <li><strong>RUNNABLE:</strong> 正在 Java 虚拟机中执行，可能在等待操作系统 CPU 时间片。</li>
          <li><strong>BLOCKED:</strong> 被阻塞，等待获取监视器锁 (Monitor Lock)。</li>
          <li><strong>WAITING:</strong> 无限期等待另一个线程执行特定操作 (如 wait(), join())。</li>
          <li><strong>TIMED_WAITING:</strong> 指定时间的等待 (如 sleep(1000))。</li>
          <li><strong>TERMINATED:</strong> 线程已退出 (run() 方法执行结束)。</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">常见状态转换</h3>
        <table className="min-w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b">当前状态</th>
              <th className="px-6 py-3 border-b">操作/事件</th>
              <th className="px-6 py-3 border-b">目标状态</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">NEW</td>
              <td className="px-6 py-4"><code>thread.start()</code></td>
              <td className="px-6 py-4">RUNNABLE</td>
            </tr>
            <tr className="bg-gray-50 border-b">
              <td className="px-6 py-4">RUNNABLE</td>
              <td className="px-6 py-4"><code>Object.wait()</code></td>
              <td className="px-6 py-4">WAITING</td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">WAITING</td>
              <td className="px-6 py-4"><code>Object.notify()</code></td>
              <td className="px-6 py-4">RUNNABLE</td>
            </tr>
            <tr className="bg-gray-50 border-b">
              <td className="px-6 py-4">RUNNABLE</td>
              <td className="px-6 py-4">Enter synchronized block</td>
              <td className="px-6 py-4">BLOCKED (if locked)</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">RUNNABLE</td>
              <td className="px-6 py-4">Run method finishes</td>
              <td className="px-6 py-4">TERMINATED</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
