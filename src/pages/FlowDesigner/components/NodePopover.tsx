/**
 * @file pages/FlowDesigner/components/NodePopover.tsx
 * @author leon.wang
 */
import React, { FC, useEffect } from 'react';
import { Popover, Form, Input, Button, Space } from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import { Node } from 'reactflow';
import { CustomNodeData } from '../nodes';

import './NodePopover.scss';

export interface NodePopoverProps {
  visible: boolean;
  node: Node<CustomNodeData> | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onSave: (node: Node<CustomNodeData>) => void;
  onDelete: () => void;
}

/**
 * 节点配置 Popover
 */
export const NodePopover: FC<NodePopoverProps> = ({
  visible,
  node,
  position,
  onClose,
  onSave,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (node) {
      form.setFieldsValue({
        label: node.data.label,
        description: node.data.description || '',
      });
    }
  }, [node, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (node) {
        const updatedNode = {
          ...node,
          data: {
            ...node.data,
            label: values.label,
            description: values.description,
          },
        };
        onSave(updatedNode);
        onClose();
      }
    });
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  if (!node || !position || !visible) return null;

  const content = (
    <div className="node-popover">
      <div className="node-popover__title">{t('pages.flow:nodeConfig')}</div>

      <Form form={form} layout="vertical" size="small">
        <Form.Item
          name="label"
          label={t('pages.flow:nodeLabel')}
          rules={[{ required: true, message: t('pages.flow:nodeLabelRequired') }]}
        >
          <Input placeholder={t('pages.flow:nodeLabelPlaceholder')} />
        </Form.Item>

        <Form.Item name="description" label={t('pages.flow:nodeDescription')}>
          <Input.TextArea
            rows={3}
            placeholder={t('pages.flow:nodeDescriptionPlaceholder')}
          />
        </Form.Item>

        <div className="node-popover__info">
          <div className="node-popover__info-item">
            <span className="node-popover__info-label">{t('pages.flow:nodeType')}:</span>
            <span className="node-popover__info-value">{t(`pages.flow:${node.data.type}Node`)}</span>
          </div>
          <div className="node-popover__info-item">
            <span className="node-popover__info-label">{t('pages.flow:nodeId')}:</span>
            <span className="node-popover__info-value">{node.id}</span>
          </div>
        </div>
      </Form>

      <div className="node-popover__footer">
        <Space>
          <Button size="small" onClick={onClose}>
            {t('pages.flow:cancel')}
          </Button>
          <Button size="small" danger onClick={handleDelete}>
            {t('pages.flow:delete')}
          </Button>
          <Button size="small" type="primary" onClick={handleSave}>
            {t('pages.flow:save')}
          </Button>
        </Space>
      </div>
    </div>
  );

  return (
    <div
      className="node-popover-wrapper"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    >
      <Popover
        content={content}
        open={visible}
        onOpenChange={(open) => !open && onClose()}
        trigger="click"
        placement="rightTop"
      >
        <div style={{ width: 0, height: 0 }} />
      </Popover>
    </div>
  );
};
