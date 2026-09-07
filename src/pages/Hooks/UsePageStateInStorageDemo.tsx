/**
 * @file src/pages/Hooks/UsePageStateInStorageDemo.tsx
 * @author leon.wang
 */

import React, { FC } from 'react';

import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';

import usePageStateInStorage from '~/hooks/usePageStateInStorage';
import type { PageState } from '~/hooks/usePageStateInStorage';

import './UsePageStateInStorageDemo.scss';

interface DemoState extends PageState {
  keyword: string;
  status: string;
}

interface DemoFormValues {
  keyword: string;
  status: string;
  current: string;
  pageSize: string;
}

const initialState: DemoState = {
  keyword: '',
  status: 'all',
  current: '1',
  pageSize: '10',
};

const stateToFormValues = (state: Partial<DemoState>): DemoFormValues => ({
  keyword: state.keyword ?? '',
  status: state.status ?? 'all',
  current: String(state.current ?? 1),
  pageSize: String(state.pageSize ?? 10),
});

/**
 * Demonstrates restoring page filters and pagination from sessionStorage.
 */
const UsePageStateInStorageDemo: FC = () => {
  const { t } = useTranslation();
  const {
    form,
    state,
    formValues,
    onValuesChange,
    resetState,
  } = usePageStateInStorage<DemoState, DemoFormValues>({
    key: 'use-page-state-in-storage-demo',
    initialState,
    stateToFormValues,
    formValuesToState: (values) => ({
      keyword: values.keyword,
      status: values.status,
      current: values.current,
      pageSize: values.pageSize,
    }),
  });

  const handleReset = () => {
    resetState();
    form.setFieldsValue(stateToFormValues(initialState));
  };

  return (
    <div className="use-page-state-in-storage-demo">
      <Card>
        <Typography.Title level={2}>usePageStateInStorage</Typography.Title>
        <Typography.Paragraph>
          {t('common:pageStateStorageDescription')}
        </Typography.Paragraph>

        <Form<DemoFormValues>
          form={form}
          initialValues={formValues}
          layout="vertical"
          onValuesChange={onValuesChange}
        >
          <Space wrap align="start" className="use-page-state-in-storage-demo__form">
            <Form.Item label={t('common:pageStateStorageKeyword')} name="keyword">
              <Input placeholder={t('common:pageStateStorageKeywordPh')} style={{ width: 240 }} />
            </Form.Item>
            <Form.Item label={t('common:pageStateStorageStatus')} name="status">
              <Select
                style={{ width: 160 }}
                options={[
                  { label: t('common:pageStateStorageAll'), value: 'all' },
                  { label: t('common:pageStateStorageActive'), value: 'active' },
                  { label: t('common:pageStateStorageInactive'), value: 'inactive' },
                ]}
              />
            </Form.Item>
            <Form.Item label={t('common:pageStateStorageCurrent')} name="current">
              <Input style={{ width: 120 }} />
            </Form.Item>
            <Form.Item label={t('common:pageStateStoragePageSize')} name="pageSize">
              <Select
                style={{ width: 120 }}
                options={[
                  { label: '10', value: '10' },
                  { label: '20', value: '20' },
                  { label: '50', value: '50' },
                ]}
              />
            </Form.Item>
          </Space>
        </Form>

        <Space wrap>
          <Button onClick={handleReset}>{t('common:pageStateStorageReset')}</Button>
        </Space>
      </Card>

      <Card title={t('common:pageStateStorageCurrentState')}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label={t('common:pageStateStorageStorageKey')}>
            use-page-state-in-storage-demo
          </Descriptions.Item>
          <Descriptions.Item label={t('common:pageStateStorageKeyword')}>
            {state.keyword || t('common:pageStateStorageEmpty')}
          </Descriptions.Item>
          <Descriptions.Item label={t('common:pageStateStorageStatus')}>
            {t(`common:pageStateStorage${state.status === 'all' ? 'All' : state.status === 'active' ? 'Active' : 'Inactive'}`)}
          </Descriptions.Item>
          <Descriptions.Item label={t('common:pageStateStorageCurrent')}>
            {state.current}
          </Descriptions.Item>
          <Descriptions.Item label={t('common:pageStateStoragePageSize')}>
            {state.pageSize}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default UsePageStateInStorageDemo;
