import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const LinkedListLab: React.FC = () => {
  return (
    <LabLayout
      title="LinkedList 链表结构"
      description="探索双向链表 (Doubly Linked List) 的内部结构，理解节点 (Node) 之间的引用关系及增删操作。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
