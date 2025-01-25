import { Flex, Space, Table } from 'antd';
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

const getTableData = ({ current, pageSize }): Promise<Result> => {
  const query = `page=${current}&size=${pageSize}`;

  return post(`/users?${query}`).then((res) => {
    return {
      total: res.data.total,
      list: res.data.list,
    };
  });
};

export default () => {
  const { tableProps } = useAntdTable(getTableData);

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

      <Table
        columns={columns}
        rowKey="key"
        style={{ overflow: 'auto' }}
        {...tableProps}
      />
    </div>
  );
};
