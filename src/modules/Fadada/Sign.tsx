import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { fetchProxyFadada } from '~/utils/fetch';
import { FlexRender, Item } from 'antd-form-render';
import { useRequest } from 'ahooks';
import {
  AnimatePresence,
  motion,
  useScroll,
  animate,
  useMotionValue,
  useTransform,
} from 'motion/react';

const sign = (subject) =>
  fetchProxyFadada.post('/signature', {
    subject,
  });

const Sign: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const [visible, setVisible] = React.useState(true);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  // animate Value
  useEffect(() => {
    const controls = animate(count, 100, { duration: 5 });
    return () => controls.stop();
  }, []);

  const { run, loading } = useRequest(sign, {
    manual: true,
    onSuccess: () => {
      message.success('Contract signed successfully');
      form.resetFields();
    },
  });

  const layout: Item[] = [
    {
      label: 'Contract Subject',
      name: 'subject',
      rules: [{ required: true, message: 'please input' }],
      element: <Input placeholder="Enter subject" style={{ width: 280 }} />,
    },
    {
      element: (
        <Button
          type="primary"
          disabled={!values?.subject?.trim() || loading}
          loading={loading}
          onClick={() => run(values?.subject)}
        >
          Sign Contract
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: '200vh', position: 'relative' }}>
      {/* scroll indicator */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 56,
          left: 'var(--menu-width)',
          borderRadius: 2,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: '#ccc',
        }}
      />
      <h2>Contract Signing</h2>

      <Form form={form} layout="horizontal">
        <FlexRender layout={layout} gap={32} justify="flex-start" />
      </Form>

      <div>
        <Button
          type="primary"
          onClick={() => {
            const a = document.createElement('a');
            a.href =
              'https://uat-cloud.fadada.com/application/task/sign/detail?signTaskId=1740473348563150962&partyId=1740473348906137982&linkType=1';
            a.target = '_blank';
            a.click();
            a?.remove();
          }}
        >
          Sign Contract for 甲方
        </Button>
      </div>

      <div>
        <AnimatePresence>
          {visible ? (
            <motion.div
              // enter animation
              initial={{ x: -100, y: 100, opacity: 0, background: '#fff' }}
              animate={{
                x: 100,
                opacity: 1,
                transition: { duration: 1 },
              }}
              // exit animation , must be under AnimatePresence
              exit={{ opacity: 0, scale: 0.1 }}
              onClick={() => setVisible(false)}
              // guesture:  hover, tap, focus, and drag
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 100,
                height: 100,
                border: '1px solid #ccc',
              }}
              // To trigger an animation on scroll, the whileInView prop defines a state to animate to/from when an element enters/leaves the viewport:
              whileInView={{ opacity: 1 }}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          drag
          style={{
            display: 'inline-flex',
            width: 100,
            backgroundColor: '#dd00ee',
            borderRadius: 10,
          }}
        >
          <Button>
            Draggable
            <motion.pre>{rounded}</motion.pre>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Sign;
