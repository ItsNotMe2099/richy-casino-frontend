export interface IGameHistory {
  userId: string,
  gameId: string
  gameProviderId: string,
  imageIconPreviewUrl: string
  currencyIso: string
  amountBet: number
  amountWin: number
  coefficient: number
}
