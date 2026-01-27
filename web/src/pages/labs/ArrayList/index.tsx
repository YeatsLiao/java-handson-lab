import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const ArrayListLab: React.FC = () => {
  return (
    <LabLayout
      title="ArrayList 扩容机制 (ArrayList Resizing)"
      description="探索 ArrayList 的动态扩容原理，理解底层数组如何随着元素的添加而自动增长。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
