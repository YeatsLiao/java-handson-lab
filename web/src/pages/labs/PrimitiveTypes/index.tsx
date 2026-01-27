import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const PrimitiveTypes: React.FC = () => {
  return (
    <LabLayout
      title="基础数据类型与内存"
      description="深入理解 Java 的 8 种基本数据类型，以及它们在栈内存 (Stack) 中的存储方式。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
