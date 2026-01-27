import React from 'react';
import { Button, Form, Input, Select, Space } from '@derbysoft/neat-design';
import { useTitle } from 'ahooks';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useTitle(t('pages.user:addUserTitle'));

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: t('pages.user:addUserNoteHiMan') });
        break;
      case 'female':
        form.setFieldsValue({ note: t('pages.user:addUserNoteHiLady') });
        break;
      case 'other':
        form.setFieldsValue({ note: t('pages.user:addUserNoteHiThere') });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: t('pages.user:addUserNoteHelloWorld'),
      gender: 'male',
    });
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="note"
        label={t('pages.user:addUserFormNote')}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label={t('pages.user:addUserFormGender')}
        rules={[{ required: true }]}
      >
        <Select
          placeholder={t('pages.user:addUserFormGenderPh')}
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">{t('pages.user:addUserGenderMale')}</Option>
          <Option value="female">{t('pages.user:addUserGenderFemale')}</Option>
          <Option value="other">{t('pages.user:addUserGenderOther')}</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label={t('pages.user:addUserFormCustomizeGender')}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            {t('pages.user:addUserBtnSubmit')}
          </Button>
          <Button htmlType="button" onClick={onReset}>
            {t('pages.user:addUserBtnReset')}
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            {t('pages.user:addUserBtnFill')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
