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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const layout = useMemo<Item[]>(
    () => [
      {
        type: Input,
        name: 'name',
        label: 'Name',
      },
      {
        type: Input,
        name: 'age',
        label: 'Age',
      },
      {
        type: Input,
        name: 'address',
        label: 'Address',
      },
      {
        render() {
          return (
            <Space>
              <Button htmlType="submit" type="primary" onClick={submit}>
                submit
              </Button>
              <Button htmlType="reset" onClick={reset}>
                reset
              </Button>
            </Space>
          );
        },
      },
    ],
    [submit, reset]
  );

  return (
    <div>
      <Flex justify="space-between" wrap>
        <h1>Users</h1>
        <Space>
          <Link to="./add">Add User</Link>
          <Link to="./edit">Edit User</Link>
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
