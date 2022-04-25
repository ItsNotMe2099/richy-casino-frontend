export interface IWheelSlot {
  winMoneyAmount: number,
  currencyIso: string,
}
export interface IWheelInfoUser{
  balanceSpins: number
  balanceSpinsTimeNewFreeAccrual: string
}
export interface IWheelPlayResponse{
  winAmount: number
  currencyIso: string,
  player: IWheelInfoUser
}
