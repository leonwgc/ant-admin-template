/**
 * @file pages/FlowDesigner/components/NodePanel.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Drawer, Form, Input, Button, Space } from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import { Node } from 'reactflow';
import { CustomNodeData } from '../nodes';

import './NodePanel.scss';

export interface NodePanelProps {
  visible: boolean;
  node: Node<CustomNodeData> | null;
  onClose: () => void;
  onSave: (node: Node<CustomNodeData>) => void;
  onDelete: () => void;
}

/**
 * 节点配置面板
 */
export const NodePanel: FC<NodePanelProps> = ({ visible, node, onClose, onSave, onDelete }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  React.useEffect(() => {
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

  if (!node) return null;

  return (
    <Drawer
      title={t('pages.flow:nodeConfig')}
      open={visible}
      onClose={onClose}
      width={400}
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={onClose}>{t('pages.flow:cancel')}</Button>
          <Button danger onClick={onDelete}>
            {t('pages.flow:delete')}
          </Button>
          <Button type="primary" onClick={handleSave}>
            {t('pages.flow:save')}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="label"
          label={t('pages.flow:nodeLabel')}
          rules={[{ required: true, message: t('pages.flow:nodeLabelRequired') }]}
        >
          <Input placeholder={t('pages.flow:nodeLabelPlaceholder')} />
        </Form.Item>

        <Form.Item name="description" label={t('pages.flow:nodeDescription')}>
          <Input.TextArea
            rows={4}
            placeholder={t('pages.flow:nodeDescriptionPlaceholder')}
          />
        </Form.Item>

        <div className="node-panel__info">
          <div className="node-panel__info-item">
            <span className="node-panel__info-label">{t('pages.flow:nodeType')}:</span>
            <span className="node-panel__info-value">{t(`pages.flow:${node.data.type}Node`)}</span>
          </div>
          <div className="node-panel__info-item">
            <span className="node-panel__info-label">{t('pages.flow:nodeId')}:</span>
            <span className="node-panel__info-value">{node.id}</span>
          </div>
        </div>
      </Form>
    </Drawer>
  );
};
