export interface IMultipliers { [key: number]: number[] }
export interface ICasinoGame {
  name: string
  multipliers: IMultipliers
}

export interface ICasinoGameFinishEvent {
  win: boolean
  data: any
}

export interface ICasinoGameTurnEvent {
  data: any
}

