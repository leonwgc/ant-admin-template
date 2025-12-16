import React from 'react';
import { Modal, ModalProps } from 'antd';
import useModalStyle from './FullScreenModal.style';

interface FullScreenModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

/**
 * FullScreenModal component renders a modal that takes up the entire viewport.
 * It uses Ant Design's Modal component with custom styles to achieve the fullscreen effect.
 *
 * @component
 * @param {FullScreenModalProps & ModalProps} props - The properties passed to the component.
 * @param {boolean} props.open - Determines whether the modal is visible.
 * @param {() => void} props.onClose - Function to call when the modal is requested to be closed.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {object} [props.rest] - Additional properties to be passed to the Modal component.
 */
const FullScreenModal: React.FC<FullScreenModalProps & ModalProps> = ({
  open,
  onClose,
  children,
  ...rest
}) => {
  const { styles } = useModalStyle();
  const classNames = {
    body: styles['body'],
    content: styles['content'],
  };

  return (
    <Modal
      //   rootClassName="fullscreen-modal"
      width={'100vw'}
      style={{
        maxWidth: '100vw',
      }}
      classNames={classNames}
      open={open}
      title={null}
      footer={null}
      onCancel={onClose}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default FullScreenModal;
