import React from 'react';
import { Modal, Button } from 'antd';
import { SuccessGeneralDefaultMedium } from 'antd-illustrations';
import './EmailSuccessModal.scss';

interface EmailSuccessModalProps {
  open: boolean;
  onClose: () => void;
  onSetPassword: () => void;
}

/**
 * EmailSuccessModal component displays a success message after email binding
 * @param open - Controls modal visibility
 * @param onClose - Callback function when modal is closed
 * @param onSetPassword - Callback function when user clicks "Set Password" button
 */
const EmailSuccessModal: React.FC<EmailSuccessModalProps> = ({
  open,
  onClose,
  onSetPassword,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      centered
      className="email-success-modal"
    >
      <div className="email-success-modal__content">
        <div className="email-success-modal__illustration">
          <SuccessGeneralDefaultMedium />
        </div>

        <h2 className="email-success-modal__title">邮箱添加成功！</h2>

        <div className="email-success-modal__description">
          您已成功绑定邮箱，为保障账号安全与完整功能使用，请尽快设置登录密码。
          <br />
          请点击下方按钮完成操作，3 分钟即可搞定～
        </div>

        <Button
          type="primary"
          onClick={onSetPassword}
          className="email-success-modal__button"
        >
          前往设置密码
        </Button>
      </div>
    </Modal>
  );
};

export default EmailSuccessModal;
