import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Java 异常体系</h3>
        <p className="text-gray-600 mb-4">
          Java 中的异常都继承自 <code>Throwable</code> 类，主要分为两大类：
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>
            <strong>Error:</strong> JVM 无法处理的严重错误（如 StackOverflowError, OutOfMemoryError）。
          </li>
          <li>
            <strong>Exception:</strong> 程序可以处理的异常。又分为：
            <ul className="list-disc list-inside ml-6 mt-2">
              <li><strong>Checked Exception:</strong> 编译时强制处理（如 IOException）。</li>
              <li><strong>Unchecked Exception (Runtime):</strong> 运行时异常（如 NullPointerException）。</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Try-Catch-Finally</h3>
        <p className="text-gray-600 mb-4">
          异常处理的标准控制流：
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>try:</strong> 包含可能抛出异常的代码块。</li>
          <li><strong>catch:</strong> 捕获并处理特定类型的异常。</li>
          <li><strong>finally:</strong> 无论是否发生异常，<strong>总会执行</strong>的代码块（通常用于资源释放）。</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">代码示例</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
          <pre>{`try {
    // 1. 可能抛出异常
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 2. 捕获异常
    System.out.println("Error: " + e.getMessage());
} finally {
    // 3. 最终执行
    System.out.println("Cleanup resources...");
}`}</pre>
        </div>
      </section>
    </div>
  );
};
