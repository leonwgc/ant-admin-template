import { Button, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

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
        width={'100%'}
        style={{ top: 0, height: '100vh', margin: '0 auto' }}
        open={open}
        title={null}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <iframe
          ref={ref}
          style={{
            border: 'none',
            width: '100%',
            minHeight: 'calc(100vh - 56px)',
          }}
          src="https://80002452.uat-e.fadada.com/authorizeui/corp/login?authSerial=59cbdab84fec4f0791ccd0cdb417a275"
        />
      </Modal>
    </>
  );
};
