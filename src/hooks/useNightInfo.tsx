/**
 * @file src/hooks/useNightInfo.tsx
 * @author leon.wang
 */

import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHotelStore } from '~/store';

/**
 * Custom hook that calculates the number of nights between two selected dates
 * and returns a localized string describing the duration.
 *
 * @returns {string} A string representing the number of nights, localized using the translation function.
 *
 * @example
 * const nightInfo = useNightInfo();
 * // nightInfo might be "2 晚" if two nights are selected
 *
 * @remarks
 * - Relies on `useHotelStore` for date selection and `useTranslation` for localization.
 * - Returns "0 晚" if dates are not properly selected.
 */
export const useNightInfo = () => {
  const { dates } = useHotelStore();
  const { t } = useTranslation();

  const nights = useMemo(() => {
    if (dates[0] && dates[1]) {
      return dayjs(dates[1]).diff(dates[0], 'day');
    }
    return 0;
  }, [dates]);

  const info = nights + ' ' + t('晚', { count: nights });

  return info;
};
