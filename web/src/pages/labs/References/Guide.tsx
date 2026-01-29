import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">引用类型 (Reference Types)</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        与基本数据类型不同，<strong>引用类型</strong>（如类、接口、数组）的变量并不直接存储数据本身，而是存储数据的<strong>内存地址</strong>（即引用）。
        真正的数据（对象）存储在<strong>堆内存 (Heap)</strong> 中。
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
        <h4 className="font-semibold mb-2">内存模型对比</h4>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>栈 (Stack):</strong> 存储局部变量（包括基本类型的值和引用类型的地址）。</li>
          <li><strong>堆 (Heap):</strong> 存储通过 <code>new</code> 关键字创建的所有对象实例。</li>
        </ul>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">对象的创建过程</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        当我们执行 <code>User user = new User("Alice");</code> 时，发生了三件事：
      </p>
      <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
        <li><strong>在堆中开辟空间:</strong> <code>new User(...)</code> 在 Heap 中分配内存。</li>
        <li><strong>初始化对象:</strong> 调用构造函数，设置属性值（如 name="Alice"）。</li>
        <li><strong>赋值给引用:</strong> 将这个对象的内存地址（如 0x1A2B）赋值给栈中的变量 <code>user</code>。</li>
      </ol>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-sm text-yellow-800 dark:text-yellow-300 border border-yellow-100 dark:border-yellow-800">
        💡 <strong>交互提示：</strong> 
        在右侧创建多个对象，观察它们在 Heap 中的位置。尝试将一个变量赋值给另一个变量（如 <code>u2 = u1</code>），
        看看是否会创建新对象，还是仅仅复制了引用（指向同一个对象）。
      </div>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Reference Types</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Unlike primitive data types, variables of <strong>Reference Types</strong> (such as classes, interfaces, arrays) do not store the data itself, but rather the <strong>memory address</strong> (reference) of the data.
        The actual data (objects) are stored in the <strong>Heap Memory</strong>.
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
        <h4 className="font-semibold mb-2">Memory Model Comparison</h4>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Stack:</strong> Stores local variables (including values of primitive types and addresses of reference types).</li>
          <li><strong>Heap:</strong> Stores all object instances created via the <code>new</code> keyword.</li>
        </ul>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Object Creation Process</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        When we execute <code>User user = new User("Alice");</code>, three things happen:
      </p>
      <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
        <li><strong>Allocation in Heap:</strong> <code>new User(...)</code> allocates memory in the Heap.</li>
        <li><strong>Initialization:</strong> The constructor is called to set property values (e.g., name="Alice").</li>
        <li><strong>Assignment to Reference:</strong> The memory address of this object (e.g., 0x1A2B) is assigned to the variable <code>user</code> in the stack.</li>
      </ol>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-sm text-yellow-800 dark:text-yellow-300 border border-yellow-100 dark:border-yellow-800">
        💡 <strong>Interactive Hint:</strong> 
        Create multiple objects on the right and observe their positions in the Heap. Try assigning one variable to another (e.g., <code>u2 = u1</code>),
        and see if a new object is created or if only the reference is copied (pointing to the same object).
      </div>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
