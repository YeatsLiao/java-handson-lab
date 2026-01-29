import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Java 的 8 种基本数据类型</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Java 是一种强类型语言，它提供了 8 种基本数据类型 (Primitive Types) 来存储简单的数值。
        这些类型直接存储在<strong>栈内存 (Stack Memory)</strong> 中，而不是像对象那样存储在堆 (Heap) 中。
      </p>
      
      <div className="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">类型</th>
              <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">大小 (Bit)</th>
              <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">范围 / 描述</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">byte</td>
              <td className="p-3">8</td>
              <td className="p-3">-128 ~ 127</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">short</td>
              <td className="p-3">16</td>
              <td className="p-3">-32,768 ~ 32,767</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">int</td>
              <td className="p-3">32</td>
              <td className="p-3">-2^31 ~ 2^31-1 (约21亿)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">long</td>
              <td className="p-3">64</td>
              <td className="p-3">-2^63 ~ 2^63-1</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">float</td>
              <td className="p-3">32</td>
              <td className="p-3">单精度浮点数</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">double</td>
              <td className="p-3">64</td>
              <td className="p-3">双精度浮点数 (默认小数类型)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">char</td>
              <td className="p-3">16</td>
              <td className="p-3">Unicode 字符 (0 ~ 65535)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">boolean</td>
              <td className="p-3">~1</td>
              <td className="p-3">true / false</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">栈内存 (Stack Memory)</h3>
      <p className="text-gray-600 dark:text-gray-400">
        当你在方法中声明一个基本类型的变量时（例如 <code>int age = 18;</code>），
        Java 虚拟机 (JVM) 会在当前的<strong>栈帧 (Stack Frame)</strong> 中分配一块内存，
        并将数值直接存储在这块内存中。
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300 mt-4">
        💡 <strong>交互提示：</strong> 
        在右侧的实验区，尝试声明不同的变量，观察它们是如何被“压入”栈内存的。
        注意观察不同类型的变量占用的“格子”大小虽然在示意图中一样，但实际上位数不同。
      </div>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Java's 8 Primitive Types</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Java is a strongly typed language that provides 8 Primitive Types to store simple values.
        These types are stored directly in <strong>Stack Memory</strong>, unlike objects which are stored in the Heap.
      </p>
      
      <div className="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">Type</th>
              <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">Size (Bit)</th>
              <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">Range / Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">byte</td>
              <td className="p-3">8</td>
              <td className="p-3">-128 ~ 127</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">short</td>
              <td className="p-3">16</td>
              <td className="p-3">-32,768 ~ 32,767</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">int</td>
              <td className="p-3">32</td>
              <td className="p-3">-2^31 ~ 2^31-1 (approx 2.1 billion)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">long</td>
              <td className="p-3">64</td>
              <td className="p-3">-2^63 ~ 2^63-1</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">float</td>
              <td className="p-3">32</td>
              <td className="p-3">Single-precision float</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">double</td>
              <td className="p-3">64</td>
              <td className="p-3">Double-precision float (default)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">char</td>
              <td className="p-3">16</td>
              <td className="p-3">Unicode Character (0 ~ 65535)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">boolean</td>
              <td className="p-3">~1</td>
              <td className="p-3">true / false</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Stack Memory</h3>
      <p className="text-gray-600 dark:text-gray-400">
        When you declare a primitive variable in a method (e.g., <code>int age = 18;</code>),
        the JVM allocates a block of memory in the current <strong>Stack Frame</strong> and stores the value directly there.
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300 mt-4">
        💡 <strong>Interactive Tip:</strong> 
        In the lab area on the right, try declaring different variables and observe how they are "pushed" onto the Stack Memory.
        Note that while the "box" size in the diagram might look the same, they occupy different bits in reality.
      </div>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
