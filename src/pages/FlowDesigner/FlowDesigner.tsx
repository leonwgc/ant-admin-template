/**
 * @file pages/FlowDesigner/FlowDesigner.tsx
 * @author leon.wang
 */
import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { message } from '@derbysoft/neat-design';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  EdgeTypes,
  useReactFlow,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTranslation } from 'react-i18next';

import { CustomNode, CustomNodeData, CustomNodeType } from './nodes';
import { CustomEdge } from './components/CustomEdge';
import { Toolbar } from './components/Toolbar';
import { NodePanel } from './components/NodePanel';

import './FlowDesigner.scss';

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 50 },
    data: { label: '开始', type: 'start' },
  },
];

const initialEdges: Edge[] = [];

/**
 * 可视化流程设计器
 */
const FlowDesigner: FC = () => {
  const { t } = useTranslation();
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(null);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
  const [panelVisible, setPanelVisible] = useState(false);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // 自定义节点类型
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  // 自定义连接线类型
  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  // 连接节点
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: 'custom',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // 边选中事件
  const onEdgeClick = useCallback((_event: React.MouseEvent, edge: Edge) => {
    setSelectedEdges([edge.id]);
  }, []);

  // 画布点击事件（取消选中）
  const onPaneClick = useCallback(() => {
    setSelectedEdges([]);
  }, []);

  // 添加节点
  const handleAddNode = useCallback(
    (type: CustomNodeType) => {
      const id = `${Date.now()}`;

      // 计算新节点位置：在开始节点右侧排列
      const startX = 250; // 开始节点的 x 坐标
      const startY = 50;  // 开始节点的 y 坐标
      const offsetX = 250; // 水平间距
      const offsetY = 150; // 垂直间距

      // 根据当前节点数量计算位置，形成网格布局
      const nodeCount = nodes.length;
      const col = Math.floor(nodeCount / 3); // 第几列
      const row = nodeCount % 3; // 第几行

      const newNode: Node<CustomNodeData> = {
        id,
        type: 'custom',
        position: {
          x: startX + (col * offsetX),
          y: startY + (row * offsetY)
        },
        data: {
          label: t(`pages.flow:${type}Node`),
          type,
        },
      };
      setNodes((nds) => [...nds, newNode]);
      message.success(t('pages.flow:nodeAdded'));
    },
    [nodes.length, setNodes, t]
  );

  // 节点点击
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<CustomNodeData>) => {
      setSelectedNode(node);
      setPanelVisible(true);
    },
    []
  );

  // 保存节点配置
  const handleSaveNode = useCallback(
    (updatedNode: Node<CustomNodeData>) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
      );
      message.success(t('pages.flow:nodeSaved'));
    },
    [setNodes, t]
  );

  // 删除节点
  const handleDeleteNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id)
      );
      setPanelVisible(false);
      setSelectedNode(null);
      message.success(t('pages.flow:nodeDeleted'));
    }
  }, [selectedNode, setNodes, setEdges, t]);

  // 保存流程
  const handleSave = useCallback(() => {
    const flowData = {
      nodes,
      edges,
      timestamp: Date.now(),
    };

    // 保存到 localStorage
    localStorage.setItem('flowDesign', JSON.stringify(flowData));

    message.success(t('pages.flow:flowSaved'));

    // 这里可以调用 API 保存到服务器
    // await saveFlowToServer(flowData);
  }, [nodes, edges, t]);

  // 清空画布
  const handleClear = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    message.success(t('pages.flow:flowCleared'));
  }, [setNodes, setEdges, t]);

  // 键盘事件：Delete/Backspace 删除选中的连接
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === 'Delete' || event.key === 'Backspace') &&
        selectedEdges.length > 0 &&
        !panelVisible // 不在编辑节点时才响应
      ) {
        setEdges((eds) => eds.filter((edge) => !selectedEdges.includes(edge.id)));
        setSelectedEdges([]);
        message.success(t('pages.flow:edgeDeleted'));
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEdges, panelVisible, setEdges, t]);

  // 放大
  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  // 缩小
  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  // 适应视图
  const handleFitView = useCallback(() => {
    fitView({ padding: 0.2, duration: 300 });
  }, [fitView]);

  return (
    <div className="flow-designer">
      <Toolbar
        onAddNode={handleAddNode}
        onSave={handleSave}
        onClear={handleClear}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitView={handleFitView}
      />

      <div className="flow-designer__canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{
            type: 'custom',
            animated: true,
          }}
          fitView
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          <Controls />
        </ReactFlow>
      </div>

      <NodePanel
        visible={panelVisible}
        node={selectedNode}
        onClose={() => setPanelVisible(false)}
        onSave={handleSaveNode}
        onDelete={handleDeleteNode}
      />
    </div>
  );
};

export default FlowDesigner;
