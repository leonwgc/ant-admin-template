import React, { FC } from 'react';

/**
 * @file pages/Form/AddPhoneNumber.tsx
 * @author leon.wang
 */

export interface AddPhoneNumberFormValues {
  /** 手机号 */
  phone: string;
}

/**
 * AddPhoneNumber 页面
 * 用于添加新的手机号码
 */
const AddPhoneNumber: FC = () => {
  return <ComponentBasic />;
};

export default AddPhoneNumber;
