import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const References: React.FC = () => {
  return (
    <LabLayout
      title="引用类型与对象"
      description="理解 Java 中的引用类型 (Reference Type) 以及对象在堆内存 (Heap) 中的创建过程。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
