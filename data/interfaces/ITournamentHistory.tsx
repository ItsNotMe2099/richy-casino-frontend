export enum ITournamentRoundStatus {
  Active = 1,
  Block = 2,
  Payment = 3,
  Complete = 4
}

export interface ITournamentHistoryUser {
  currentPlace: number
  remainingAmountSpentForNextSeat: number
  spentSum: number
  currencyIso: string
}
export interface ITournamentHistory {
  id?: number
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
  user: ITournamentHistoryUser
}
