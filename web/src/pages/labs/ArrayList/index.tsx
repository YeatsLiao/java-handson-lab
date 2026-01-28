import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const ArrayListLab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.arrayList.title')}
      description={t('labs.arrayList.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
