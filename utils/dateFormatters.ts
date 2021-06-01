import getUserLocale from 'get-user-locale'
import {
  getYear,
  getMonth as getMonthIndex,

  getCenturyStart,
  getPreviousCenturyStart,
  getNextCenturyStart,
  getNextCenturyEnd,
  getCenturyEnd,
  getPreviousCenturyEnd,
  getCenturyRange,

  getDecadeStart,
  getPreviousDecadeStart,
  getNextDecadeStart,
  getNextDecadeEnd,
  getDecadeEnd,
  getPreviousDecadeEnd,
  getDecadeRange,

  getYearStart,
  getPreviousYearStart,
  getNextYearStart,
  getNextYearEnd,
  getYearEnd,
  getPreviousYearEnd,
  getYearRange,

  getMonthStart,
  getPreviousMonthStart,
  getNextMonthStart,
  getNextMonthEnd,
  getMonthEnd,
  getPreviousMonthEnd,
  getMonthRange,

  getDayStart,
  getDayEnd,
  getDayRange,
} from '@wojtekmaj/date-utils';
import {addDays, endOfWeek, startOfWeek} from 'date-fns'

const formatMonthYearOptions = { month: 'long', year: 'numeric' };
const formatYearOptions = { year: 'numeric' };

const getFormatter = (options) => {
  return (locale, date) => date.toLocaleString(locale || getUserLocale(), options);
}
const getSafeFormatter = (options) => {
  return (locale, date) => getFormatter(options)(locale, toSafeHour(date));
}
const toSafeHour = (date) => {
  const safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}
const toYearLabel = (locale, formatYear, dates) => {
  return dates
    .map((date) => formatYear(locale, date))
    .join(' – ');
};


export const formatMonthYear = getSafeFormatter(formatMonthYearOptions);
export const formatYear = getSafeFormatter(formatYearOptions);


export const getCenturyLabel = (locale, formatYear, date) => {
  return toYearLabel(locale, formatYear, getCenturyRange(date));
}


export const getDecadeLabel = (locale, formatYear, date) => {
  return toYearLabel(locale, formatYear, getDecadeRange(date));
}

export const getBeginPrevious = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyStart(date);
    case 'decade':
      return getPreviousDecadeStart(date);
    case 'year':
      return getPreviousYearStart(date);
    case 'month':
      return getPreviousMonthStart(date);
    case 'week':
      return startOfWeek(new Date(date.getTime()  - 7 * 24 * 60 * 60 * 1000));
    case 'day':
      return addDays(date, -1);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export const getBeginNext = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getNextCenturyStart(date);
    case 'decade':
      return getNextDecadeStart(date);
    case 'year':
      return getNextYearStart(date);
    case 'month':
      return getNextMonthStart(date);
    case 'week':
      return startOfWeek(new Date(date.getTime()  + 7 * 24 * 60 * 60 * 1000));
    case 'day':
      return addDays(date, 1);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}



export const getEndPrevious = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyEnd(date);
    case 'decade':
      return getPreviousDecadeEnd(date);
    case 'year':
      return getPreviousYearEnd(date);
    case 'month':
      return getPreviousMonthEnd(date);
    case 'week':
      return endOfWeek(new Date(date.getTime()  - 7 * 24 * 60 * 60 * 1000));
    case 'day':
      return addDays(date, -1);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export const getEndNext = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getNextCenturyEnd(date);
    case 'decade':
      return getNextDecadeEnd(date);
    case 'year':
      return getNextYearEnd(date);
    case 'month':
      return getNextMonthEnd(date);
    case 'week':
      return startOfWeek(new Date(date.getTime()  + 7 * 24 * 60 * 60 * 1000));
    case 'day':
      return addDays(date, 1);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}
export const getBegin = (rangeType, date) => {
  switch (rangeType) {
    case 'century': return getCenturyStart(date);
    case 'decade': return getDecadeStart(date);
    case 'year': return getYearStart(date);
    case 'month': return getMonthStart(date);
    case 'week': return startOfWeek(date);
    case 'day': return getDayStart(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}


export const getEnd = (rangeType, date) => {
  switch (rangeType) {
    case 'century': return getCenturyEnd(date);
    case 'decade': return getDecadeEnd(date);
    case 'year': return getYearEnd(date);
    case 'month': return getMonthEnd(date);
    case 'week': return endOfWeek(date);
    case 'day': return getDayEnd(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}
