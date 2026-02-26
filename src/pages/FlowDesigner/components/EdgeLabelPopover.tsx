/**
 * @file pages/FlowDesigner/components/EdgeLabelPopover.tsx
 * @author leon.wang
 */
import React, { FC, useEffect, useState } from 'react';
import { Input, Button, Space } from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';

import './EdgeLabelPopover.scss';

export interface EdgeLabelPopoverProps {
  visible: boolean;
  initialLabel?: string;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onSave: (label: string) => void;
}

/**
 * 边标签编辑 Popover
 */
export const EdgeLabelPopover: FC<EdgeLabelPopoverProps> = ({
  visible,
  initialLabel = '',
  position,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const [label, setLabel] = useState(initialLabel);

  useEffect(() => {
    setLabel(initialLabel);
  }, [initialLabel]);

  const handleSave = () => {
    onSave(label);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!visible || !position) return null;

  return (
    <div
      className="edge-label-popover"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    >
      <div className="edge-label-popover__content">
        <div className="edge-label-popover__title">
          {t('pages.flow:edgeLabel')}
        </div>
        <Input
          value={label}
          onChange={(e) => {
            e.stopPropagation();
            setLabel(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={t('pages.flow:edgeLabelPlaceholder')}
          autoFocus
          maxLength={50}
        />
        <div className="edge-label-popover__footer">
          <Space>
            <Button size="small" onClick={onClose}>
              {t('pages.flow:cancel')}
            </Button>
            <Button size="small" type="primary" onClick={handleSave}>
              {t('pages.flow:save')}
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
