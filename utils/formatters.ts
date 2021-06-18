import {format, parse} from 'date-fns'

export const parserNumber = (val) => {
  return val ? parseInt(val, 10) : undefined
}

export const parserPrice = ( value) => {
    if (!value) {
      return null
    }
    const valueFormatted = value?.replace ? value?.replace(/\s/g, '').replace(/\D/g,'') : value;
    if (!valueFormatted) {
      return null
    }
    return parseFloat(valueFormatted)

}
export const parseDate = (date, formatStr = 'yyyy-MM-dd') => {
  return parse(date, formatStr, new Date());
}
export const formatDate = (date, formatStr = 'dd.MM.yyyy') => {
  return format(parseDate(date), formatStr)
}
