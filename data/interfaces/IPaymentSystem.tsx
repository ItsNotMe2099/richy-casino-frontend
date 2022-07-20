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
  systemCode: string
  name: string
  imageUrl: string
  settings: IPaymentSettings[]
}
