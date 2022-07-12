export interface IPaymentSettings{
  countryIso: string
  currencyIso: string
  flags: {
    isDepositAllowed: boolean
    isWithdrawalAllowed: boolean
  },
  deposit: {
    isAllowed: boolean
    minAmount: number
    maxAmount: number
    commissionAmount: number
    commissionPercent: number
  }
}
export interface IPaymentSystem {
  id: number
  name: string
  imageUrl: string
  settings: IPaymentSettings[]
  flags?: {
    isCrypto: boolean
    isDepositAllowed: boolean
    isWithdrawalAllowed: boolean
  }
  rateCurrencies?: {
    [key: string]: {
      [key: string]: number
    }
  }
}
