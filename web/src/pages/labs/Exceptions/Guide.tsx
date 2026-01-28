import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
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

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Java Exception Hierarchy</h3>
      <p className="text-gray-600 mb-4">
        All exceptions in Java inherit from the <code>Throwable</code> class and are mainly divided into two categories:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
        <li>
          <strong>Error:</strong> Serious errors that the JVM cannot handle (e.g., StackOverflowError, OutOfMemoryError).
        </li>
        <li>
          <strong>Exception:</strong> Exceptions that the program can handle. Further divided into:
          <ul className="list-disc list-inside ml-6 mt-2">
            <li><strong>Checked Exception:</strong> Mandatory handling at compile time (e.g., IOException).</li>
            <li><strong>Unchecked Exception (Runtime):</strong> Runtime exceptions (e.g., NullPointerException).</li>
          </ul>
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Try-Catch-Finally</h3>
      <p className="text-gray-600 mb-4">
        Standard control flow for exception handling:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
        <li><strong>try:</strong> Contains code that may throw an exception.</li>
        <li><strong>catch:</strong> Catches and handles specific types of exceptions.</li>
        <li><strong>finally:</strong> Code block that <strong>always executes</strong> regardless of whether an exception occurred (usually for resource cleanup).</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Code Example</h3>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
        <pre>{`try {
    // 1. May throw exception
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 2. Catch exception
    System.out.println("Error: " + e.getMessage());
} finally {
    // 3. Always executes
    System.out.println("Cleanup resources...");
}`}</pre>
      </div>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
