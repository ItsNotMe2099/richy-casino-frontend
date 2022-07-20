import IUser, {IUserBalanceCurrency} from 'data/interfaces/IUser'
import {IPromoCode, IPromoCodeActivationEvent, IPromoCodeBonusType} from 'data/interfaces/IPromocode'
import {IBonusBannerDetails} from 'types/interfaces'

const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const pluralizeNative = require('numeralize-ru').pluralize

export default class UserUtils {
  static getCurrencyIcon(currency: string){
    return `/img/currencies/${currency?.toLowerCase()}.png`
  }
  static getMainBalanceTotals(user: IUser): IUserBalanceCurrency | null {
    return user.currencyIso ? user.balance.currencies.totals.find(i => i.currency ?.toUpperCase()=== user.currencyIso?.toUpperCase()) : user.balance.currencies.totals[0]
  }

  static getOtherBalancesTotals(user: IUser): IUserBalanceCurrency[] {
    return user.currencyIso ? user.balance.currencies.totals.filter(i => i.currency?.toUpperCase() != user.currencyIso?.toUpperCase()) : []
  }
  static getMainBalanceReal(user: IUser): IUserBalanceCurrency | null {
    return user.currencyIso ? user.balance.currencies.real.find(i => i.currency?.toUpperCase() === user.currencyIso?.toUpperCase()) : user.balance.currencies.totals[0]
  }

  static getOtherBalancesReal(user: IUser): IUserBalanceCurrency[] {
    return user.currencyIso ? user.balance.currencies.real.filter(i => i.currency?.toUpperCase() != user.currencyIso?.toUpperCase()) : []
  }
  static getBonusBalances(user: IUser): IUserBalanceCurrency[] {
    return  user.balance.currencies.bonus
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
  static getDepositPromoCodes(promoCodes: IPromoCode[]): IPromoCode[]{
    console.log('promoCodes', promoCodes)
    return promoCodes.filter(i => i.activation.event === IPromoCodeActivationEvent.Deposit)
  }
  static isBonusEnabled(_promoCodes: IPromoCode[]): boolean{
    const promoCodes = this.getDepositPromoCodes(_promoCodes)
    const validTill = promoCodes.find(i => i.validTill)?.validTill
    return promoCodes.length > 0 && (new Date(validTill).getTime() > (new Date()).getTime())
  }
  static getBonusBannerDetails(_promoCodes: IPromoCode[]): IBonusBannerDetails | null{
    const promoCodes = this.getDepositPromoCodes(_promoCodes)
    const validTill = promoCodes.find(i => i.validTill)?.validTill
    const bonuses = promoCodes.map(i => i.bonuses).flat()
    const currency = bonuses.find(i => !!i.currencyIso)?.currencyIso
    console.log('promoCodes', promoCodes)
    if(promoCodes.length === 0){
      return null
    }
    const details: IBonusBannerDetails = {
        amount: 0,
        currency,
        freeSpins: 0,
        freeBitcoin: 0,
        lotteryTickets: 0,
        wheelSpins: 0,
        validTill
    }
    for(const bonus of bonuses){
      //Amount
      details.amount += bonus.amount as number ?? 0
      if(bonus.type === IPromoCodeBonusType.Fix){
        details.amount += bonus.amount as number
      }
      details.freeSpins += bonus.bonusBalance.freespins as number
      details.freeBitcoin += bonus.bonusBalance.freebitcoin as number
      details.lotteryTickets += bonus.bonusBalance.lotteryTicket as number
      details.wheelSpins += bonus.bonusBalance.wheelSpin as number
    }
    console.log('details', details)
    return details
  }
}

