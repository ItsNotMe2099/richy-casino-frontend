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
  status: AviatorRoundStatus
}

export interface IAviatorEvent{
  accountId: number
  type: AviatorEventType
  round: IAviatorRound
  multiplier: number
}
