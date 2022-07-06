
export interface ITournamentWinner {
  tournamentId?: number
  roundId?: number
  username?: string
  nickname: string
  userPosition: number
  userAvatar: string
  userCurrencyIso: string
  spentMoneyAmount: number
  tournamentCurrencyIso: string
  bankWinAmount: string
}
