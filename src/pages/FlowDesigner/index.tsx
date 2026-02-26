/**
 * @file pages/FlowDesigner/index.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowDesigner from './FlowDesigner';

/**
 * 流程设计器页面入口
 * 使用 ReactFlowProvider 包裹以提供上下文
 */
const FlowDesignerPage: FC = () => {
  return (
    <ReactFlowProvider>
      <FlowDesigner />
    </ReactFlowProvider>
  );
};

export default FlowDesignerPage;
