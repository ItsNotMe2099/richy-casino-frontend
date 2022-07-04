export interface ITournamentPosition {
  id?: number
  tournamentId?: number
  username?: string
  nickname?: string
  userPosition: number
  userAvatar: string
  userCurrencyIso: string
  spentMoneyAmount: number
  isTop10: boolean
  sumToReachTop10: number
  tournamentCurrencyIso: string
  totalBankMoneyAmount: number
}
