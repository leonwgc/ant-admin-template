/**
 * @file pages/Css/StickyTableDemo.tsx
 * @author leon.wang
 */

import React, { FC, useState, useMemo } from 'react';
import { InputNumber, Card, Space } from '@derbysoft/neat-design';
import './StickyTableDemo.scss';

interface StickyTableDemoProps {}

/**
 * Column configuration interface (similar to Ant Design Table)
 */
interface ColumnConfig {
  /** Column key */
  key: string;
  /** Column title */
  title: string;
  /** Column width in pixels */
  width: number;
  /** Whether to fix this column (left or false) */
  fixed?: 'left' | false;
  /** Custom render function */
  render?: (value: any, row: any, index: number) => React.ReactNode;
  /** CSS class name */
  className?: string;
}

/**
 * Calculate left offset for fixed columns
 */
const calculateFixedOffsets = (
  columns: ColumnConfig[]
): Map<string, number> => {
  const offsets = new Map<string, number>();
  let leftOffset = 0;

  columns.forEach((col) => {
    if (col.fixed === 'left') {
      offsets.set(col.key, leftOffset);
      leftOffset += col.width;
    }
  });

  return offsets;
};

/**
 * HTML Table with CSS sticky columns demo
 * Demonstrates dynamic sticky column configuration
 */
const StickyTableDemo: FC<StickyTableDemoProps> = () => {
  const [fixedColumnCount, setFixedColumnCount] = useState<number>(2);
  const totalDateColumns = 30;

  // Generate date columns data
  const dateColumns = useMemo(() => {
    const today = new Date();
    const columns: { date: Date; dayOfWeek: number; dateStr: string }[] = [];

    for (let i = 0; i < totalDateColumns; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      columns.push({ date, dayOfWeek, dateStr });
    }

    return columns;
  }, []);

  // Column configuration (similar to Ant Design Table columns prop)
  const columns: ColumnConfig[] = useMemo(() => {
    const baseColumns: ColumnConfig[] = [
      {
        key: 'id',
        title: 'ID',
        width: 100,
        fixed: fixedColumnCount > 0 ? 'left' : false,
      },
      {
        key: 'name',
        title: 'Name',
        width: 150,
        fixed: fixedColumnCount > 1 ? 'left' : false,
      },
      {
        key: 'category',
        title: 'Category',
        width: 120,
        fixed: fixedColumnCount > 2 ? 'left' : false,
      },
    ];

    // Add date columns
    const dateColumnConfigs: ColumnConfig[] = dateColumns.map((col, index) => ({
      key: `date-${index}`,
      title: col.dateStr,
      width: 80,
      fixed: false,
      className:
        col.dayOfWeek === 0 || col.dayOfWeek === 6 ? 'weekend' : undefined,
      render: (value, row) => (
        <div className="sticky-table__th-content">
          <div className="sticky-table__date">{col.dateStr}</div>
          <div className="sticky-table__day">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][col.dayOfWeek]}
          </div>
        </div>
      ),
    }));

    return [...baseColumns, ...dateColumnConfigs];
  }, [fixedColumnCount, dateColumns]);

  // Calculate fixed column offsets
  const fixedOffsets = useMemo(() => {
    return calculateFixedOffsets(columns);
  }, [columns]);

  // Generate sample data rows
  const dataRows = useMemo(() => {
    return Array.from({ length: 10 }, (_, rowIndex) => {
      const row: Record<string, any> = {
        id: rowIndex + 1,
        name: `Item ${rowIndex + 1}`,
        category: `Category ${(rowIndex % 3) + 1}`,
      };

      // Add date values
      dateColumns.forEach((_, index) => {
        row[`date-${index}`] = Math.floor(Math.random() * 100);
      });

      return row;
    });
  }, [dateColumns]);

  return (
    <div className="sticky-table-demo">
      <Card title="Flexible Sticky Table (Ant Design Style)">
        <Space style={{ marginBottom: 16 }}>
          <span>Fixed Columns:</span>
          <InputNumber
            min={0}
            max={3}
            value={fixedColumnCount}
            onChange={(value) => setFixedColumnCount(value as number)}
          />
          <span style={{ color: '#999', marginLeft: 8 }}>
            (Scroll horizontally to see sticky effect)
          </span>
        </Space>

        <div className="sticky-table-container">
          <table className="sticky-table">
            <thead className="sticky-table__header">
              <tr>
                {columns.map((col) => {
                  const isFixed = col.fixed === 'left';
                  const leftOffset = isFixed ? fixedOffsets.get(col.key) : undefined;

                  return (
                    <th
                      key={col.key}
                      className={`sticky-table__th ${
                        isFixed ? 'sticky-table__th--fixed' : ''
                      } ${col.className ? `sticky-table__th--${col.className}` : ''}`}
                      style={{
                        width: col.width,
                        minWidth: col.width,
                        ...(isFixed && leftOffset !== undefined
                          ? { left: leftOffset }
                          : {}),
                      }}
                    >
                      {col.render ? col.render(null, null, 0) : col.title}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="sticky-table__body">
              {dataRows.map((row, rowIndex) => (
                <tr key={row.id} className="sticky-table__row">
                  {columns.map((col) => {
                    const isFixed = col.fixed === 'left';
                    const leftOffset = isFixed ? fixedOffsets.get(col.key) : undefined;
                    const value = row[col.key];

                    return (
                      <td
                        key={col.key}
                        className={`sticky-table__td ${
                          isFixed ? 'sticky-table__td--fixed' : ''
                        } ${col.className ? `sticky-table__td--${col.className}` : ''}`}
                        style={{
                          width: col.width,
                          minWidth: col.width,
                          ...(isFixed && leftOffset !== undefined
                            ? { left: leftOffset }
                            : {}),
                        }}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StickyTableDemo;
