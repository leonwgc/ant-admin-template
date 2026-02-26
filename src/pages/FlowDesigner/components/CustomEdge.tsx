/**
 * @file pages/FlowDesigner/components/CustomEdge.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import {
  EdgeProps,
  getBezierPath,
  BaseEdge,
} from 'reactflow';

/**
 * 自定义连接线组件
 */
export const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />;
};
