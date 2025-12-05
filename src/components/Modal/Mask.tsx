/**
 * @file src/components/Modal/Mask.tsx
 * @author leon.wang
 */
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';

type Props = HTMLMotionProps<'div'> & {
  visible?: boolean;
  style?: React.CSSProperties;
};

/**
 * Mask component that renders a semi-transparent overlay when visible.
 *
 * @component
 * @param {Props} props - The properties for the Mask component.
 * @param {boolean} [props.visible] - Determines if the mask is visible.
 * @param {React.CSSProperties} [props.style] - Additional styles to apply to the mask.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to the mask div element.
 *
 * @returns {JSX.Element | null} The Mask component or null if not visible.
 */
const Mask = React.forwardRef<HTMLDivElement, Props>((props: Props) => {
  const { visible, style, ...rest } = props;
  const overflowRef = useRef('');

  useEffect(() => {
    overflowRef.current = document.body.style.overflow;
    document.body.style.overflow = visible ? 'hidden' : '';

    return () => {
      document.body.style.overflow = overflowRef.current;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          {...rest}
          style={{
            backgroundColor: 'rgba(0, 0, 0)',
            zIndex: 100,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            touchAction: 'none',
            ...style,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.45,
          }}
          exit={{ opacity: 0 }}
        />
      ) : null}
    </AnimatePresence>
  );
});

Mask.displayName = 'Mask';

export default Mask;
