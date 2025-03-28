import { Button } from 'antd';
import {
  CloseOutlined,
  SuccessCircleFilled,
} from '@derbysoft/neat-design-icons';
import React, { useEffect, useRef, useState } from 'react';
import FullScreenModal from '~/components/FullScreenModal';
import { Modal } from 'e-sign';
import Steps from '~/components/Steps';

const steps = [
  { title: 'Company Info' },
  { title: 'Confirm Subscribe' },
  { title: 'Payment' },
  {
    title: 'Finished',
    icon: (
      <SuccessCircleFilled
        style={{ color: 'rgba(209, 213, 214, 1)', fontSize: 32 }}
      />
    ),
  },
];

export default () => {
  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

  const [step, setStep] = useState(0);

  useEffect(() => {
    // 授权成功 /callback postMessage to this window .
    window.addEventListener('message', function (event) {
      if (event.data === 'authSuccess') {
        setOpen(false);
      }
    });
  }, []);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Auth</Button>

      <Steps steps={steps} currentStep={step} />

      <Button
        type="primary"
        onClick={() => setStep((s) => (s + 1 < steps.length ? s + 1 : 0))}
      >
        Next
      </Button>

      {/* <FullScreenModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <iframe
          ref={ref}
          style={{
            height: '100vh',
            border: 'none',
            width: '100%',
          }}
          src="https://80002452.uat-e.fadada.com/authorizeui/corp/login?authSerial=59cbdab84fec4f0791ccd0cdb417a275"
        />
      </FullScreenModal> */}

      <Modal
        style={{ width: '100vw', height: '100vh', position: 'relative' }}
        visible={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CloseOutlined
          onClick={() => setOpen(false)}
          style={{
            fontSize: 20,
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        />
        <iframe
          ref={ref}
          style={{
            height: '100vh',
            border: 'none',
            width: '100%',
          }}
          src="https://80002452.uat-e.fadada.com/authorizeui/corp/login?authSerial=59cbdab84fec4f0791ccd0cdb417a275"
        />
      </Modal>
    </>
  );
};
