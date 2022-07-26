export interface IGameHistory {
  userId: string,
  gameId: string
  gameName: string,
  nickname: string
  gameProviderId: string,
  imageIconPreviewUrl: string
  imageIconSmallUrl: string
  currencyIso: string
  amountBet: number
  amountWin: number
  coefficient: number
}
