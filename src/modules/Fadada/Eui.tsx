import { Button, Modal } from '@derbysoft/neat-design';
import React, { useEffect, useRef } from 'react';
import './Eui.scss';

export default () => {
  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

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

      <Modal
        rootClassName="fullscreen-modal"
        width={'100vw'}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100vh',
          maxWidth: '100vw',
        }}
        open={open}
        title={null}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <iframe
          ref={ref}
          src="https://80002452.uat-e.fadada.com/authorizeui/corp/login?authSerial=59cbdab84fec4f0791ccd0cdb417a275"
        />
      </Modal>
    </>
  );
};
