export interface ICurrency {
  iso: string
  name: string
  rate: number
  toUsd: number
  imageIconSmallUrl: string
  imageUrl: string
  convertableTo: {currencyIso: string, commission: number, rate: number}[]
  rateCurrencies?: {
    [key: string]: {
      [key: string]: number
    }
  }
}
