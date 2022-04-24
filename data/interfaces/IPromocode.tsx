export enum IPromoCodeBonusType{
  Fix = 'fix',
  Percent = 'percent'
}
export interface IPromoCodeBonus {
  currencyIso?: string,
  type: IPromoCodeBonusType,
  bonusBalance: {
    wheelSpin: number | string,
    freebitcoin: number | string,
    lotteryTicket: number | string,
    freespins: number | string,
  },
  accountLevel: number
  amount: number | string
  maxAmount?: number | string
}
export enum IPromoCodeActivationEvent{
  Deposit = 'deposit'
}
export interface IPromoCodeActivation{
  event: IPromoCodeActivationEvent,
  deposit?: {min: number, currencyIso: string}
}
export interface IPromoCode {
  keyword: string
  validTill: string
  activation:IPromoCodeActivation,
  bonuses: IPromoCodeBonus[]
}

export interface IPromoCodeActivateResponse {
  keyword: string
  bonuses: IPromoCodeBonus[]
}
