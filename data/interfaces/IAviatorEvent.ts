export enum AviatorEventType {
  planned = 'planned',
  bet = 'bet',
  started = 'started',
  multiplierUpdate = 'multiplierUpdate',
  betFinished = 'betFinished',
  finished = 'finished',
}

export enum AviatorRoundStatus {
  created = 'created',
  inProgress = 'inProgress',
  finished = 'finished',
}

export interface IAviatorRound {
  id: number
  plannedStartAfter: number // ms
  plannedStartAt: string
  startedDuration: number // ms
  multiplier?: number // factor
  status: AviatorRoundStatus
}

export interface IUser {
  id: number
  login: string
}

export interface IBet {
  betAmount: number
  currency: string
  gameRoundId: number
  id: number
  isFinished: boolean
  user: IUser
  userId: 47
}

export interface IAviatorEvent{
  accountId: number
  type: AviatorEventType
  round: IAviatorRound
  multiplier: number
  bet?: IBet
}
