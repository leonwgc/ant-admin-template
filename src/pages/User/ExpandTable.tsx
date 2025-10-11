import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import './ExpandTable.scss';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@derbysoft/neat-design-icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
  extra?: ExpandableTableProps[];
}

interface ExpandableTableProps {
  name: string;
  price: number;
  status: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 200 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
    width: 200,
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    extra: [
      { name: '服务名称1', price: 100, status: '已启用' },
      { name: '服务名称2', price: 200, status: '未启用' },
      { name: '服务名称3', price: 300, status: '已启用' },
    ],
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];

const expandColumns: TableColumnsType<ExpandableTableProps> = [
  {
    title: '服务名称',
    dataIndex: 'name',
    width: 200,
  },
  { title: '价格', dataIndex: 'price', width: 100 },
  { title: '状态', dataIndex: 'status' },
  { title: '操作', dataIndex: '', render: () => <a>停用</a>, width: 200 },
];

const App: React.FC = () => (
  <div className="expand-table">
    <Table<DataType>
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            columns={expandColumns}
            dataSource={record?.extra}
            pagination={false}
            tableLayout="fixed"
          />
        ),
        rowExpandable: (record) => record.extra?.length > 0,
        expandIcon: ({ expanded, onExpand, record }) =>
          record.extra?.length > 0 ? (
            expanded ? (
              <ArrowDownOutlined onClick={(e) => onExpand(record, e)} />
            ) : (
              <ArrowUpOutlined onClick={(e) => onExpand(record, e)} />
            )
          ) : null,
      }}
      tableLayout="fixed"
      dataSource={data}
    />
  </div>
);

export default App;
