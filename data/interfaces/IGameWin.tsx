import {IGame} from 'data/interfaces/IGame'

export interface IGameWin {
  username?: string,
  winAmount: number,
  currencyIso: string,
  game: IGame
}
