import {differenceInYears, isBefore, isEqual} from 'date-fns';
export const isSameDate = (date1, date2) => {
  return (
    isBefore(date1.getFullYear(), date2.getFullYear()) ||
    (isEqual(date1.getFullYear(), date2.getFullYear()) &&
      date1.getMonth() < date2.getMonth()) ||
    (isEqual(date1.getFullYear(), date2.getFullYear()) &&
      isEqual(date1.getMonth(), date2.getMonth()) &&
      date1.getDate() <= date2.getDate())
  );
}

export const getAge = (date: string) => {
  return differenceInYears(new Date(), new Date(date))
}
