/**
 * @file pages/FlowDesigner/components/Toolbar.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Button, Space } from '@derbysoft/neat-design';
import {
  PlayCircleOutlined,
  ThunderboltOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  ClearOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './Toolbar.scss';

export interface ToolbarProps {
  onAddNode: (type: 'start' | 'process' | 'decision' | 'end') => void;
  onSave: () => void;
  onClear: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

/**
 * 流程设计器工具栏
 */
export const Toolbar: FC<ToolbarProps> = ({
  onAddNode,
  onSave,
  onClear,
  onZoomIn,
  onZoomOut,
  onFitView,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flow-toolbar">
      <div className="flow-toolbar__section">
        <div className="flow-toolbar__label">{t('pages.flow:addNode')}:</div>
        <Space>
          <Button
            icon={<PlayCircleOutlined />}
            onClick={() => onAddNode('start')}
            size="small"
          >
            {t('pages.flow:startNode')}
          </Button>
          <Button
            icon={<ThunderboltOutlined />}
            onClick={() => onAddNode('process')}
            size="small"
          >
            {t('pages.flow:processNode')}
          </Button>
          <Button
            icon={<BranchesOutlined />}
            onClick={() => onAddNode('decision')}
            size="small"
          >
            {t('pages.flow:decisionNode')}
          </Button>
          <Button
            icon={<CheckCircleOutlined />}
            onClick={() => onAddNode('end')}
            size="small"
          >
            {t('pages.flow:endNode')}
          </Button>
        </Space>
      </div>

      <div className="flow-toolbar__divider" />

      <div className="flow-toolbar__section">
        <Space>
          <Button icon={<ZoomInOutlined />} onClick={onZoomIn} size="small">
            {t('pages.flow:zoomIn')}
          </Button>
          <Button icon={<ZoomOutOutlined />} onClick={onZoomOut} size="small">
            {t('pages.flow:zoomOut')}
          </Button>
          <Button icon={<FullscreenOutlined />} onClick={onFitView} size="small">
            {t('pages.flow:fitView')}
          </Button>
        </Space>
      </div>

      <div className="flow-toolbar__divider" />

      <div className="flow-toolbar__section">
        <Space>
          <Button type="primary" icon={<SaveOutlined />} onClick={onSave} size="small">
            {t('pages.flow:save')}
          </Button>
          <Button danger icon={<ClearOutlined />} onClick={onClear} size="small">
            {t('pages.flow:clear')}
          </Button>
        </Space>
      </div>
    </div>
  );
};
