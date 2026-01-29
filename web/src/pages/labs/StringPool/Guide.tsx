import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">字符串的两种创建方式</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        在 Java 中，字符串是不可变的 (Immutable)。为了节省内存，JVM 维护了一个特殊的内存区域：<strong>字符串常量池 (String Constant Pool)</strong>。
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="border border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
          <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">1. 字面量赋值</h4>
          <code className="block bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-100 dark:border-green-800 mb-3 font-mono text-sm dark:text-gray-300">String s1 = "hello";</code>
          <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
            JVM 会先检查常量池中是否有 "hello"。如果有，直接返回引用；如果没有，则在池中创建并返回。
          </p>
        </div>
        
        <div className="border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">2. new 关键字</h4>
          <code className="block bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-100 dark:border-blue-800 mb-3 font-mono text-sm dark:text-gray-300">String s2 = new String("hello");</code>
          <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
            强制在<strong>堆内存 (Heap)</strong> 中创建一个新的 String 对象。即使常量池中已经有了 "hello"，它也会在堆中创建一个新副本。
          </p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">intern() 方法</h3>
      <p className="text-gray-600 dark:text-gray-300">
        调用 <code>s.intern()</code> 方法会尝试将字符串添加到常量池中。
        如果池中已经存在该字符串，则返回池中的引用；否则，将该字符串添加到池中并返回。
      </p>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Two Ways to Create Strings</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        In Java, strings are immutable. To save memory, the JVM maintains a special memory area: the <strong>String Constant Pool</strong>.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="border border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
          <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">1. Literal Assignment</h4>
          <code className="block bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-100 dark:border-green-800 mb-3 font-mono text-sm dark:text-gray-300">String s1 = "hello";</code>
          <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
            The JVM first checks if "hello" exists in the constant pool. If it does, it returns the reference; if not, it creates it in the pool and returns it.
          </p>
        </div>
        
        <div className="border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">2. New Keyword</h4>
          <code className="block bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-100 dark:border-blue-800 mb-3 font-mono text-sm dark:text-gray-300">String s2 = new String("hello");</code>
          <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
            Forces the creation of a new String object in the <strong>Heap</strong>. Even if "hello" already exists in the constant pool, it creates a new copy in the heap.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">intern() Method</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Calling <code>s.intern()</code> attempts to add the string to the constant pool.
        If the string already exists in the pool, it returns the reference from the pool; otherwise, it adds the string to the pool and returns it.
      </p>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
