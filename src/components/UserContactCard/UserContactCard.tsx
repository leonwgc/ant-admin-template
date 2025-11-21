import React, { FC, useState } from 'react';
import { Avatar, message } from '@derbysoft/neat-design';
import { EmailOutlined, MobileOutlined, CopyOutlined } from '@derbysoft/neat-design-icons';
import './UserContactCard.scss';

export interface UserContactCardProps {
  /**
   * User name (used for avatar when avatarUrl is not provided)
   */
  name?: string;
  /**
   * Avatar image URL
   */
  avatarUrl?: string;
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
}

/**
 * User contact card component
 * Displays user avatar, name, and contact information with copy functionality
 * At least one of name or avatarUrl is required
 * At least one of email or phone is required
 */
export const UserContactCard: FC<UserContactCardProps> = ({
  name,
  avatarUrl,
  email,
  phone,
  className = '',
}) => {
  const [copyingEmail, setCopyingEmail] = useState(false);
  const [copyingPhone, setCopyingPhone] = useState(false);

  // Validate required props
  if (!name && !avatarUrl) {
    console.warn('UserContactCard: At least one of name or avatarUrl must be provided');
    return null;
  }

  if (!email && !phone) {
    console.warn('UserContactCard: At least one of email or phone must be provided');
    return null;
  }

  // Copy to clipboard function
  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    const setCopying = type === 'email' ? setCopyingEmail : setCopyingPhone;

    try {
      await navigator.clipboard.writeText(text);
      setCopying(true);
      message.success(`${type === 'email' ? 'Email' : 'Phone'} copied successfully`);

      setTimeout(() => {
        setCopying(false);
      }, 2000);
    } catch (err) {
      message.error('Failed to copy');
    }
  };

  return (
    <div className={`user-contact-card ${className}`}>
      <div className="user-contact-card__header">
        <Avatar
          src={avatarUrl}
          size={32}
          className="user-contact-card__avatar"
        >
          {!avatarUrl && name ? name.charAt(0).toUpperCase() : ''}
        </Avatar>
        {name && <div className="user-contact-card__name">{name}</div>}
      </div>

      <div className="user-contact-card__contacts">
        {email && (
          <div className="user-contact-card__contact-item">
            <div className="user-contact-card__contact-content">
              <EmailOutlined className="user-contact-card__icon" />
              <span className="user-contact-card__text">{email}</span>
            </div>
            <CopyOutlined
              className={`user-contact-card__copy-icon ${copyingEmail ? 'user-contact-card__copy-icon--active' : ''}`}
              onClick={() => copyToClipboard(email, 'email')}
            />
          </div>
        )}

        {phone && (
          <div className="user-contact-card__contact-item">
            <div className="user-contact-card__contact-content">
              <MobileOutlined className="user-contact-card__icon" />
              <span className="user-contact-card__text">{phone}</span>
            </div>
            <CopyOutlined
              className={`user-contact-card__copy-icon ${copyingPhone ? 'user-contact-card__copy-icon--active' : ''}`}
              onClick={() => copyToClipboard(phone, 'phone')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserContactCard;
