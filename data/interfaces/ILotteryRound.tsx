
export interface ILotteryCurrentUserInfo{
  chancePercent: number
  ticketsCount: number
}
export interface ILotterySlot{
  id: number
  winMoneyAmount: number
}

export interface ILotteryRoundWinner{
  id: number
  ticketsCount: number
  winAmount: number
}
export interface ILotteryRound {
  roundId: number,
  totalBankAmount: number
  currencyIso: string
  totalTickets: number,
  roundWinners?: ILotteryRoundWinner[]
}
export interface ILotteryRoundCurrent {
  roundId: number,
  totalBankAmount: number
  currencyIso: string
  totalTickets: number,
  currentUserInfo: ILotteryCurrentUserInfo
  slots: ILotterySlot[]
}
export interface ILotteryBuyResponse {
  currencyIso: string
  price: number,
  roundInfo: {
    roundId: number
    totalTicketsInRound: number
  }
}
