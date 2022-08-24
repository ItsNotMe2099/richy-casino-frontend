import {IGame} from 'data/interfaces/IGame'

export  interface IGameProvider {
  id: number
  name: string
  internalName: string
  imagePreviewUrl: string
  gamesAmount: number,
}
export  interface IGameProviderTop3 {
  id: number
  name: string
  internalName: string
  imagePreviewUrl: string
  isEnabled: boolean
  games: IGame[]
}
