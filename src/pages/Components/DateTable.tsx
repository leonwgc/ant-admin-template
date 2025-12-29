/**
 * @file src/pages/Components/DateTable.tsx
 * @author leon.wang
 */

import React, { useState, useMemo } from 'react';
import { InputNumber, Card, Space } from '@derbysoft/neat-design';
import './DateTable.scss';

interface DateTableProps {
  /**
   * Number of fixed columns on the left
   */
  fixedColumns?: number;
  /**
   * Total number of columns (date columns)
   */
  totalColumns?: number;
}

/**
 * DateTable component with sticky columns
 */
const DateTable: React.FC<DateTableProps> = ({
  fixedColumns: initialFixedColumns = 2,
  totalColumns = 30,
}) => {
  const [fixedColumns, setFixedColumns] = useState<number>(initialFixedColumns);

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
  }, [totalColumns]);

  // Generate sample data rows
  const dataRows = useMemo(() => {
    return Array.from({ length: 10 }, (_, rowIndex) => ({
      id: rowIndex + 1,
      name: `Item ${rowIndex + 1}`,
      category: `Category ${(rowIndex % 3) + 1}`,
      values: Array.from({ length: totalColumns }, () => Math.floor(Math.random() * 100)),
    }));
  }, [totalColumns]);

  return (
    <div className="date-table-page">
      <Card title="Date Table with Sticky Columns">
        <Space style={{ marginBottom: 16 }}>
          <span>Fixed Columns:</span>
          <InputNumber
            min={0}
            max={3}
            value={fixedColumns}
            onChange={(value) => setFixedColumns(value as number)}
          />
        </Space>

        <div className="date-table-container">
          <table className="date-table" data-fixed-columns={fixedColumns}>
            <caption className="date-table__caption">
              30-Day Schedule Table with {fixedColumns} Fixed Column(s)
            </caption>
            <colgroup>
              <col className="date-table__col--fixed" />
              <col className="date-table__col--fixed" />
              <col className="date-table__col--fixed" />
              {dateColumns.map((_, index) => (
                <col key={index} className="date-table__col--date" />
              ))}
            </colgroup>
            <thead className="date-table__header">
              <tr>
                <th className="date-table__th date-table__th--fixed">ID</th>
                <th className="date-table__th date-table__th--fixed">Name</th>
                <th className="date-table__th date-table__th--fixed">Category</th>
                {dateColumns.map((col, index) => (
                  <th
                    key={index}
                    className={`date-table__th date-table__th--date ${
                      col.dayOfWeek === 0 || col.dayOfWeek === 6 ? 'date-table__th--weekend' : ''
                    }`}
                  >
                    <div className="date-table__th-content">
                      <div className="date-table__date">{col.dateStr}</div>
                      <div className="date-table__day">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][col.dayOfWeek]}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="date-table__body">
              {dataRows.map((row) => (
                <tr key={row.id} className="date-table__row">
                  <td className="date-table__td date-table__td--fixed">{row.id}</td>
                  <td className="date-table__td date-table__td--fixed">{row.name}</td>
                  <td className="date-table__td date-table__td--fixed">{row.category}</td>
                  {row.values.map((value, index) => {
                    const isWeekend =
                      dateColumns[index].dayOfWeek === 0 || dateColumns[index].dayOfWeek === 6;
                    return (
                      <td
                        key={index}
                        className={`date-table__td date-table__td--date ${
                          isWeekend ? 'date-table__td--weekend' : ''
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

export default DateTable;
