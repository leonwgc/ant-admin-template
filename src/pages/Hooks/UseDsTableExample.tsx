/**
 * @file src/pages/Hooks/UseDsTableExample.tsx
 * @author leon.wang
 */

import React from 'react';
import { Card, Table, Button, Form, Input, Space, Select, Tag, Typography } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
  TableOutlined,
} from '@ant-design/icons';
import useDsTable from '~/hooks/useDsTable';
import type { ObjectType, ResponseDataType } from '~/hooks/useDsTable';
import './UseDsTableExample.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * Mock API - Simulate backend data fetching
 */
const mockUserData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    department: 'Marketing',
    joinDate: '2023-03-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2022-11-10',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-08-05',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-05-12',
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2021-12-01',
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward.norton@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-02-28',
  },
  {
    id: 8,
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Marketing',
    joinDate: '2022-07-15',
  },
  {
    id: 9,
    name: 'George Harris',
    email: 'george.harris@example.com',
    role: 'User',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-04-10',
  },
  {
    id: 10,
    name: 'Helen Taylor',
    email: 'helen.taylor@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-06-22',
  },
  {
    id: 11,
    name: 'Ivan Martinez',
    email: 'ivan.martinez@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-09-18',
  },
  {
    id: 12,
    name: 'Julia Anderson',
    email: 'julia.anderson@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-01-30',
  },
  {
    id: 13,
    name: 'Kevin White',
    email: 'kevin.white@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Marketing',
    joinDate: '2022-10-05',
  },
  {
    id: 14,
    name: 'Laura Davis',
    email: 'laura.davis@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-03-15',
  },
  {
    id: 15,
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
    role: 'User',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-12-20',
  },
];

/**
 * Mock API request function
 */
const fetchUserList = (params: ObjectType): Promise<{ data: ResponseDataType }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const { pageNum = 0, pageSize = 10, name, role, status, sorts } = params;

      // Filter data
      let filteredData = [...mockUserData];

      if (name) {
        filteredData = filteredData.filter((user) =>
          user.name.toLowerCase().includes((name as string).toLowerCase())
        );
      }

      if (role) {
        filteredData = filteredData.filter((user) => user.role === role);
      }

      if (status) {
        filteredData = filteredData.filter((user) => user.status === status);
      }

      // Sort data
      if (sorts && Array.isArray(sorts) && sorts.length > 0) {
        const { property, direction } = sorts[0];
        filteredData.sort((a, b) => {
          const aValue = a[property];
          const bValue = b[property];
          if (direction === 'ASC') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      // Pagination
      const start = (pageNum as number) * (pageSize as number);
      const end = start + (pageSize as number);
      const paginatedData = filteredData.slice(start, end);

      // Return mock response
      resolve({
        data: {
          result: 'success',
          timestamp: Date.now(),
          data: {
            totals: filteredData.length,
            totalPages: Math.ceil(filteredData.length / (pageSize as number)),
            pageSize: pageSize as number,
            pageNum: pageNum as number,
            records: paginatedData,
          },
        },
      });
    }, 800); // 800ms delay to simulate network
  });
};

/**
 * UseDsTableExample component - Demonstrates useDsTable hook usage
 */
const UseDsTableExample: React.FC = () => {
  const { tableProps, form, submit, reset } = useDsTable(
    fetchUserList as any,
    // Optional: Transform form values before sending to API
    (formValues) => {
      console.log('Form values before transform:', formValues);
      return formValues;
    },
    // Optional: Transform response data
    (data: any) => {
      console.log('Response data before transform:', data);
      return {
        total: data.totals,
        list: data.records,
      };
    }
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text: string) => (
        <Space>
          <UserOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      sorter: true,
      render: (role: string) => {
        const colorMap: Record<string, string> = {
          Admin: 'red',
          Manager: 'blue',
          User: 'green',
        };
        return <Tag color={colorMap[role]}>{role}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      sorter: true,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 140,
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 130,
      sorter: true,
    },
  ];

  return (
    <div className="use-ds-table-example">
      <Title level={2}>
        <TableOutlined /> useDsTable Hook Example
      </Title>

      <Card className="use-ds-table-example__info" style={{ marginBottom: 24 }}>
        <Title level={4}>Hook Features:</Title>
        <Paragraph>
          <ul>
            <li>
              <Text strong>Automatic Pagination:</Text> Built-in pagination handling with
              customizable page sizes
            </li>
            <li>
              <Text strong>Search & Filter:</Text> Integrated form-based filtering with
              debounce (400ms)
            </li>
            <li>
              <Text strong>Sorting Support:</Text> Click column headers to sort data (ASC/DESC)
            </li>
            <li>
              <Text strong>Loading States:</Text> Automatic loading indicators during data
              fetching
            </li>
            <li>
              <Text strong>Error Handling:</Text> Built-in error handling with notifications
            </li>
            <li>
              <Text strong>Data Transformation:</Text> Optional transform functions for request
              and response
            </li>
            <li>
              <Text strong>Form Integration:</Text> Seamless integration with Ant Design Form
            </li>
          </ul>
        </Paragraph>
      </Card>

      <Card
        title="User Management Table"
        extra={
          <Space>
            <Tag color="blue">Mock Data</Tag>
            <Tag color="green">Total: {mockUserData.length} users</Tag>
          </Space>
        }
      >
        <Form form={form} className="use-ds-table-example__search-form">
          <Space size="middle" wrap>
            <Form.Item name="name" style={{ marginBottom: 0 }}>
              <Input
                placeholder="Search by name"
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
                allowClear
              />
            </Form.Item>

            <Form.Item name="role" style={{ marginBottom: 0 }}>
              <Select
                placeholder="Select role"
                style={{ width: 150 }}
                allowClear
                options={[
                  { label: 'Admin', value: 'Admin' },
                  { label: 'Manager', value: 'Manager' },
                  { label: 'User', value: 'User' },
                ]}
              />
            </Form.Item>

            <Form.Item name="status" style={{ marginBottom: 0 }}>
              <Select
                placeholder="Select status"
                style={{ width: 150 }}
                allowClear
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
              />
            </Form.Item>

            <Button type="primary" icon={<SearchOutlined />} onClick={submit}>
              Search
            </Button>

            <Button icon={<ReloadOutlined />} onClick={reset}>
              Reset
            </Button>
          </Space>
        </Form>

        <Table
          {...tableProps}
          columns={columns}
          rowKey="id"
          style={{ marginTop: 16 }}
          bordered
        />
      </Card>

      <Card
        title="Code Example"
        style={{ marginTop: 24 }}
        className="use-ds-table-example__code-card"
      >
        <pre className="use-ds-table-example__code">
          {`// 1. Import the hook
import useDsTable from '~/hooks/useDsTable';

// 2. Define mock API function
const fetchUserList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          result: 'success',
          timestamp: Date.now(),
          data: {
            totals: 100,
            totalPages: 10,
            pageSize: 10,
            pageNum: 0,
            records: [...data],
          },
        },
      });
    }, 800);
  });
};

// 3. Use the hook in component
const MyComponent = () => {
  const { tableProps, form, submit, reset } = useDsTable(
    fetchUserList,
    // Optional: Transform form values
    (formValues) => formValues,
    // Optional: Transform response data
    (data) => ({
      total: data.totals,
      list: data.records,
    })
  );

  return (
    <div>
      <Form form={form}>
        <Form.Item name="name">
          <Input placeholder="Search..." />
        </Form.Item>
        <Button onClick={submit}>Search</Button>
        <Button onClick={reset}>Reset</Button>
      </Form>

      <Table {...tableProps} columns={columns} rowKey="id" />
    </div>
  );
};`}
        </pre>
      </Card>
    </div>
  );
};

export default UseDsTableExample;
