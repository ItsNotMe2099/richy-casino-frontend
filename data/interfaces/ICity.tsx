import {IGame} from 'data/interfaces/IGame'

export interface ICountry {
  username?: string,
  winAmount: number,
  currencyIso: string,
  game: IGame
}
