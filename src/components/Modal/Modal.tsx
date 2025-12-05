/**
 * @file src/components/Modal/Modal.tsx
 * @author leon.wang
 */
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useLayoutEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import Mask from './Mask';

export type Props = React.HTMLAttributes<HTMLDivElement> & {
  visible?: boolean;
  onClose?: () => void;
  duration?: number;
  children?: React.ReactNode;
  closeOnMaskClick?: boolean;
  style?: React.CSSProperties;
  className?: string;
  mask?: boolean;
  mountContainer?: Element;
  zIndex?: number;
};

type MousePosition = {
  x: number;
  y: number;
};

let mousePosition: MousePosition = null;

if (typeof window !== 'undefined') {
  const getClickPosition = (e: MouseEvent) => {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
    setTimeout(() => {
      mousePosition = null;
    }, 150);
  };

  document.documentElement.addEventListener('click', getClickPosition, true);
}

/**
 * Modal component that renders a modal dialog with animation and mask.
 *
 * @component
 * @param {Props} props - The properties passed to the Modal component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {boolean} props.visible - Determines whether the modal is visible or not.
 * @param {() => void} props.onClose - Callback function to be called when the modal is requested to be closed.
 * @param {boolean} [props.closeOnMaskClick=true] - Determines whether the modal should close when the mask is clicked.
 * @param {number} [props.duration=0.3] - The duration of the modal animation in seconds.
 * @param {boolean} [props.mask=true] - Determines whether a mask should be displayed behind the modal.
 * @param {HTMLElement} [props.mountContainer=document.body] - The container element where the modal should be mounted.
 * @param {number} [props.zIndex=1000] - The z-index of the modal.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the modal's wrapper div.
 * @returns {React.ReactPortal|null} The modal component rendered inside a portal, or null if no mount node is available.
 */
const Modal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    visible,
    onClose,
    closeOnMaskClick = true,
    duration = 0.3,
    mask = true,
    mountContainer = document.body,
    zIndex = 1000,
    ...rest
  } = props;
  const wrapRef = useRef<HTMLDivElement>();
  const [pos, setPos] = useState(null);

  useImperativeHandle(ref, () => wrapRef.current);
  const mountNode = document.body;
  const position = mountNode === document.body ? 'fixed' : 'absolute';

  useLayoutEffect(() => {
    if (visible) {
      setPos({ x: mousePosition.x, y: mousePosition.y });
    } else {
      setPos({ x: '-50%', y: '-50%' });
    }
  }, [visible]);

  return mountNode
    ? ReactDOM.createPortal(
        <>
          <Mask
            visible={visible && mask}
            style={{ position }}
            onClick={() => closeOnMaskClick && onClose?.()}
          />
          <AnimatePresence>
            {visible && (
              <motion.div
                layout
                style={{
                  position,
                  zIndex,
                  x: '-50%',
                  y: '-50%',
                  z: 0,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                  left: mousePosition?.x ?? '50%',
                  top: mousePosition?.y ?? '50%',
                }}
                animate={{
                  left: '50%',
                  top: '50%',
                  scale: 1,
                  opacity: 1,
                  transition: { duration },
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { duration },
                  left: pos?.x ?? '50%',
                  top: pos?.y ?? '50%',
                }}
              >
                <div ref={wrapRef} {...rest}>
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        mountNode
      )
    : null;
});

Modal.displayName = 'Modal';

export default Modal;
