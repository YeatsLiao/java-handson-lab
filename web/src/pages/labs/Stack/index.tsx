import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const Stack: React.FC = () => {
  return (
    <LabLayout
      title="方法调用栈 (Stack Frame)"
      description="可视化 Java 方法调用的压栈 (Push) 与出栈 (Pop) 过程，理解局部变量的生命周期。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
