import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const pluralizeNative = require('numeralize-ru').pluralize

export default class Formatter {
  static pluralize(number, word1, word2, word3){
    return pluralizeNative(number, word1, word2, word3)
  }
  static formatDateRelative(date){
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
    return formatRelative(new Date(date), new Date(), {locale})
  }

  static formatPhone(phone){
    try {
      const number = phoneUtil.parseAndKeepRawInput(phone, 'RU')
      return phoneUtil.format(number, PNF.INTERNATIONAL)
    } catch (e) {
      return phone
    }
  }

  static pad(pad, str, padLeft = true) {
    if (typeof str === 'undefined')
      return pad
    if (padLeft) {
      return (pad + str).slice(-pad.length)
    } else {
      return (str + pad).substring(0, pad.length)
    }
  }
  static formatNumber(num){
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  }

}
export const pad = Formatter.pad
