import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const Interfaces: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.interfaces.title')}
      description={t('labs.interfaces.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
