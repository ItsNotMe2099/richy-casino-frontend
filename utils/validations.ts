import {cleanPhone} from 'utils/formatters'

export function required(value: string | number) {
  return value || typeof value === 'number' ? undefined : 'Обязательное поле'
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный формат email'
    : undefined
}


export const passwordsMustMatch = (value: string, allValues: any) => {
  return value !== allValues.newPassword ? 'Пароли не совпадают' : undefined
}

export const passwordMinLength = (value) =>
  value && value.length < 6 ? `Минимальная длина пароля 6 символов` : undefined

const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minL = minLength(8)

export function phoneValidation(value: string | number) {
  return !value || cleanPhone(`${value}`).length > 7  ? undefined : 'Неверный формат номера телефона'
}
export function otpValidation(value: string | number) {
  return !value || `${value}`.length === 4  ? undefined : 'Введите 4-x значный код'
}
