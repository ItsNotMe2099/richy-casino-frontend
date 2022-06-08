export interface ITournamentRichy {
  id?: number
  providerId?: number
  providerName?: string
  totalBankMoneyAmount: number
  currencyIso: string
  timeEnd: string
  games: {id: number, name: string}[]
}
