/**
 * @file pages/FlowDesigner/components/CustomEdge.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import {
  EdgeProps,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
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
  label,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {(label || data?.label) && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              background: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              border: '1px solid #d9d9d9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            className="custom-edge-label"
          >
            {label || data?.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
