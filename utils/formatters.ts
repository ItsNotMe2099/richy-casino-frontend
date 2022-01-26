import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const pluralizeNative = require('numeralize-ru').pluralize
export const pluralize = (number, word1, word2, word3) => {
  return pluralizeNative(number, word1, word2, word3)
}
export const formatDateRelative = (date) => {
  const formatRelativeLocale = {
    yesterday: 'Вчера в HH:mm',
    today: 'Сегодня в HH:mm',
    other: 'dd MMMM yyyy HH:mm', // Difference: Add time to the date
  }

  const locale = {
    ...ru,
    formatRelative: (token) => formatRelativeLocale[token] || formatRelativeLocale['other'],
  }
  if (!date) {
    return ''
  }
  console.log('FormatData', date)
  return formatRelative(new Date(date), new Date(), { locale })
}

export const cleanPhone = (phone: string) => {
  if (phone) {
    let phoneCleaned = phone.replace(/[^\+0-9]/g, '')
    if (!phoneCleaned.startsWith('+')) {
      phoneCleaned = '+' + phoneCleaned
    }
    return phoneCleaned
  }
  return phone
}
export const formatPhone = (phone) => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone, 'RU')
    return phoneUtil.format(number, PNF.INTERNATIONAL)
  }catch (e){
    return phone
  }
}
