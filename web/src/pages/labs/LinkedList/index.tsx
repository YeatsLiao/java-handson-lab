import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const LinkedListLab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.linkedList.title')}
      description={t('labs.linkedList.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
