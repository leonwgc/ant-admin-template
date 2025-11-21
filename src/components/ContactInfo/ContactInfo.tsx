import React, { FC } from 'react';
import { EmailOutlined, PhoneOutlined } from '@derbysoft/neat-design-icons';
import './ContactInfo.scss';

export interface ContactInfoProps {
  /**
   * Email address
   */
  email?: string;
  /**
   * Phone number
   */
  phone?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Whether to show icons
   */
  showIcon?: boolean;
  /**
   * Icon size in pixels
   */
  iconSize?: number;
}

/**
 * Contact information component
 * Used to display email and phone contact information
 */
export const ContactInfo: FC<ContactInfoProps> = ({
  email,
  phone,
  className = '',
  showIcon = true,
  iconSize = 16,
}) => {
  // At least one contact method is required
  if (!email && !phone) {
    console.warn(
      'ContactInfo: At least one of email or phone must be provided'
    );
    return null;
  }

  return (
    <div className={`contact-info ${className}`}>
      {email && (
        <div className="contact-info__item">
          {showIcon && (
            <EmailOutlined
              className="contact-info__icon"
              style={{ fontSize: iconSize }}
            />
          )}
          <a href={`mailto:${email}`} className="contact-info__link">
            {email}
          </a>
        </div>
      )}
      {phone && (
        <div className="contact-info__item">
          {showIcon && (
            <PhoneOutlined
              className="contact-info__icon"
              style={{ fontSize: iconSize }}
            />
          )}
          <a href={`tel:${phone}`} className="contact-info__link">
            {phone}
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
