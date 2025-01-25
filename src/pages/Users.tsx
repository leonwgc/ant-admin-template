import { Flex, Form, Space, Table, Input, Button } from 'antd';
import React from 'react';
import { useAntdTable } from 'ahooks';
import type { TableColumnsType, TableProps } from 'antd';
import { post } from '../utils/fetch';
import { Link } from 'react-router';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface Result {
  total: number;
  list: DataType[];
}

const getTableData = (
  { current, pageSize, ...rest },
  formData
): Promise<Result> => {
  const query = `page=${current}&size=${pageSize}`;

  console.log(formData);

  return post(`/users?${query}`).then((res) => {
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
      { current: 2, pageSize: 5 },
      { name: 'hello', age: '18', address: 'shanghai' },
    ] as any,
  });

  const columns: TableColumnsType<DataType> = [
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

  return (
    <div>
      <Flex justify="space-between">
        <h1>Users</h1>
        <Space>
          <Link to="./add">Add User</Link>
          <Link to="./edit">Edit User</Link>
        </Space>
      </Flex>

      <Form form={form} layout="inline" style={{ margin: '16px 0' }}>
        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="age">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="address">
          <Input />
        </Form.Item>

        <Space>
          <Button htmlType="submit" type="primary" onClick={submit}>
            submit
          </Button>
          <Button htmlType="reset" onClick={reset}>
            reset
          </Button>
        </Space>
      </Form>

      <Table
        columns={columns}
        rowKey="key"
        style={{ overflow: 'auto' }}
        {...tableProps}
      />
    </div>
  );
};
