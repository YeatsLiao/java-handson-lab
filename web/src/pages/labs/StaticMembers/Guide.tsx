import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Static vs Instance</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        在 Java 中，成员变量分为<strong>静态变量 (static)</strong>和<strong>实例变量 (instance)</strong>。
        理解它们的区别对于掌握内存管理至关重要。
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">对比分析</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 border-b dark:border-gray-700">特性</th>
              <th className="px-6 py-3 border-b dark:border-gray-700">实例变量 (Instance Variable)</th>
              <th className="px-6 py-3 border-b dark:border-gray-700">静态变量 (Static Variable)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">所属</td>
              <td className="px-6 py-4">属于具体的对象 (Object)</td>
              <td className="px-6 py-4">属于类 (Class)</td>
            </tr>
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">内存位置</td>
              <td className="px-6 py-4">堆内存 (Heap)</td>
              <td className="px-6 py-4">方法区 / 元空间 (Method Area)</td>
            </tr>
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">副本数量</td>
              <td className="px-6 py-4">每个对象有一份独立的副本</td>
              <td className="px-6 py-4">所有对象共享同一份副本</td>
            </tr>
            <tr className="bg-white dark:bg-gray-900">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">生命周期</td>
              <td className="px-6 py-4">随对象创建而生，随对象回收而亡</td>
              <td className="px-6 py-4">随类加载而生，程序结束才销毁</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">常见用途</h3>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
        <li><strong>计数器:</strong> 统计创建了多少个对象实例。</li>
        <li><strong>常量:</strong> 如 <code>Math.PI</code>，全局共享且不变。</li>
        <li><strong>工具方法:</strong> 如 <code>Math.max()</code>，不需要创建对象即可使用。</li>
      </ul>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Static vs Instance</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        In Java, member variables are divided into <strong>Static Variables (static)</strong> and <strong>Instance Variables (instance)</strong>.
        Understanding their difference is crucial for mastering memory management.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Comparative Analysis</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 border-b dark:border-gray-700">Feature</th>
              <th className="px-6 py-3 border-b dark:border-gray-700">Instance Variable</th>
              <th className="px-6 py-3 border-b dark:border-gray-700">Static Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">Belongs to</td>
              <td className="px-6 py-4">Specific Object</td>
              <td className="px-6 py-4">Class</td>
            </tr>
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">Memory Location</td>
              <td className="px-6 py-4">Heap Memory</td>
              <td className="px-6 py-4">Method Area / Metaspace</td>
            </tr>
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">Copies</td>
              <td className="px-6 py-4">Each object has an independent copy</td>
              <td className="px-6 py-4">All objects share the same copy</td>
            </tr>
            <tr className="bg-white dark:bg-gray-900">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">Lifecycle</td>
              <td className="px-6 py-4">Created with object, destroyed with object</td>
              <td className="px-6 py-4">Created with class loading, destroyed on program exit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Common Uses</h3>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
        <li><strong>Counter:</strong> Count how many object instances have been created.</li>
        <li><strong>Constants:</strong> Such as <code>Math.PI</code>, globally shared and immutable.</li>
        <li><strong>Utility Methods:</strong> Such as <code>Math.max()</code>, usable without creating an object.</li>
      </ul>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
