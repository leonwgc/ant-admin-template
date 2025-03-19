import React from 'react';
import { Skeleton, SkeletonProps } from '@derbysoft/neat-design';

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
