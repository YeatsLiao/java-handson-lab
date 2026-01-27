import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const Polymorphism: React.FC = () => {
  return (
    <LabLayout
      title="继承与多态 (Inheritance & Polymorphism)"
      description="可视化类继承体系，理解方法重写 (Override) 与动态绑定 (Dynamic Binding) 机制。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
