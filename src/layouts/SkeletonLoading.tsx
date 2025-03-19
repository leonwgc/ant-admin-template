import React from 'react';
import { Skeleton, SkeletonProps } from '@derbysoft/neat-design';

/**
 * SkeletonLoading component renders a loading skeleton with customizable paragraph properties.
 *
 * @param {SkeletonProps} props - The properties for the Skeleton component.
 * @param {boolean | object} props.paragraph - The paragraph configuration for the Skeleton.
 * If a boolean is provided, it will be used directly. If an object is provided, it will be merged
 * with default values for rows and width.
 * @returns {JSX.Element} The rendered Skeleton component.
 */
const SkeletonLoading: React.FC<SkeletonProps> = ({ paragraph, ...props }) => {
  return (
    <Skeleton
      active
      loading
      title={null}
      paragraph={
        typeof paragraph === 'boolean'
          ? paragraph
          : {
              rows: 6,
              width: ['50%'],
              ...paragraph,
            }
      }
      style={{ padding: 12 }}
      {...props}
    />
  );
};

export default SkeletonLoading;
