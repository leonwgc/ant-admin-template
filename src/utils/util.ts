/**
 * @file src/utils/util.ts
 */
import Big from 'big.js';

/**
 * Generates a BEM-style class name based on the base class name and a modifier.
 * @param {string} baseClassName - The base class name.
 * @returns {function(string): string} - A function that takes a modifier name and returns the full class name.
 */
export const getElementClassName = (baseClassName) => (name) =>
  baseClassName + '__' + name;

const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const weekdaysEnglishShortFormat = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export const getWeekday = (date, lang?) => {
  const day = new Date(date).getDay();
  return lang === 'en' ? weekdaysEnglishShortFormat[day] : weekdays[day];
};

export const isMobile = () => {
  return (
    typeof window !== 'undefined' &&
    /(iPhone|iPad|iPod|iOS|android)/i.test(navigator.userAgent)
  );
};

export const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^1[3-9]\d{9}$/; // Matches Chinese mobile numbers
  return phoneRegex.test(phoneNumber);
};

export const maskPhoneNumber = (phoneNumber) => {
  if (!isValidPhoneNumber(phoneNumber)) {
    return phoneNumber; // Return as is if not valid
  }
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
};

export const maskEmail = (email) => {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) {
    return email; // Return as is if not a valid email
  }
  return `****@${domain}`;
};

export const isValidEmail = (email = '') => {
  return (
    !!email &&
    email.length > 0 &&
    email.length <= 128 &&
    /^([a-zA-Z0-9]+[\_\|\.\-\+]+)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\_\|\.\-]+)*[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(
      email?.trim(),
    )
  );
};

export const renderName = (firstName, lastName, language) => {
  if (!firstName || !lastName) {
    return '';
  }
  if (language !== 'en') {
    return `${lastName} ${firstName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
};

const isInteger = (value) => {
  return typeof value === 'number' && value % 1 === 0;
};

export const avg = (arr: number[] | string[]): number => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  if (arr.some((item) => typeof item === 'string')) {
    arr = arr.map((item) => parseFloat(item + ''));
  }
  let sum = 0;
  arr.map((val) => {
    sum += val;
  });
  const val = sum / arr.length;

  return isInteger(val) ? val : parseFloat(val.toFixed(2));
};

export const containBreakfast = (mealPlan: string): boolean => {
  return mealPlan !== 'RO';
};

export const sum = (arr: number[] | string[]): number => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  if (arr.some((item) => typeof item === 'string')) {
    arr = arr.map((item) => parseFloat(item + ''));
  }
  let sum = 0;
  arr.map((val) => {
    sum += val;
  });
  return isInteger(sum) ? sum : parseFloat(sum.toFixed(2));
};

export const getPropByLanguage = (obj, language) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  const lang = language === 'en' ? 'en-US' : 'zh-CN';
  return obj[lang] || obj['zh-CN'] || obj['en-US'];
};

export const transformLanguage = (lang) => {
  if (lang === 'zh') {
    return 'zh-CN';
  } else if (lang === 'en') {
    return 'en-US';
  } else {
    return lang;
  }
};

export const getFileNameSuffix = (url: string) => {
  if (url) {
    return url.slice(url.lastIndexOf('.')).toLowerCase();
  }
};

export const calcSum = (arr: number[] | string[]): number => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  if (arr.some((item) => typeof item === 'string')) {
    arr = arr.map((item) => parseFloat(item + ''));
  }
  let sum = new Big(0);
  arr.map((val) => {
    sum = sum.plus(val);
  });
  return sum.toNumber();
};

export const mutiply = (a: number, b: number): number => {
  try {
    const result = new Big(a).times(b);
    return result.toNumber();
  } catch (e) {
    return 0;
  }
};
