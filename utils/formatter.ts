import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const pluralizeNative = require('numeralize-ru').pluralize

export default class Formatter {
  static pluralize(number, word1, word2, word3){
    return pluralizeNative(number, word1, word2, word3)
  }
  static  cleanPhone = (phone: string) => {
    if (phone) {
      let phoneCleaned = `${phone}`.replace(/[^\+0-9]/g, '')
      if (!phoneCleaned.startsWith('+')) {
        phoneCleaned = '+' + phoneCleaned
      }
      return phoneCleaned
    }
    return phone
  };
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
      const number = phoneUtil.parseAndKeepRawInput(this.cleanPhone(`${phone}`), 'RU')
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
  static formatNumber(num: number, separator?: string){
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  }

  static formatAmount(amount: number | string, currency: string){
    const convertFiat = (amount) => {
      if(amount < 0.0000001){
        return amount.toFixed(8)
      }else if(amount < 0.000001){
        return amount.toFixed(7)
      }else if(amount < 0.00001){
        return amount.toFixed(6)
      }else if(amount < 0.0001){
        return amount.toFixed(5)
      }else if(amount < 0.001){
        return amount.toFixed(4)
      }else if(amount < 0.01){
        return amount.toFixed(3)
      }else{
        return amount.toFixed(2)
      }
    }
    const isCrypto = ['ADA',
      'BCH',
      'BNB',
      'BSV',
      'BTC',
      'XBT',
      'DASH',
      'DOGE',
      'EOS',
      'ETH',
      'LTC',
      'VTC',
      'XLM',
      'XMR',
      'XNO',
      'XRP',
      'XTZ',
      'ZEC'].includes(currency.toUpperCase())
    if(typeof amount === 'string'){
      return (amount ?? '').replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1')
    }
    if(!amount){
      return ''
    }
    return isCrypto ? amount.toFixed(8).replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1') : convertFiat(amount).replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1')
  }

}
export const pad = Formatter.pad
