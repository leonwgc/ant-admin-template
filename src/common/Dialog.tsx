import React from 'react';
import { Modal, styled } from 'react-uni-comps';

type Props = {
  /** 标题 */
  title?: React.ReactNode;
  /** 尾部 */
  footer?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
  /** 是否显示右上角关闭 */
  closable?: boolean;
  /** 是否可见 */
  visible?: boolean;
  /**  关闭回调 */
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const StyledModal = styled(Modal)`
  padding: 24px 24px 16px;

  .close {
    font-size: 20px;
  }

  .header {
    font-size: 16px;
    line-height: 20px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #1a1a1a;
  }

  .body {
    line-height: 20px;
    margin-top: 24px;
    font-size: 14px;

    .ant-form-item {
      margin-bottom: 16px;

      .ant-form-item-label {
        line-height: 20px;
      }
    }
  }
`;

/** 新风格弹框 */
export default function Dialog(props: Props): React.ReactElement {
  const { visible, onClose, style, closable = true, title, children, ...rest } = props;
  return (
    <StyledModal
      {...rest}
      style={{
        top: 120,
        ...style,
      }}
      closeOnMaskClick={false}
      visible={visible}
      closable={closable}
      onClose={onClose}
      header={title}
    >
      {children}
    </StyledModal>
  );
}
