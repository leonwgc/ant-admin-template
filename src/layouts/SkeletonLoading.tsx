import React from 'react';
import { Skeleton, type SkeletonProps } from '@derbysoft/neat-design';

/**
 * SkeletonLoading component renders a loading skeleton with customizable paragraph properties.
 *
 * @param {SkeletonProps} props - The properties for the Skeleton component.
 * @param {boolean | object} props.paragraph - The paragraph configuration for the Skeleton.
 * If a boolean is provided, it will be used directly. If an object is provided, it will be merged
 * with default values for rows and width.
 * @returns {JSX.Element} The rendered Skeleton component.
 */
const SkeletonLoading: React.FC<SkeletonProps> = (props) => {
  return <Skeleton active loading style={{ padding: 12 }} {...props} />;
};

export default SkeletonLoading;
