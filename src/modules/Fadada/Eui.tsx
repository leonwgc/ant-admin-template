import { Button } from 'antd';
import { CloseOutlined } from '@derbysoft/neat-design-icons';
import React, { useEffect, useRef } from 'react';
import { Modal } from 'e-sign';

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
