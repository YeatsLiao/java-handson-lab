import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const PrimitiveTypes: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.primitiveTypes.title')}
      description={t('labs.primitiveTypes.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
