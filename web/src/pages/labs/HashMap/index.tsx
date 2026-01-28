import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const HashMapLab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.hashMap.title')}
      description={t('labs.hashMap.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
