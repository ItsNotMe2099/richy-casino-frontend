
export interface ITournamentWinner {
  tournamentId?: number
  roundId?: number
  username?: string
  userPosition: number
  userAvatar: string
  userCurrencyIso: string
  spentMoneyAmount: number
  tournamentCurrencyIso: string
  bankWinAmount: number
}
