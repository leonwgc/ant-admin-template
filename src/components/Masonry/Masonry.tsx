/**
 * @file src/components/Masonry/Masonry.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import React, { useEffect, useRef, useState, ReactNode, useMemo } from 'react';
import './Masonry.scss';
import { useLatest } from 'ahooks';

export interface MasonryProps<T = any> {
  /**
   * Array of items to render
   */
  items: T[];
  /**
   * Number of columns
   */
  columns?: number;
  /**
   * Gap between items (in pixels)
   */
  gap?: number;
  /**
   * Custom render function for each item
   */
  renderItem: (item: T, index: number) => ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Responsive columns configuration
   */
  responsive?: {
    [breakpoint: number]: number;
  };
}

/**
 * Masonry component for waterfall layout
 * Automatically distributes items across columns with optimal height balance
 */
const Masonry = <T,>({
  items,
  columns = 3,
  gap = 16,
  renderItem,
  className = '',
  responsive,
}: MasonryProps<T>): JSX.Element => {
  const [currentColumns, setCurrentColumns] = useState(columns);
  const containerRef = useRef<HTMLDivElement>(null);
  const lColumnRef = useLatest(currentColumns);

  // Handle responsive columns
  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const breakpoints = Object.keys(responsive)
        .map(Number)
        .sort((a, b) => b - a);
      let f = false;

      for (const breakpoint of breakpoints) {
        if (width >= breakpoint) {
          f = true;
          setCurrentColumns(responsive[breakpoint]);
          return;
        }
      }
      if (!f) {
        setCurrentColumns(1);
        return;
      }
      setCurrentColumns(columns);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive, columns]);

  const columnArrays = useMemo(() => {
    const columnArrays: T[][] = Array.from(
      { length: currentColumns },
      () => []
    );

    for (let i = 0; i < items.length; i++) {
      columnArrays[i % currentColumns].push(items[i]);
    }

    return columnArrays;
  }, [items, currentColumns]);

  useEffect(() => {
    if (lColumnRef.current !== columns) {
      setCurrentColumns(columns);
    }
  }, [columns, lColumnRef]);

  return (
    <div
      ref={containerRef}
      className={`masonry ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {columnArrays.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="masonry__column">
          {columnItems.map((item, itemIndex) => {
            const originalIndex = items.indexOf(item);
            return (
              <div
                key={originalIndex}
                className="masonry__item"
                style={{ marginBottom: `${gap}px` }}
              >
                {renderItem(item, originalIndex)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
