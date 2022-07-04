export interface ITournamentRichy {
  id?: number
  tournamentId: number,
  providerId?: number
  providerName?: string
  totalBankMoneyAmount: number
  participantsCount: number,
  totalUsersSpentMoneyAmount: number,
  status: string,
  currency: string
  timeEnd: string
  games: {id: number, name: string}[]
}
