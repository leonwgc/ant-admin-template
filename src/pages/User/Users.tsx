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
      title: t('usersColName'),
      dataIndex: 'name',
    },
    {
      title: t('usersColAge'),
      dataIndex: 'age',
    },
    {
      title: t('usersColAddress'),
      dataIndex: 'address',
    },
  ];

  const layout = useMemo<Item[]>(
    () => [
      {
        type: Input,
        name: 'name',
        label: t('usersFormName'),
      },
      {
        type: Input,
        name: 'age',
        label: t('usersFormAge'),
      },
      {
        type: Input,
        name: 'address',
        label: t('usersFormAddress'),
      },
      {
        render() {
          return (
            <Space>
              <Button htmlType="submit" type="primary" onClick={submit}>
                {t('usersBtnSubmit')}
              </Button>
              <Button htmlType="reset" onClick={reset}>
                {t('usersBtnReset')}
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
        <h1>{t('usersTitle')}</h1>
        <Space>
          <Link to="./add">{t('usersBtnAdd')}</Link>
          <Link to="./edit">{t('usersBtnEdit')}</Link>
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
