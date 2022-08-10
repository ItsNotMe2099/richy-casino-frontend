export interface IBetHistoryItem {
  gameId?: number
  imageIconPreviewUrl?: string
  imageIconSmallUrl?: string
  money: {
    convertedCurrency: {[key: string]: number}
    currency: {[key: string]: number}
  }
  name: string
  sessionId: string
  time: string
}
