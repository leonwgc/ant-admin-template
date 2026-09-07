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

import usePageStateInStorage, {
  PageState,
} from '~/hooks/usePageStateInStorage';

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
          将筛选条件和分页状态保存到 sessionStorage。刷新页面后，表单会恢复上次的状态。
        </Typography.Paragraph>

        <Form<DemoFormValues>
          form={form}
          initialValues={formValues}
          layout="vertical"
          onValuesChange={onValuesChange}
        >
          <Space wrap align="start" className="use-page-state-in-storage-demo__form">
            <Form.Item label="关键词" name="keyword">
              <Input placeholder="输入关键词" style={{ width: 240 }} />
            </Form.Item>
            <Form.Item label="状态" name="status">
              <Select
                style={{ width: 160 }}
                options={[
                  { label: '全部', value: 'all' },
                  { label: '启用', value: 'active' },
                  { label: '停用', value: 'inactive' },
                ]}
              />
            </Form.Item>
            <Form.Item label="当前页" name="current">
              <Input style={{ width: 120 }} />
            </Form.Item>
            <Form.Item label="每页条数" name="pageSize">
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
          <Button onClick={() => form.submit()}>保存当前状态</Button>
          <Button onClick={handleReset}>恢复默认状态</Button>
        </Space>
      </Card>

      <Card title="当前持久化状态">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="storage key">
            use-page-state-in-storage-demo
          </Descriptions.Item>
          <Descriptions.Item label="keyword">{state.keyword || '空'}</Descriptions.Item>
          <Descriptions.Item label="status">{state.status}</Descriptions.Item>
          <Descriptions.Item label="current">{state.current}</Descriptions.Item>
          <Descriptions.Item label="pageSize">{state.pageSize}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default UsePageStateInStorageDemo;
