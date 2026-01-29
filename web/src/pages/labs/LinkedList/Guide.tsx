import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">LinkedList 内部原理</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        <code>LinkedList</code> 是基于<strong>双向链表</strong>实现的集合。
        与 ArrayList 不同，它的元素在内存中不是连续存储的，而是通过引用（指针）相互连接。
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Node 结构</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        链表中的每个元素都被封装在一个 <code>Node</code> 对象中，每个 Node 包含三个部分：
      </p>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
        <li><strong>item:</strong> 实际存储的数据元素。</li>
        <li><strong>next:</strong> 指向链表中下一个节点的引用。</li>
        <li><strong>prev:</strong> 指向链表中前一个节点的引用。</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">特点对比</h3>
      <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead className="text-xs text-gray-700 dark:text-gray-200 uppercase bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 border-b dark:border-gray-700">操作</th>
            <th className="px-6 py-3 border-b dark:border-gray-700">ArrayList</th>
            <th className="px-6 py-3 border-b dark:border-gray-700">LinkedList</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">随机访问 (get)</td>
            <td className="px-6 py-4 text-green-600 dark:text-green-400">O(1)</td>
            <td className="px-6 py-4 text-red-600 dark:text-red-400">O(n)</td>
          </tr>
          <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">头部插入/删除</td>
            <td className="px-6 py-4 text-red-600 dark:text-red-400">O(n)</td>
            <td className="px-6 py-4 text-green-600 dark:text-green-400">O(1)</td>
          </tr>
          <tr className="bg-white dark:bg-gray-900">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">尾部插入/删除</td>
            <td className="px-6 py-4 text-green-600 dark:text-green-400">O(1)</td>
            <td className="px-6 py-4 text-green-600 dark:text-green-400">O(1)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">代码示例</h3>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
        <pre>{`private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}`}</pre>
      </div>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">LinkedList Internal Principles</h3>
      <p className="text-gray-600 mb-4">
        <code>LinkedList</code> is a collection implemented based on a <strong>doubly linked list</strong>.
        Unlike ArrayList, its elements are not stored contiguously in memory but are connected via references (pointers).
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Node Structure</h3>
      <p className="text-gray-600 mb-4">
        Each element in the linked list is encapsulated in a <code>Node</code> object, which contains three parts:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
        <li><strong>item:</strong> The actual data element stored.</li>
        <li><strong>next:</strong> Reference to the next node in the list.</li>
        <li><strong>prev:</strong> Reference to the previous node in the list.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Feature Comparison</h3>
      <table className="min-w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b">Operation</th>
            <th className="px-6 py-3 border-b">ArrayList</th>
            <th className="px-6 py-3 border-b">LinkedList</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <td className="px-6 py-4 font-medium text-gray-900">Random Access (get)</td>
            <td className="px-6 py-4">O(1) - Very Fast</td>
            <td className="px-6 py-4">O(n) - Requires Traversal</td>
          </tr>
          <tr className="bg-gray-50 border-b">
            <td className="px-6 py-4 font-medium text-gray-900">Head Insertion/Deletion</td>
            <td className="px-6 py-4">O(n) - Requires Moving Elements</td>
            <td className="px-6 py-4">O(1) - Only Modifies References</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 font-medium text-gray-900">Memory Usage</td>
            <td className="px-6 py-4">Low (Array Only)</td>
            <td className="px-6 py-4">High (Each element needs a Node object)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Code Example</h3>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
        <pre>{`private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}`}</pre>
      </div>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
