import { FC } from 'react';
import {
  Button,
  Input,
  Select,
  Form as NeatForm,
} from '@derbysoft/neat-design';
import './MyForm.scss';

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

  return (
    <div className="form-profile">
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
            <div>
              <NeatForm.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'First Name is required' }]}
              >
                <Input />
              </NeatForm.Item>
            </div>
            <div>
              <NeatForm.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Last Name is required' }]}
              >
                <Input />
              </NeatForm.Item>
            </div>
            <div>
              <NeatForm.Item label="Primary Language" name="primaryLanguage">
                <Select options={languageOptions} />
              </NeatForm.Item>
            </div>
            <div>
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
            <div>
              <NeatForm.Item label="Time Zone" name="timeZone">
                <Select options={timeZoneOptions} />
              </NeatForm.Item>
            </div>
          </div>
        </div>

        <div className="form-profile__actions">
          <Button>Cancel</Button>
          <Button
            type="primary"
            onClick={() => {}}
            className="form-profile__update-btn"
          >
            Update
          </Button>
        </div>
      </NeatForm>
    </div>
  );
};

export default Form;
