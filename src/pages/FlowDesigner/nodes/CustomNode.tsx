/**
 * @file pages/FlowDesigner/nodes/CustomNode.tsx
 * @author leon.wang
 */
import React, { FC, memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  PlayCircleOutlined,
  ThunderboltOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import './CustomNode.scss';

export type CustomNodeType = 'start' | 'process' | 'decision' | 'end';

export interface CustomNodeData {
  label: string;
  type: CustomNodeType;
  description?: string;
}

/**
 * 自定义流程节点组件
 */
export const CustomNode: FC<NodeProps<CustomNodeData>> = memo(({ data, selected }) => {
  const { label, type, description } = data;

  const getIcon = () => {
    switch (type) {
      case 'start':
        return <PlayCircleOutlined />;
      case 'process':
        return <ThunderboltOutlined />;
      case 'decision':
        return <BranchesOutlined />;
      case 'end':
        return <CheckCircleOutlined />;
      default:
        return null;
    }
  };

  const getNodeClass = () => {
    return `custom-node custom-node--${type} ${selected ? 'custom-node--selected' : ''}`;
  };

  return (
    <div className={getNodeClass()}>
      {type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          className={`custom-node__handle custom-node__handle--target ${type === 'decision' ? 'custom-node__handle--decision-target' : ''}`}
        />
      )}

      <div className="custom-node__header">
        <div className="custom-node__icon">{getIcon()}</div>
        <div className="custom-node__label">{label}</div>
      </div>

      {description && <div className="custom-node__description">{description}</div>}

      {type !== 'end' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className={`custom-node__handle custom-node__handle--source ${type === 'decision' ? 'custom-node__handle--decision-source' : ''}`}
        />
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
