
export interface IPromoCodeBonus {
  currencyIso?: string,
  type: number,
  bonusBalance: {
    wheel_spin: number,
    freebitcoin: number,
    lottery_ticket: number,
  },
  accountLevel: number
  amount: number
}
export interface IPromoCode {
  validTill: number
  imageIconUrl: string
  imageFullsizeUrl: string
  bonuses: IPromoCodeBonus[]
}

export interface IPromoCodeActivateResponse {
  keyword: string
  bonuses: IPromoCodeBonus[]
}
