import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">继承与多态</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        <strong>多态 (Polymorphism)</strong> 是面向对象编程的核心特性之一，允许我们使用父类型的引用来操作子类型的对象。
        在 Java 中，这通常通过<strong>方法重写 (Override)</strong> 和<strong>动态绑定 (Dynamic Binding)</strong> 来实现。
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">关键机制</h3>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
        <li>
          <strong>向上转型 (Upcasting):</strong> 
          <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm mx-1">Shape s = new Circle();</code>
          <br/>
          虽然变量类型是 <code>Shape</code>，但实际指向的是堆内存中的 <code>Circle</code> 对象。
        </li>
        <li>
          <strong>动态绑定:</strong>
          当调用 <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm mx-1">s.draw()</code> 时，
          JVM 会在运行时检查对象的实际类型（Circle），并执行 Circle 类中重写的 draw 方法，而不是 Shape 类的方法。
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">代码示例</h3>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
        <pre>{`class Shape {
    void draw() { System.out.println("Shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Circle"); }
}

// 运行时多态
Shape s = new Circle();
s.draw(); // 输出 "Circle"`}</pre>
      </div>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Inheritance and Polymorphism</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        <strong>Polymorphism</strong> is one of the core features of Object-Oriented Programming, allowing us to manipulate objects of child types using references of parent types.
        In Java, this is usually achieved through <strong>Method Overriding</strong> and <strong>Dynamic Binding</strong>.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Key Mechanisms</h3>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
        <li>
          <strong>Upcasting:</strong> 
          <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm mx-1">Shape s = new Circle();</code>
          <br/>
          Although the variable type is <code>Shape</code>, it actually points to a <code>Circle</code> object in heap memory.
        </li>
        <li>
          <strong>Dynamic Binding:</strong>
          When calling <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm mx-1">s.draw()</code>,
          the JVM checks the actual type of the object (Circle) at runtime and executes the overridden draw method in the Circle class, not the method in the Shape class.
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Code Example</h3>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
        <pre>{`class Shape {
    void draw() { System.out.println("Shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Circle"); }
}

// Runtime Polymorphism
Shape s = new Circle();
s.draw(); // Output "Circle"`}</pre>
      </div>
    </section>
  </div>
);

export const Guide: React.FC = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
