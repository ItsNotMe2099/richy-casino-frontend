export interface IMultipliers { [key: number]: number[] }
export interface ICasinoGame {
  name: string
  multipliers: IMultipliers
}
export enum CasinoGameErrorCode {
  Balance = 'balance',
  Data = 'data',
}
export interface ICasinoGameErrorEvent {
  errorCode: CasinoGameErrorCode
  errorName: any
}
export interface ICasinoGameFinishEvent {
  win: boolean
  data: any
  profit: number
  multiplier: number
  currency: string
  delay: number
}

export interface ICasinoGameRoundData {
  userData: any;
  turn: number;
  history: number[]
}
export enum CasinoGameRoundTurnType {
  Continue = 'continue',
  Lose = 'lose',
  Finish = 'finish',
  Fail = 'fail'
}
export interface ICasinoGameTurn {
  turn: number
  multiplier: number
  type: CasinoGameRoundTurnType
  roundData: ICasinoGameRoundData
}
export interface ICasinoGameMinesTurn extends ICasinoGameTurn{
  grid?: number[]
}

export interface ICasinoGameTowersTurn extends ICasinoGameTurn{
  grid?: number[][]
}

