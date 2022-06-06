export interface ITournamentTop10 {
  userId?: number
  username?: string
  userPosition: number
  userAvatar: string
  userCurrencyIso: string
  spentMoneyAmount: number
  tournamentCurrencyIso: string
  bankWinAmount: number
}
export interface ITournamentTop10List {

  tournamentId?: number
  roundId?: number
  top10: ITournamentTop10[]
}
