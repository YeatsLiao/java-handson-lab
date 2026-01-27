import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">ArrayList 内部原理</h3>
        <p className="text-gray-600 mb-4">
          <code>ArrayList</code> 是 Java 中最常用的集合类之一，它基于<strong>动态数组</strong>实现。
          与普通数组不同，ArrayList 可以自动调整其容量以容纳更多的元素。
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">核心属性</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>
            <strong>elementData:</strong> 
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm mx-1">Object[]</code>
            底层存储元素的数组。
          </li>
          <li>
            <strong>size:</strong> 
            当前列表中包含的元素数量。
          </li>
          <li>
            <strong>DEFAULT_CAPACITY:</strong> 
            默认初始容量，通常为 10。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">扩容机制 (Resizing)</h3>
        <p className="text-gray-600 mb-4">
          当添加元素导致 <code>size</code> 超过当前数组容量时，ArrayList 会触发扩容操作：
        </p>
        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
          <li>计算新容量：<code>oldCapacity + (oldCapacity &gt;&gt; 1)</code>，即约为原来的 <strong>1.5 倍</strong>。</li>
          <li>创建一个新的、更大的数组。</li>
          <li>使用 <code>System.arraycopy</code> 将旧数组中的所有元素复制到新数组中。</li>
          <li>丢弃旧数组，将引用指向新数组。</li>
        </ol>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">代码示例</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
          <pre>{`// 扩容核心代码 (JDK 源码简化)
private void grow(int minCapacity) {
    int oldCapacity = elementData.length;
    // 新容量 = 旧容量 * 1.5
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    
    // 复制数组
    elementData = Arrays.copyOf(elementData, newCapacity);
}`}</pre>
        </div>
      </section>
    </div>
  );
};
