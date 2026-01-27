import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">什么是方法调用栈？</h3>
        <p className="text-gray-600 mb-4">
          每当 JVM 调用一个方法时，都会在栈内存中创建一个新的<strong>栈帧 (Stack Frame)</strong>。
          栈帧用于存储该方法的：
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
          <li><strong>局部变量表:</strong> 方法参数和内部定义的变量。</li>
          <li><strong>操作数栈:</strong> 执行计算时的临时存储。</li>
          <li><strong>返回地址:</strong> 方法执行完后回到的位置。</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">递归与 StackOverflow</h3>
        <p className="text-gray-600 mb-2">
          递归调用是栈运作的经典场景。例如计算阶乘 <code>factorial(3)</code>：
        </p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-4 border border-gray-200">
          factorial(3) 调用 factorial(2)<br/>
          &nbsp;&nbsp;factorial(2) 调用 factorial(1)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;factorial(1) 返回 1<br/>
          &nbsp;&nbsp;factorial(2) 计算 2*1 返回 2<br/>
          factorial(3) 计算 3*2 返回 6
        </div>
        <p className="text-gray-600">
          如果递归没有终止条件，栈帧会不断累积，最终耗尽栈内存，抛出 
          <code className="text-red-600 font-bold mx-1">StackOverflowError</code>。
        </p>
      </section>
    </div>
  );
};
