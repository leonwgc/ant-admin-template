import React, { useEffect, useRef } from 'react';
import { showAuthEUI, setEnv } from '@derbysoft/e-sign';

import { FlexRender } from '@derbysoft/antd-form-builder';
import { Form, Input, Button } from 'antd';

setEnv('production');

export default () => {
  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  const [value, setValue] = React.useState('');

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
      <div style={{ margin: '16px 0' }}>current: {value}</div>

      <Button onClick={() => showAuthEUI('123')}>show Auth</Button>

      <Form layout="horizontal">
        <FlexRender
          justify="flex-end"
          layout={[
            { label: 'name', name: 'name', element: <Input /> },
            { label: 'age', name: 'age', element: <Input /> },
          ]}
          gap={36}
        />
      </Form>
    </>
  );
};
