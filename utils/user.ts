import IUser, {IUserBalanceCurrency} from 'data/interfaces/IUser'

const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const pluralizeNative = require('numeralize-ru').pluralize

export default class UserUtils {
  static getCurrencyIcon(currency: string){
    return `/img/currencies/${currency?.toLowerCase()}.png`
  }
  static getMainBalance(user: IUser): IUserBalanceCurrency | null {
    return user.currencyIso ? user.balance.currencies.totals.find(i => i.currency === user.currencyIso?.toUpperCase()) : user.balance.currencies.totals[0]
  }

  static getOtherBalances(user: IUser): IUserBalanceCurrency[] {
    return user.currencyIso ? user.balance.currencies.totals.filter(i => i.currency != user.currencyIso?.toUpperCase()) : []
  }

  static formatUserName(user: IUser, isProfile?: boolean) {
    if (user.username) {
      return `${user.username}`
    } else if (user.surname || user.name) {
      return `${user.surname ?? ''}${user?.surname ? ' ' : ''}${user.name ?? ''}`
    } else {
      return `id${user.id}`
    }
  }
}

