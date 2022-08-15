export enum ITournamentRoundStatus {
  Active = 'active',
  Block = 'blocked',
  Payment = 'payment',
  Complete = 'complete'
}

export interface ITournamentHistoryUser {
  currentPlace: number
  remainingAmountSpentForNextSeat: number
  spentSum: number
  currencyIso: string
}
export interface ITournamentHistory {
  id?: number
  image: string
  tournamentId?: number
  status?: ITournamentRoundStatus
  timeStart: string
  timeEnd: string
  timeBeforeEnd: string
  participants_count: number
  totalBankMoneyAmount: number
  totalUsersSpentMoneyAmount: number
  currency: string
  internalName: string
  tournamentName: string
  user: ITournamentHistoryUser
}
