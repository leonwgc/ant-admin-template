/**
 * @file pages/Css/StickyTableDemo.tsx
 * @author leon.wang
 */

import React, { FC, useState, useMemo } from 'react';
import { InputNumber, Card, Space } from '@derbysoft/neat-design';
import './StickyTableDemo.scss';

interface StickyTableDemoProps {}

/**
 * HTML Table with CSS sticky columns demo
 * Demonstrates dynamic sticky column configuration
 */
const StickyTableDemo: FC<StickyTableDemoProps> = () => {
  const [fixedColumns, setFixedColumns] = useState<number>(2);
  const totalColumns = 30;

  // Generate date columns (30 days from today)
  const dateColumns = useMemo(() => {
    const today = new Date();
    const columns: { date: Date; dayOfWeek: number; dateStr: string }[] = [];

    for (let i = 0; i < totalColumns; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

      columns.push({ date, dayOfWeek, dateStr });
    }

    return columns;
  }, []);

  // Generate sample data rows
  const dataRows = useMemo(() => {
    return Array.from({ length: 10 }, (_, rowIndex) => ({
      id: rowIndex + 1,
      name: `Item ${rowIndex + 1}`,
      category: `Category ${(rowIndex % 3) + 1}`,
      values: Array.from({ length: totalColumns }, () =>
        Math.floor(Math.random() * 100)
      ),
    }));
  }, []);

  return (
    <div className="sticky-table-demo">
      <Card title="HTML Table with CSS Sticky Columns">
        <Space style={{ marginBottom: 16 }}>
          <span>Fixed Columns:</span>
          <InputNumber
            min={0}
            max={3}
            value={fixedColumns}
            onChange={(value) => setFixedColumns(value as number)}
          />
          <span style={{ color: '#999', marginLeft: 8 }}>
            (Scroll horizontally to see sticky effect)
          </span>
        </Space>

        <div className="sticky-table-container">
          <table className="sticky-table">
            <colgroup>
              <col
                className="sticky-table__col--fixed"
                data-fixed-column={0 < fixedColumns ? '0' : undefined}
              />
              <col
                className="sticky-table__col--fixed"
                data-fixed-column={1 < fixedColumns ? '1' : undefined}
              />
              <col
                className="sticky-table__col--fixed"
                data-fixed-column={2 < fixedColumns ? '2' : undefined}
              />
              {dateColumns.map((_, index) => (
                <col key={index} className="sticky-table__col--date" />
              ))}
            </colgroup>

            <thead className="sticky-table__header">
              <tr>
                <th
                  className="sticky-table__th sticky-table__th--fixed"
                  data-fixed-column={0 < fixedColumns ? '0' : undefined}
                >
                  ID
                </th>
                <th
                  className="sticky-table__th sticky-table__th--fixed"
                  data-fixed-column={1 < fixedColumns ? '1' : undefined}
                >
                  Name
                </th>
                <th
                  className="sticky-table__th sticky-table__th--fixed"
                  data-fixed-column={2 < fixedColumns ? '2' : undefined}
                >
                  Category
                </th>
                {dateColumns.map((col, index) => (
                  <th
                    key={index}
                    className={`sticky-table__th sticky-table__th--date ${
                      col.dayOfWeek === 0 || col.dayOfWeek === 6
                        ? 'sticky-table__th--weekend'
                        : ''
                    }`}
                  >
                    <div className="sticky-table__th-content">
                      <div className="sticky-table__date">{col.dateStr}</div>
                      <div className="sticky-table__day">
                        {
                          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
                            col.dayOfWeek
                          ]
                        }
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="sticky-table__body">
              {dataRows.map((row) => (
                <tr key={row.id} className="sticky-table__row">
                  <td
                    className="sticky-table__td sticky-table__td--fixed"
                    data-fixed-column={0 < fixedColumns ? '0' : undefined}
                  >
                    {row.id}
                  </td>
                  <td
                    className="sticky-table__td sticky-table__td--fixed"
                    data-fixed-column={1 < fixedColumns ? '1' : undefined}
                  >
                    {row.name}
                  </td>
                  <td
                    className="sticky-table__td sticky-table__td--fixed"
                    data-fixed-column={2 < fixedColumns ? '2' : undefined}
                  >
                    {row.category}
                  </td>
                  {row.values.map((value, index) => {
                    const isWeekend =
                      dateColumns[index].dayOfWeek === 0 ||
                      dateColumns[index].dayOfWeek === 6;
                    return (
                      <td
                        key={index}
                        className={`sticky-table__td sticky-table__td--date ${
                          isWeekend ? 'sticky-table__td--weekend' : ''
                        }`}
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
