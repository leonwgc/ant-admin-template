/**
 * @file src/components/VerificationCodePage/VerificationCodePage.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { VerificationCodeInput } from '../VerificationCodeInput/VerificationCodeInput';
import useCountdown from '~/hooks/useCountdown';
import './VerificationCodePage.scss';
import { useMount } from 'ahooks';

interface VerificationCodePageProps {
  /**
   * Email or phone display text
   */
  contact: string;
  /**
   * Length of verification code
   */
  codeLength?: number;
  /**
   * Countdown seconds for resend
   */
  countdownSeconds?: number;
  /**
   * Callback when verification code is complete
   */
  onComplete?: (code: string) => void;
  /**
   * Callback when resend button is clicked
   */
  onResend?: () => void;
  /**
   * Callback when go back button is clicked
   */
  onGoBack?: () => void;
}

/**
 * VerificationCodePage component displays a complete verification code input page
 * with countdown timer for resending code and go back functionality
 */
const VerificationCodePage: React.FC<VerificationCodePageProps> = ({
  contact,
  codeLength = 8,
  countdownSeconds = 60,
  onComplete,
  onResend,
  onGoBack,
}) => {
  const { sec, isRunning, start, reset } = useCountdown(countdownSeconds, true);
  const [code, setCode] = useState('');

  useMount(start);

  const handleResend = () => {
    if (isRunning) return;
    reset();
    start();
    onResend?.();
  };

  const handleComplete = (completedCode: string) => {
    setCode(completedCode);
    onComplete?.(completedCode);
  };

  const handleChange = (value: string) => {
    setCode(value);
  };

  return (
    <div className="verification-code-page">
      <div className="verification-code-page__content">
        <h2 className="verification-code-page__title">
          We have sent a {codeLength}-digit verification code to your email{' '}
          <span className="verification-code-page__contact">{contact}</span>
        </h2>

        <div className="verification-code-page__input-section">
          <label className="verification-code-page__label">
            Verification Code
          </label>
          <VerificationCodeInput
            length={codeLength}
            onComplete={handleComplete}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <div className="verification-code-page__actions">
          <Space size={16}>
            <Button
              type="secondary"
              size="large"
              onClick={handleResend}
              disabled={isRunning}
              className="verification-code-page__resend-button"
            >
              {isRunning ? `Resend Code (${sec}s)` : 'Resend Code'}
            </Button>
            <Button
              type="secondary"
              size="large"
              onClick={onGoBack}
              className="verification-code-page__back-button"
            >
              Go back
            </Button>
          </Space>
        </div>

        <p className="verification-code-page__hint">
          Still can't find your recovery code? Please check your spam folder.
        </p>
      </div>
    </div>
  );
};

export default VerificationCodePage;
