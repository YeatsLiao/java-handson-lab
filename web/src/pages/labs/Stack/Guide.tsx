import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">什么是方法调用栈？</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        每当 JVM 调用一个方法时，都会在栈内存中创建一个新的<strong>栈帧 (Stack Frame)</strong>。
        栈帧用于存储该方法的：
      </p>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
        <li><strong>局部变量表:</strong> 方法参数和内部定义的变量。</li>
        <li><strong>操作数栈:</strong> 执行计算时的临时存储。</li>
        <li><strong>返回地址:</strong> 方法执行完后回到的位置。</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">递归与 StackOverflow</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        递归调用是栈运作的经典场景。例如计算阶乘 <code>factorial(3)</code>：
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm mb-4 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
        factorial(3) 调用 factorial(2)<br/>
        &nbsp;&nbsp;factorial(2) 调用 factorial(1)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;factorial(1) 返回 1<br/>
        &nbsp;&nbsp;factorial(2) 计算 2*1 返回 2<br/>
        factorial(3) 计算 3*2 返回 6
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        如果递归没有终止条件，栈帧会不断累积，最终耗尽栈内存，抛出 
        <code className="text-red-600 dark:text-red-400 font-bold mx-1">StackOverflowError</code>。
      </p>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">What is Method Call Stack?</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Whenever the JVM invokes a method, it creates a new <strong>Stack Frame</strong> in the stack memory.
        The stack frame is used to store the method's:
      </p>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
        <li><strong>Local Variable Table:</strong> Method parameters and internally defined variables.</li>
        <li><strong>Operand Stack:</strong> Temporary storage for execution calculations.</li>
        <li><strong>Return Address:</strong> The location to return to after the method execution is complete.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Recursion and StackOverflow</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Recursive calls are a classic scenario for stack operations. For example, calculating factorial <code>factorial(3)</code>:
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm mb-4 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
        factorial(3) calls factorial(2)<br/>
        &nbsp;&nbsp;factorial(2) calls factorial(1)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;factorial(1) returns 1<br/>
        &nbsp;&nbsp;factorial(2) calculates 2*1 returns 2<br/>
        factorial(3) calculates 3*2 returns 6
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        If recursion lacks a termination condition, stack frames will accumulate indefinitely, eventually exhausting stack memory and throwing a
        <code className="text-red-600 dark:text-red-400 font-bold mx-1">StackOverflowError</code>.
      </p>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
