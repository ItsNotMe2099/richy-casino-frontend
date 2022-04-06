import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {CasinoGameModeType} from 'components/ui/Tabs'
import {CoinType} from 'components/for_pages/games/ConiFlip/data/enums'

export interface ICasinoGameDataDto {
  gameMode: CasinoGameModeType
  gameType: CasinoGameType;
  bet: number;
  currency: string;
  isDemo: boolean;
}

export interface ICasinoGameDiceDto extends ICasinoGameDataDto {
  // Коэфециент
  target: 'higher' | 'lower';
  value: number;
  profit?: number
}

export interface ICasinoGameLimboDto extends ICasinoGameDataDto {
  // Коэфециент
  target: number;
}

export interface ICasinoGameKenoDto extends ICasinoGameDataDto {
  tiles: number[];
}

export interface ICasinoGameMinesDto extends ICasinoGameDataDto {
  mines: number;
}
export interface ICasinoGameRouletteDto extends ICasinoGameDataDto {
  // Ставки
 bets: {[key: string]: number}
}
export interface ICasinoDiamondsDto extends ICasinoGameDataDto {

}
export interface ICasinoGameHiloDto extends ICasinoGameDataDto {
  starting: number
}
export interface ICasinoGameBlackjackDto extends ICasinoGameDataDto {
}
export interface ICasinoGameVideoPokerDto extends ICasinoGameDataDto {
}

export interface ICasinoGameCoinFlipDto extends ICasinoGameDataDto {
  side: CoinType
}

