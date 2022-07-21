export interface IGame {
  id?: number
  name?: string
  providerId?: number
  providerName?: string
  imageIconPreviewUrl?: string
  imageIconSmallUrl?: string
  categoryId?: number,
  isDemoEnable: boolean
  isBlackListed: boolean
}
