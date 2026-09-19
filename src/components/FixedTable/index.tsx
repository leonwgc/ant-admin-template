/**
 * @file components/FixedTable/index.tsx
 * @author leon.wang
 */
import React, { useEffect, useRef, useState } from 'react';

import { Table } from '@derbysoft/neat-design';
import type { TableProps } from '@derbysoft/neat-design';

import './index.scss';

export interface FixedTableProps<
  RecordType extends object = object,
> extends Omit<TableProps<RecordType>, 'pagination' | 'scroll'> {
  /** Table pagination configuration */
  pagination?: Exclude<TableProps<RecordType>['pagination'], false>;
  /** Table scroll configuration; the vertical value is managed automatically */
  scroll?: TableProps<RecordType>['scroll'];
  /** Minimum table body height in pixels */
  minBodyHeight?: number;
}

/**
 * Table wrapper with fixed header, fixed columns, built-in pagination, and a
 * body height that follows the available container height.
 */
const FixedTable = <RecordType extends object = object>({
  className = '',
  pagination = {},
  scroll,
  minBodyHeight = 120,
  ...tableProps
}: FixedTableProps<RecordType>) => {
  const [current, setCurrent] = useState(pagination.current ?? 1);
  const [pageSize, setPageSize] = useState(pagination.pageSize ?? 10);
  const [bodyHeight, setBodyHeight] = useState(minBodyHeight);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateBodyHeight = () => {
      const header = container.querySelector<HTMLElement>(
        '.ds-table-thead, .ant-table-thead',
      );
      const paginationElement = container.querySelector<HTMLElement>(
        '.ds-table-pagination, .ds-pagination, .ant-pagination',
      );
      const availableHeight =
        container.clientHeight -
        (header?.offsetHeight ?? 48) -
        (paginationElement?.offsetHeight ?? 0);

      setBodyHeight(Math.max(availableHeight, minBodyHeight));
    };

    const resizeObserver = new ResizeObserver(updateBodyHeight);
    resizeObserver.observe(container);
    updateBodyHeight();

    return () => resizeObserver.disconnect();
  }, [minBodyHeight]);

  const handlePageChange = (nextCurrent: number, nextPageSize: number) => {
    setCurrent(nextCurrent);
    setPageSize(nextPageSize);
    pagination.onChange?.(nextCurrent, nextPageSize);
  };

  const tablePropsForRender = tableProps as TableProps<RecordType>;
  return (
    <div ref={containerRef} className={`fixed-table ${className}`}>
      <Table<RecordType>
        {...tablePropsForRender}
        className="fixed-table__table"
        pagination={{
          ...pagination,
          current: pagination.current ?? current,
          pageSize: pagination.pageSize ?? pageSize,
          onChange: handlePageChange,
        }}
        scroll={{ x: scroll?.x ?? 'max-content', y: bodyHeight }}
      />
    </div>
  );
};

export default FixedTable;
