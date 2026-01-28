import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const Polymorphism: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.polymorphism.title')}
      description={t('labs.polymorphism.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
