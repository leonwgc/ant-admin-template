/**
 * @file src/locales/index.ts
 * @author leon.wang
 */

import zh from './zh';
import en from './en';

/** 默认命名空间 */
export const defaultNS = 'common';

/** i18n 资源配置 */
export const resources = {
  en: {
    [defaultNS]: en,
    'pages.user': en.pages.user, // 注册命名空间
  },
  zh: {
    [defaultNS]: zh,
    'pages.user': zh.pages.user, // 注册命名空间
  },
} as const;

export default resources;
