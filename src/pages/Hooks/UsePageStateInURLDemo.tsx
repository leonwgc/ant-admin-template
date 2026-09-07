/**
 * @file src/pages/Hooks/UsePageStateInURLDemo.tsx
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

import usePageStateInURL from '~/hooks/usePageStateInURL';
import type { PageUrlState } from '~/hooks/usePageStateInURL';

import './UsePageStateInURLDemo.scss';

interface DemoState extends PageUrlState {
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
 * Demonstrates synchronizing page filters and pagination with URL parameters.
 */
const UsePageStateInURLDemo: FC = () => {
  const { t } = useTranslation();
  const { form, urlState, formValues, onValuesChange, setUrlState } =
    usePageStateInURL<DemoState, DemoFormValues>({
      initialState,
      urlToFormValues: stateToFormValues,
      formValuesToUrl: (values) => ({
        keyword: values.keyword,
        status: values.status,
        current: values.current,
        pageSize: values.pageSize,
      }),
    });

  const handleReset = () => {
    setUrlState(initialState);
    form.setFieldsValue(stateToFormValues(initialState));
  };

  return (
    <div className="use-page-state-in-url-demo">
      <Card>
        <Typography.Title level={2}>usePageStateInURL</Typography.Title>
        <Typography.Paragraph>
          {t('common:pageStateURLDescription')}
        </Typography.Paragraph>

        <Form<DemoFormValues>
          form={form}
          initialValues={formValues}
          layout="vertical"
          onValuesChange={onValuesChange}
        >
          <Space
            wrap
            align="start"
            className="use-page-state-in-url-demo__form"
          >
            <Form.Item
              label={t('common:pageStateStorageKeyword')}
              name="keyword"
            >
              <Input
                placeholder={t('common:pageStateStorageKeywordPh')}
                style={{ width: 240 }}
              />
            </Form.Item>
            <Form.Item
              label={t('common:pageStateStorageStatus')}
              name="status"
            >
              <Select
                style={{ width: 160 }}
                options={[
                  { label: t('common:pageStateStorageAll'), value: 'all' },
                  {
                    label: t('common:pageStateStorageActive'),
                    value: 'active',
                  },
                  {
                    label: t('common:pageStateStorageInactive'),
                    value: 'inactive',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={t('common:pageStateStorageCurrent')}
              name="current"
            >
              <Input style={{ width: 120 }} />
            </Form.Item>
            <Form.Item
              label={t('common:pageStateStoragePageSize')}
              name="pageSize"
            >
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

        <Button onClick={handleReset}>
          {t('common:pageStateStorageReset')}
        </Button>
      </Card>

      <Card title={t('common:pageStateURLCurrentState')}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label={t('common:pageStateStorageKeyword')}>
            {urlState.keyword || t('common:pageStateStorageEmpty')}
          </Descriptions.Item>
          <Descriptions.Item label={t('common:pageStateStorageStatus')}>
            {t(
              `common:pageStateStorage${
                urlState.status === 'all'
                  ? 'All'
                  : urlState.status === 'active'
                    ? 'Active'
                    : 'Inactive'
              }`,
            )}
          </Descriptions.Item>
          <Descriptions.Item label={t('common:pageStateStorageCurrent')}>
            {urlState.current}
          </Descriptions.Item>
          <Descriptions.Item label={t('common:pageStateStoragePageSize')}>
            {urlState.pageSize}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default UsePageStateInURLDemo;
