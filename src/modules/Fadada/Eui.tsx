import { Button, Modal } from 'antd';
import React from 'react';

export default () => {
  const [open, setOpen] = React.useState(false);
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
          style={{
            border: 'none',
            width: '100%',
            minHeight: 'calc(100vh - 56px)',
          }}
          src="https://80002452.uat-e.fadada.com/authorizeui/corp/login?authSerial=7ee135f9cb8642d2bac1005421bf0d7b"
        />
      </Modal>
    </>
  );
};
