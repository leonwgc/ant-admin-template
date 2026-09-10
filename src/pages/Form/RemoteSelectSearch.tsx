/**
 * @file pages/Form/RemoteSelectSearch.tsx
 * @author leon.wang
 */

import React, { FC, useEffect, useState } from 'react';

import {
  Button,
  Card,
  Form,
  Select,
  Space,
  Typography,
  message,
} from '@derbysoft/neat-design';
import { useRequest } from 'ahooks';
import { useTranslation } from 'react-i18next';

import {
  mockSearchUsersApi,
  type RemoteUserOption,
} from '~/services/mockRemoteSearch';

import './RemoteSelectSearch.scss';

interface FormValues {
  user: string;
}

const RemoteSelectSearch: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();
  const [options, setOptions] = useState<RemoteUserOption[]>([]);

  const { loading, run } = useRequest(mockSearchUsersApi, {
    manual: true,
    debounceWait: 300,
    onSuccess: setOptions,
  });

  useEffect(() => {
    run('');
  }, [run]);

  const handleSearch = (keyword: string) => {
    run(keyword);
  };

  const handleSubmit = ({ user }: FormValues) => {
    const selectedUser = options.find((option) => option.value === user);
    if (selectedUser) {
      message.success(
        t('pages.form:remoteSelectSearchSelected', {
          name: selectedUser.label,
          defaultValue: 'Selected {{name}}',
        } as const),
      );
    }
  };

  return (
    <div className="remote-select-search">
      <Card className="remote-select-search__card">
        <Typography.Title level={2}>
          {t('pages.form:remoteSelectSearchTitle')}
        </Typography.Title>
        <Typography.Paragraph>
          {t('pages.form:remoteSelectSearchDescription')}
        </Typography.Paragraph>

        <Form<FormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="remote-select-search__form"
        >
          <Form.Item
            label={t('pages.form:remoteSelectSearchLabel')}
            name="user"
            rules={[
              {
                required: true,
                message: t('pages.form:remoteSelectSearchRequired'),
              },
            ]}
          >
            <Select
              showSearch
              // allowClear
              filterOption={false}
              loading={loading}
              options={options.map((option) => ({
                label: `${option.label} (${option.email})`,
                value: option.value,
              }))}
              onSearch={handleSearch}
              onFocus={() => {
                if (!options.length) run('');
              }}
              notFoundContent={
                loading
                  ? t('pages.form:remoteSelectSearchLoading')
                  : t('pages.form:remoteSelectSearchEmpty')
              }
              placeholder={t('pages.form:remoteSelectSearchPlaceholder')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Space>
            <Button type="primary" htmlType="submit">
              {t('pages.form:remoteSelectSearchSubmit')}
            </Button>
            <Button onClick={() => form.resetFields()}>
              {t('pages.form:remoteSelectSearchReset')}
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default RemoteSelectSearch;
