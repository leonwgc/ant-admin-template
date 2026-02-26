/**
 * @file pages/FlowDesigner/components/CustomEdge.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  useReactFlow,
} from 'reactflow';
import { CloseCircleFilled } from '@derbysoft/neat-design-icons';
import './CustomEdge.scss';

/**
 * 自定义连接线组件
 * 在连接线中间显示删除按钮
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
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="custom-edge-button"
        >
          <CloseCircleFilled
            className="custom-edge-button__icon"
            onClick={onEdgeClick}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
