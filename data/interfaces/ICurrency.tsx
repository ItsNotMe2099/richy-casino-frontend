export interface ICurrency {
  iso: string
  name: string
  rate: number
  flags: {
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
