import {HiloBetType} from 'components/for_pages/games/Hilo/data/enums'
import {CoinType} from 'components/for_pages/games/ConiFlip/data/enums'
import {DeckRankType, IBlackjackCard} from 'components/for_pages/games/BlackJack/data/enums'

export interface IMultipliers { [key: number]: number[] }
export interface ICasinoGame {
  name: string
  multipliers: IMultipliers
}
export enum CasinoGameErrorCode {
  Balance = 'balance',
  Data = 'data',
}
export interface ICasinoGameErrorEvent {
  errorCode: CasinoGameErrorCode
  errorName: any
}
export interface ICasinoGameFinishEvent {
  id: number
  win: boolean
  data: any
  profit: number
  multiplier: number
  currency: string
  delay: number
}

export interface ICasinoGameRoundData {
  userData: any;
  turn: number;
  history: number[]
}
export enum CasinoGameRoundTurnType {
  Continue = 'continue',
  Lose = 'lose',
  Finish = 'finish',
  Fail = 'fail'
}
export interface ICasinoGameTurn {
  turn: number
  multiplier: number
  type: CasinoGameRoundTurnType
  roundData: ICasinoGameRoundData
}
export interface ICasinoGameMinesTurn extends ICasinoGameTurn{
  grid?: number[]
}

export interface ICasinoGameTowersTurn extends ICasinoGameTurn{
  grid?: number[][]
}
export interface ICasinoGameHiloTurn extends ICasinoGameTurn{
  grid: number[],
  multipliers: number[]
  history: HiloBetType[]
}
export interface ICasinoGameBlackjackTurn extends ICasinoGameTurn{
  dealer: IBlackjackCard[]
  player: IBlackjackCard[]
  split: IBlackjackCard[]
  currentHand: number
  hasDouble: boolean
}

export interface ICasinoGameVideoPokerTurn extends ICasinoGameTurn{
  deck: number[]
  rankType: DeckRankType
  rankCards: number[]
}

export interface ICasinoGameCoinFlipTurn extends ICasinoGameTurn{
  side: CoinType
}

