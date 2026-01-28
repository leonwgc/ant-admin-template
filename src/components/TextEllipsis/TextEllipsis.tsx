/**
 * @file components/TextEllipsis/TextEllipsis.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import './TextEllipsis.scss';

export interface TextEllipsisProps {
  /** Text content to display */
  children: React.ReactNode;
  /** Number of lines to display before truncating */
  rows?: number;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Tooltip to show full text on hover */
  title?: string;
}

/**
 * Text ellipsis component
 * Displays text with ellipsis when it exceeds specified number of rows
 */
export const TextEllipsis: FC<TextEllipsisProps> = ({
  children,
  rows = 1,
  className = '',
  style,
  title,
}) => {
  const ellipsisStyle: React.CSSProperties = {
    WebkitLineClamp: rows,
    ...style,
  };

  return (
    <div
      className={`text-ellipsis ${className}`}
      style={ellipsisStyle}
      title={title || (typeof children === 'string' ? children : undefined)}
    >
      {children}
    </div>
  );
};
