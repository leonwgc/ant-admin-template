/**
 * @file pages/Hotel/AddPhoneNumber.tsx
 * @author leon.wang
 */
import React, { FC, useState, useEffect } from 'react';
import {
  Modal,
  Input,
  Button,
  Select,
  Alert,
  Space,
} from '@derbysoft/neat-design';
import { InfoCircleOutlined, DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './AddPhoneNumber.scss';

/**
 * Phone number data interface
 */
interface PhoneNumberData {
  countryCode: string;
  phoneNumber: string;
  verificationCode: string;
}

/**
 * Add phone number component
 * Modal for adding and verifying phone numbers
 */
const AddPhoneNumber: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PhoneNumberData>({
    countryCode: '+86',
    phoneNumber: '',
    verificationCode: '',
  });

  // Countdown state
  const [countdown, setCountdown] = useState(0);

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const isCountdownActive = countdown > 0;

  /**
   * Open modal
   */
  const showModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Handle form submission
   */
  const handleOk = () => {
    // TODO: Submit form data
    setIsModalOpen(false);
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /**
   * Handle resend code
   */
  const handleResend = () => {
    if (!isCountdownActive) {
      setCountdown(60);
      // TODO: Resend verification code
    }
  };

  /**
   * Country code options
   */
  const countryCodeOptions = [
    {
      label: (
        <Space>
          <span>🇨🇳</span>
          <span>+86</span>
        </Space>
      ),
      value: '+86',
    },
    {
      label: (
        <Space>
          <span>🇺🇸</span>
          <span>+1</span>
        </Space>
      ),
      value: '+1',
    },
    {
      label: (
        <Space>
          <span>🇬🇧</span>
          <span>+44</span>
        </Space>
      ),
      value: '+44',
    },
  ];

  return (
    <div className="add-phone-number-page">
      <div className="add-phone-number-page__header">
        <h2 className="add-phone-number-page__title">
          {t('pages.hotel:phoneManagementTitle')}
        </h2>
        <Button type="primary" onClick={showModal}>
          {t('pages.hotel:phoneManagementBtnAdd')}
        </Button>
      </div>

      <Modal
        title={t('pages.hotel:phoneModalTitle')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        className="add-phone-number-modal"
        okText={t('pages.hotel:phoneModalBtnAdd')}
        cancelText={t('pages.hotel:phoneModalBtnCancel')}
        // bodyStyle={{
        //   padding: 0,
        // }}
        bodyProps={{
          style: {
            padding: 0,
          },
        }}
      >
        <Alert
          message={t('pages.hotel:phoneModalAlertMsg')}
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          className="add-phone-number-modal__alert"
          banner
        />
        <div className="add-phone-number-modal__content-wrapper">
          <div className="add-phone-number-modal__content">
            {/* Security Alert */}

            {/* Phone Number Input */}
            <div className="add-phone-number-modal__form-item">
              <label className="add-phone-number-modal__label">
                {t('pages.hotel:phoneModalLabelPhone')}
              </label>
              <Space.Compact block>
                <Select
                  value={formData.countryCode}
                  onChange={(value) =>
                    setFormData({ ...formData, countryCode: value as string })
                  }
                  options={countryCodeOptions}
                  suffixIcon={<DownOutlined />}
                  className="add-phone-number-modal__country-select"
                />
                <Input
                  placeholder="13812345678"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="add-phone-number-modal__phone-input"
                />
                <Button
                  disabled={isCountdownActive}
                  onClick={handleResend}
                  className="add-phone-number-modal__resend-btn"
                >
                  {isCountdownActive
                    ? `${t('pages.hotel:phoneModalBtnResend')} (${countdown}s)`
                    : t('pages.hotel:phoneModalBtnResend')}
                </Button>
              </Space.Compact>
              <div className="add-phone-number-modal__hint">
                {t('pages.hotel:phoneModalHintSMS')}{' '}
                <span className="add-phone-number-modal__hint-link">
                  {t('pages.hotel:phoneModalHintResend')}
                </span>
              </div>
            </div>

            {/* Verification Code Input */}
            <div className="add-phone-number-modal__form-item">
              <label className="add-phone-number-modal__label">
                {t('pages.hotel:phoneModalLabelCode')}
              </label>
              <Input
                placeholder="1234"
                value={formData.verificationCode}
                onChange={(e) =>
                  setFormData({ ...formData, verificationCode: e.target.value })
                }
                maxLength={6}
                className="add-phone-number-modal__code-input"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddPhoneNumber;
