import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">HashMap 内部结构</h3>
        <p className="text-gray-600 mb-4">
          HashMap 基于<strong>哈希表 (Hash Table)</strong> 实现，底层是一个 Node 数组。
          它通过计算 Key 的哈希值来决定键值对 (Key-Value) 在数组中的存储位置。
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">核心机制</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>
            <strong>哈希计算:</strong> 
            调用 Key 的 <code>hashCode()</code> 方法，并进行高位运算扰动，最终计算出数组下标：
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm mx-1">index = (n - 1) & hash</code>
          </li>
          <li>
            <strong>哈希冲突 (Collision):</strong> 
            当两个不同的 Key 计算出相同的数组下标时，发生冲突。
          </li>
          <li>
            <strong>链地址法 (Chaining):</strong> 
            Java 使用链表（或红黑树）来存储冲突的元素。同一个桶（Bucket）中的元素通过 <code>next</code> 指针连接。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Java 8+ 优化</h3>
        <p className="text-gray-600 mb-4">
          当链表长度超过阈值 (TREEIFY_THRESHOLD = 8) 且数组长度大于 64 时，链表会转换为<strong>红黑树 (Red-Black Tree)</strong>，
          将查找复杂度从 O(n) 降低到 O(log n)。
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">代码示例</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
          <pre>{`// 计算下标
static int indexFor(int h, int length) {
    return h & (length - 1);
}

// 节点结构
static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}`}</pre>
        </div>
      </section>
    </div>
  );
};
