export  interface IWithdrawHistory {
  id: number
  status: number
  statusName: string
  amount: number
  address: string
  currencyIso: string
  createdAt: {
    eventDate: string
    unixtimestamp: string
  }
  txid: number
  txIdUrl: string
}
