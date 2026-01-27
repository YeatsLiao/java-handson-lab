import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">引用类型 (Reference Types)</h3>
        <p className="text-gray-600 mb-4">
          与基本数据类型不同，<strong>引用类型</strong>（如类、接口、数组）的变量并不直接存储数据本身，而是存储数据的<strong>内存地址</strong>（即引用）。
          真正的数据（对象）存储在<strong>堆内存 (Heap)</strong> 中。
        </p>
        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
          <h4 className="font-semibold mb-2">内存模型对比</h4>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>栈 (Stack):</strong> 存储局部变量（包括基本类型的值和引用类型的地址）。</li>
            <li><strong>堆 (Heap):</strong> 存储通过 <code>new</code> 关键字创建的所有对象实例。</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">对象的创建过程</h3>
        <p className="text-gray-600 mb-2">
          当我们执行 <code>User user = new User("Alice");</code> 时，发生了三件事：
        </p>
        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>在堆中开辟空间:</strong> <code>new User(...)</code> 在 Heap 中分配内存。</li>
          <li><strong>初始化对象:</strong> 调用构造函数，设置属性值（如 name="Alice"）。</li>
          <li><strong>赋值给引用:</strong> 将这个对象的内存地址（如 0x1A2B）赋值给栈中的变量 <code>user</code>。</li>
        </ol>
        
        <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-100">
          💡 <strong>交互提示：</strong> 
          在右侧创建多个对象，观察它们在 Heap 中的位置。尝试将一个变量赋值给另一个变量（如 <code>u2 = u1</code>），
          看看是否会创建新对象，还是仅仅复制了引用（指向同一个对象）。
        </div>
      </section>
    </div>
  );
};
