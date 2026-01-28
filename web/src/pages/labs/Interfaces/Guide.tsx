import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideZh: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">接口的作用</h3>
      <p className="text-gray-600 mb-4">
        <strong>接口 (Interface)</strong> 定义了一组行为契约，而不关注具体的实现细节。
        通过接口，我们可以实现系统模块间的<strong>解耦 (Decoupling)</strong>。
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">生活中的类比</h3>
      <p className="text-gray-600 mb-4">
        计算机的 USB 接口就是一个完美的例子：
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
        <li><strong>统一标准:</strong> 电脑只定义了 USB 插槽的标准（尺寸、电压、数据协议）。</li>
        <li><strong>多态实现:</strong> 无论是键盘、鼠标还是打印机，只要实现了 USB 标准，就可以插入电脑使用。</li>
        <li><strong>可扩展性:</strong> 未来发明了新设备，只要符合 USB 标准，电脑无需修改硬件即可支持。</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">面向接口编程</h3>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
        <pre>{`interface USB {
    void work();
}

class Keyboard implements USB {
    public void work() { System.out.println("Typing..."); }
}

class Computer {
    // 参数类型是接口，可以接受任何 USB 设备
    void connect(USB device) {
        device.work();
    }
}`}</pre>
      </div>
    </section>
  </div>
);

const GuideEn: React.FC = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Role of Interfaces</h3>
      <p className="text-gray-600 mb-4">
        <strong>Interface</strong> defines a contract of behavior without concerning implementation details.
        Through interfaces, we can achieve <strong>Decoupling</strong> between system modules.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Real-world Analogy</h3>
      <p className="text-gray-600 mb-4">
        The USB port on a computer is a perfect example:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
        <li><strong>Unified Standard:</strong> The computer only defines the USB slot standard (dimensions, voltage, data protocol).</li>
        <li><strong>Polymorphic Implementation:</strong> Whether it's a keyboard, mouse, or printer, as long as it implements the USB standard, it can be plugged in and used.</li>
        <li><strong>Extensibility:</strong> If a new device is invented in the future, as long as it conforms to the USB standard, the computer can support it without hardware modification.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Programming to Interfaces</h3>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
        <pre>{`interface USB {
    void work();
}

class Keyboard implements USB {
    public void work() { System.out.println("Typing..."); }
}

class Computer {
    // Parameter type is interface, accepts any USB device
    void connect(USB device) {
        device.work();
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
