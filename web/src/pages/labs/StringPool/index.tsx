import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const StringPool: React.FC = () => {
  return (
    <LabLayout
      title="字符串常量池 (String Pool)"
      description="深入理解 Java 字符串的不可变性以及字符串常量池的内存优化机制。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
