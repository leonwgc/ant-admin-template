import React, { FC, useState } from 'react';
import {
  Button,
  Input,
  Select,
  Upload,
  Form as NeatForm,
  Row,
  Col,
  Tag,
  Space,
} from '@derbysoft/neat-design';
import type { UploadProps } from '@derbysoft/neat-design';
import './MyForm.scss';
import { ConfigProvider } from '@derbysoft/neat-design';

interface FormValues {
  firstName: string;
  lastName: string;
  primaryLanguage: string;
  country: string;
  timeZone: string;
  workEmail: string;
  secondaryEmail: string;
  jobTitle: string;
  phoneNumber: string;
}

const countryOptions = [
  { label: 'China', value: 'China' },
  // 可扩展更多国家
];

const languageOptions = [
  { label: 'English', value: 'English' },
  // 可扩展更多语言
];

const timeZoneOptions = [
  { label: '(GMT+08:00) Asia/Shanghai', value: 'Asia/Shanghai' },
  // 可扩展更多时区
];

const Form: FC = () => {
  const [form] = NeatForm.useForm<FormValues>();
  const [phoneVerified] = useState(true);

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      // 提交逻辑
      // ...
    });
  };

  const uploadProps: UploadProps = {
    maxCount: 1,
    accept: '.jpg,.jpeg,.png',
    showUploadList: false,
    beforeUpload: () => false,
  };

  const responsiveColDef = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
  };

  return (
    <div className="form-profile">
      <div className="form-profile__header">
        <Upload {...uploadProps}>
          <Button type="secondary">Upload</Button>
        </Upload>
        <div className="form-profile__email-block">
          <div className="form-profile__email">
            felicia.lawson@derbysoft.net
          </div>
          <div className="form-profile__tip">
            You can upload a JPG, JPEG or PNG file (File size limit is 1M).
          </div>
        </div>
      </div>
      <ConfigProvider
        prefixCls="ds"
        theme={{
          components: {
            Form: {
              'form-item-gap': 0,
            },
          },
        }}
      >
        <NeatForm
          form={form}
          layout="vertical"
          className="form-profile__form"
          initialValues={{
            firstName: 'Felicia',
            lastName: 'Lawson',
            primaryLanguage: 'English',
            country: 'China',
            timeZone: 'Asia/Shanghai',
            workEmail: 'felicia.lawson@derbysoft.net',
            secondaryEmail: '',
            jobTitle: 'Product Manager',
            phoneNumber: '+87 18018600000',
          }}
        >
          <div className="form-profile__section">
            <div className="form-profile__section-title">Basic Info</div>
            <div className="responsive-grid">
              <div {...responsiveColDef}>
                <NeatForm.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: 'First Name is required' },
                  ]}
                >
                  <Input />
                </NeatForm.Item>
              </div>
              <div {...responsiveColDef}>
                <NeatForm.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Last Name is required' }]}
                >
                  <Input />
                </NeatForm.Item>
              </div>
              <div {...responsiveColDef}>
                <NeatForm.Item label="Primary Language" name="primaryLanguage">
                  <Select options={languageOptions} />
                </NeatForm.Item>
              </div>
              <div {...responsiveColDef}>
                <NeatForm.Item
                  label="Country/Region"
                  name="country"
                  rules={[
                    { required: true, message: 'Country/Region is required' },
                  ]}
                >
                  <Select options={countryOptions} />
                </NeatForm.Item>
              </div>
              <div {...responsiveColDef}>
                <NeatForm.Item label="Time Zone" name="timeZone">
                  <Select options={timeZoneOptions} />
                </NeatForm.Item>
              </div>
            </div>
          </div>
          <div className="form-profile__section">
            <div className="form-profile__section-title">Contact Info</div>
            <Row gutter={24}>
              <Col {...responsiveColDef}>
                <NeatForm.Item
                  label="Work Email"
                  name="workEmail"
                  rules={[
                    { required: true, message: 'Work Email is required' },
                  ]}
                >
                  <Input disabled />
                </NeatForm.Item>
              </Col>
              <Col {...responsiveColDef}>
                <NeatForm.Item label="Secondary Email" name="secondaryEmail">
                  <Input />
                </NeatForm.Item>
              </Col>
              <Col {...responsiveColDef}>
                <NeatForm.Item label="Job Title" name="jobTitle">
                  <Input />
                </NeatForm.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col {...responsiveColDef}>
                <NeatForm.Item label="Phone Number" name="phoneNumber">
                  <Space>
                    <Input disabled />
                    {phoneVerified && <Tag color="success">Verified</Tag>}
                    <Button
                      type="text"
                      icon={<span className="form-profile__icon-delete" />}
                    />
                  </Space>
                </NeatForm.Item>
              </Col>
            </Row>
          </div>
          <div className="form-profile__actions">
            <Button>Cancel</Button>
            <Button
              type="primary"
              onClick={handleUpdate}
              className="form-profile__update-btn"
            >
              Update
            </Button>
          </div>
        </NeatForm>
      </ConfigProvider>
    </div>
  );
};

export default Form;
