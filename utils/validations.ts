import parsePhoneNumber, {isPossiblePhoneNumber} from 'libphonenumber-js'
import {differenceInMinutes, isFuture, isValid, parse} from 'date-fns'
export function required(value: string | number, allValues) {
  return value || typeof value === 'number' ? undefined : 'required'
}


export function eventMinDuration(range) {
  if(range.start && range.end && differenceInMinutes(range.end, range.start) < 1) {
    console.log("dsdError")
    return 'rangeError'
  }
  return undefined;
}
export function eventRange(range) {
  if(range.start && range.end && differenceInMinutes(range.end, range.start) < 0) {
    console.log("dsdError")
    return 'rangeError'
  }
  return undefined;
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'email'
    : undefined
}
export function phone(value: string) {
  return !isPossiblePhoneNumber(`+${value}`) ? 'phone' : undefined;
}

export function passwordsMatch(value: string, allValues: any) {
  return value !== (allValues.password || allValues.newPassword) ? 'passwordMatch' : undefined
}

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const passwordMinLength = value =>
  value && value.length < 6 ? `passwordMinLength8` : undefined
export const maxLength = max => value => {

 return  value && value.length > max ? `maxLength1000` : undefined
}

export const bioMaxLength = value =>  maxLength(1000)(value);
export const arrayNotEmpty = (message?) => {
  return (value) => {
    return (!value || value.length === 0) ? (message || `selectSomething`) : undefined
  }
}


export const date =  value => {
  if(!value){
    return;
  }
  console.log("Validate", value);
  try {
    let date = new Date(value)
    if(!isValid(date)){
      date = parse(value, 'yyyy-mm-dd', new Date());
    }
    return  !isValid(date) ? 'date' : undefined;
  }catch (e){
    try {
      const date = parse(value, 'yyyy-mm-dd', new Date());
      return !isValid(date) ? 'date' : undefined;
    }catch (e){
      return 'date'
    }

  }

}


export const birthdate =  value => {
  if(!value){
    return;
  }
  try {
    let date = new Date(value)
    if(!isValid(date)){
      date = parse(value, 'yyyy-mm-dd', new Date());
    }

    return !isValid(date) ||  isFuture(date) ? 'birthdate' : undefined;
  }catch (e){
    return 'birthdate'
  }
}


export const dateFuture =  value => {
  if(!value){
    return;
  }
  try {
    const date = parse(value, 'MM/dd/yyyy', new Date());
    return !isValid(date) ||  !isFuture(date) ? 'dateFuture' : undefined;
  }catch (e){
    return 'dateFuture'
  }
}

