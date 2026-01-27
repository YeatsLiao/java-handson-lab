import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const GCLab: React.FC = () => {
  return (
    <LabLayout
      title="垃圾回收机制 (Garbage Collection)"
      description="可视化 Java 堆内存结构 (Heap) 及垃圾回收过程，理解 Eden、Survivor 和 Old Gen 区域的作用。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
