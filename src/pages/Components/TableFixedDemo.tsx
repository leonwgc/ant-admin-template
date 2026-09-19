/**
 * @file pages/Components/TableFixedDemo.tsx
 * @author leon.wang
 */
import React, { FC, useMemo } from 'react';

import { Button, Space, Tag, Typography } from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import type { TableColumnsType } from '@derbysoft/neat-design';

import { FixedTable } from 'components/FixedTable';

import './TableFixedDemo.scss';

const { Title, Paragraph, Text } = Typography;

interface TableFixedRow {
  key: string;
  id: string;
  name: string;
  department: string;
  role: string;
  city: string;
  hotel: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  score: number;
  status: 'active' | 'pending' | 'disabled';
  updatedAt: string;
}

/**
 * Fixed table demo page
 * Demonstrates fixed header, fixed left columns, and fixed right action column
 */
const TableFixedDemo: FC = () => {
  const { t } = useTranslation();

  const dataSource = useMemo<TableFixedRow[]>(() => {
    const departments = [
      'Sales',
      'Operations',
      'Finance',
      'Marketing',
      'Support',
    ];
    const roles = ['Manager', 'Supervisor', 'Specialist', 'Coordinator'];
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu'];
    const hotels = [
      'Vista Bay',
      'Urban Nest',
      'Skyline Inn',
      'River Crown',
      'Harbor One',
    ];
    const statuses: Array<TableFixedRow['status']> = [
      'active',
      'pending',
      'disabled',
    ];

    return Array.from({ length: 64 }, (_, index) => {
      const row = index + 1;
      const q1 = 70 + (row % 17);
      const q2 = 72 + (row % 19);
      const q3 = 74 + (row % 13);
      const q4 = 76 + (row % 11);

      return {
        key: String(row),
        id: `U-${String(row).padStart(4, '0')}`,
        name: `Employee ${row}`,
        department: departments[index % departments.length],
        role: roles[index % roles.length],
        city: cities[index % cities.length],
        hotel: hotels[index % hotels.length],
        q1,
        q2,
        q3,
        q4,
        score: Math.round((q1 + q2 + q3 + q4) / 4),
        status: statuses[index % statuses.length],
        updatedAt: `2026-09-${String((index % 28) + 1).padStart(2, '0')} 10:${String(index % 60).padStart(2, '0')}`,
      };
    });
  }, []);

  const getStatusText = (status: TableFixedRow['status']) => {
    if (status === 'active') {
      return t('pages.components:tableFixedStatusActive');
    }
    if (status === 'pending') {
      return t('pages.components:tableFixedStatusPending');
    }
    return t('pages.components:tableFixedStatusDisabled');
  };

  const getStatusColor = (status: TableFixedRow['status']) => {
    if (status === 'active') {
      return 'green';
    }
    if (status === 'pending') {
      return 'orange';
    }
    return 'red';
  };

  const columns: TableColumnsType<TableFixedRow> = [
    {
      title: t('pages.components:tableFixedColId'),
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: t('pages.components:tableFixedColName'),
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: t('pages.components:tableFixedColDepartment'),
      dataIndex: 'department',
      key: 'department',
      width: 150,
    },
    {
      title: t('pages.components:tableFixedColRole'),
      dataIndex: 'role',
      key: 'role',
      width: 140,
    },
    {
      title: t('pages.components:tableFixedColCity'),
      dataIndex: 'city',
      key: 'city',
      width: 140,
    },
    {
      title: t('pages.components:tableFixedColHotel'),
      dataIndex: 'hotel',
      key: 'hotel',
      width: 170,
    },
    {
      title: t('pages.components:tableFixedColQuarter1'),
      dataIndex: 'q1',
      key: 'q1',
      width: 110,
    },
    {
      title: t('pages.components:tableFixedColQuarter2'),
      dataIndex: 'q2',
      key: 'q2',
      width: 110,
    },
    {
      title: t('pages.components:tableFixedColQuarter3'),
      dataIndex: 'q3',
      key: 'q3',
      width: 110,
    },
    {
      title: t('pages.components:tableFixedColQuarter4'),
      dataIndex: 'q4',
      key: 'q4',
      width: 110,
    },
    {
      title: t('pages.components:tableFixedColScore'),
      dataIndex: 'score',
      key: 'score',
      width: 130,
      render: (score: number) => <Text strong>{score}</Text>,
    },
    {
      title: t('pages.components:tableFixedColStatus'),
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: TableFixedRow['status']) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: t('pages.components:tableFixedColUpdatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
    },
    {
      title: t('pages.components:tableFixedColAction'),
      key: 'action',
      width: 180,
      fixed: 'right',
      render: () => (
        <Space size="small">
          <Button type="link" size="small">
            {t('pages.components:tableFixedActionView')}
          </Button>
          <Button type="link" size="small">
            {t('pages.components:tableFixedActionEdit')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-fixed-demo">
      <div className="table-fixed-demo__hero">
        <Title level={2} className="table-fixed-demo__title">
          {t('pages.components:tableFixedTitle')}
        </Title>
        <Paragraph className="table-fixed-demo__desc">
          {t('pages.components:tableFixedDesc')}
        </Paragraph>
      </div>

      <FixedTable<TableFixedRow>
        rowKey="key"
        columns={columns}
        dataSource={dataSource}
        hidePaginationWhenSinglePage
        pagination={{
          total: dataSource.length,
          showQuickJumper: false,
          showSizeChanger: true,
          pageSizeOptions: [3, 10, 50, 100],
        }}
      />
    </div>
  );
};

export default TableFixedDemo;
