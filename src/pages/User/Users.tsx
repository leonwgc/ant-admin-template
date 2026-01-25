import { useAntdTable } from 'ahooks';
import type { TableColumnsType } from '@derbysoft/neat-design';
import {
  Button,
  Flex,
  Form,
  Input,
  Space,
  Table,
} from '@derbysoft/neat-design';
import { FlexRender, Item } from '@derbysoft/antd-form-builder';
import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import req from '~/req';

interface User {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const getTableData = (
  { current, pageSize },
  formData: FormData
): Promise<TableDataResult<User>> => {
  const query = `page=${current}&size=${pageSize}`;

  return req.post(`/users?${query}`, formData).then((res) => {
    return {
      total: res.data.total,
      list: res.data.list,
    };
  });
};

export default () => {
  // 使用命名空间，简化翻译键
  const { t } = useTranslation('pages.user');
  const [form] = Form.useForm();
  const {
    tableProps,
    search: { submit, reset },
  } = useAntdTable(getTableData, {
    form,
    defaultParams: [
      { current: 1, pageSize: 5 },
      { name: 'hello', age: '18', address: 'shanghai' },
    ] as any,
  });

  const columns: TableColumnsType<User> = [
    {
      title: t('users.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('users.columns.age'),
      dataIndex: 'age',
    },
    {
      title: t('users.columns.address'),
      dataIndex: 'address',
    },
  ];

  const layout = useMemo<Item[]>(
    () => [
      {
        type: Input,
        name: 'name',
        label: t('users.form.nameLabel'),
      },
      {
        type: Input,
        name: 'age',
        label: t('users.form.ageLabel'),
      },
      {
        type: Input,
        name: 'address',
        label: t('users.form.addressLabel'),
      },
      {
        render() {
          return (
            <Space>
              <Button htmlType="submit" type="primary" onClick={submit}>
                {t('users.actions.submit')}
              </Button>
              <Button htmlType="reset" onClick={reset}>
                {t('users.actions.reset')}
              </Button>
            </Space>
          );
        },
      },
    ],
    [submit, reset, t]
  );

  return (
    <div>
      <Flex justify="space-between" wrap>
        <h1>{t('users.pageTitle')}</h1>
        <Space>
          <Link to="./add">{t('users.actions.addUser')}</Link>
          <Link to="./edit">{t('users.actions.editUser')}</Link>
        </Space>
      </Flex>

      <Form form={form} layout="horizontal">
        <FlexRender wrap layout={layout} gap={16} />
      </Form>

      <Table
        columns={columns}
        rowKey="key"
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
    </div>
  );
};
