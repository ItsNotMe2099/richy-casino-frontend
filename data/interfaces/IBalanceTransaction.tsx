export enum BalanceTransactionType{
  Initial = 0,
  Deposit = 1,
  GameDeposit= 2,
  GameWin = 3,
  Withdrawal = 4,
}
export  interface IBalanceTransaction {
  eventDate: string
  unixtimestamp: string
  amount: number,
  currencyIso: string,
  type: BalanceTransactionType,
  typeName: string,
  comment: string,
  providerId: number,
  providerName: string,
  providerDetails: string
}
