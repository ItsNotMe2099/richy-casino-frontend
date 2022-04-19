export enum IFreeBitcoinGameStatus{
  Win = 'win',
  Loose = 'lose'
}
export interface IFreeBitcoinGame {
  luckyNumber: number,
  status: IFreeBitcoinGameStatus,
  amount: number
  currency: string
  balanceLeft: number
}
