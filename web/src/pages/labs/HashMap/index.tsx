import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const HashMapLab: React.FC = () => {
  return (
    <LabLayout
      title="HashMap 工作原理"
      description="深入理解 HashMap 的底层实现，包括哈希计算、数组+链表结构以及哈希冲突 (Collision) 的处理方式。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
