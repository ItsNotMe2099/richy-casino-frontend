export enum ICasinoGameRoundStatus {
  InProgress = 'inProgress',
  Win = 'win',
  Lose = 'lose',
  Cancelled = 'cancelled'
}

export interface ICasinoGameRound {
  id: number
  profit: number
  wager: number
  multiplier: number
  status: ICasinoGameRoundStatus
  currency?: string
  user: { id: number, login: string }
}

