export function required(value: string | number, allValues) {
  console.log("compare reuiqred", value, allValues)
  return value || typeof value === 'number' ? undefined : 'Обязательное поле'
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
}
export function phone(value: string) {
  return !value || value.length <= 8 ? 'Введите телефон' : undefined;
}

export function passwordsMatch(value: string, allValues: any) {
  console.log("passwordsMatch", value, allValues)
  return value !== (allValues.password || allValues.newPassword) ? 'Пароли не совпадают' : undefined
}

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const arrayNotEmpty =  value => {
  console.log("Array notEmpty", value)
 return !value || value.length === 0 ? `Select something` : undefined
}
export const minL = minLength(8)
