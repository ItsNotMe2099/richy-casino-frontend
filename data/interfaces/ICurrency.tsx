export interface ICurrency {
  iso: string
  name: string
  rate: number
  toUsd: number
  imageIconSmallUrl: string
  imageUrl: string
  convertableTo: {currencyIso: string, commission: number, rate: number}[]
  flags?:{
   isCrypto: boolean
   isDepositAllowed: boolean
   isWidthdrawalAllowed: boolean
  }
  rateCurrencies?: {
    [key: string]: {
      [key: string]: number
    }
  }
}
