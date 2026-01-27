/**
 * @file src/locales/en.ts
 * @author leon.wang
 */

import commonEn from './common/en';
import userEn from './pages/user/en';
import formEn from './pages/form/en';

/**
 * English translations
 * Aggregates translations from all modules, organized by namespaces
 */
const en = {
  // Common translations (global)
  ...commonEn,

  // Page-specific translations, using namespaces
  pages: {
    user: userEn,
    form: formEn,
  },
};

export default en;
