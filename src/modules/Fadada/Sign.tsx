import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { fetchProxyFadada } from '~/utils/fetch';
import { FlexRender, Item } from 'antd-form-render';
import { useRequest } from 'ahooks';

const sign = (subject) =>
  fetchProxyFadada.post('/signature', {
    subject,
  });

const Sign: React.FC = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

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
    <div>
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
    </div>
  );
};

export default Sign;
