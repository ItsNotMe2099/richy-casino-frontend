
export interface IDepositResponse {
  currencyIso?: string,
  amount: number
}
export interface IDepositCryptoResponse extends IDepositResponse{
  wallet: string
}
