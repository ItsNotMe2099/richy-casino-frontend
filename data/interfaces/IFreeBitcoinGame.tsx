export enum IFreeBitcoinGameStatus{
  Win = 'Win',
  Lose = 'Lose'
}
export interface IFreeBitcoinGame {
  luckyNumber: number,
  status: IFreeBitcoinGameStatus,
  lotteryTicketsAmount
  amount: number
  currency: string
  balanceLeft: number
}
