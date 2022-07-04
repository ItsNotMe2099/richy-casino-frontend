export interface ITournamentRichy {
  id?: number
  providerId?: number
  providerName?: string
  totalBankMoneyAmount: number
  currency: string
  timeEnd: string
  games: {id: number, name: string}[]
}
