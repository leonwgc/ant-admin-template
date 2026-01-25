/**
 * @file src/locales/en.ts
 * @author leon.wang
 */

import commonEn from './common/en';
import userEn from '../pages/User/locales/en';

/**
 * English translations
 * Aggregates all module translations with namespaces
 */
const en = {
  // Common translations (global)
  ...commonEn,

  // Page-specific translations with namespaces
  pages: {
    user: userEn,
  },
};

export default en;
