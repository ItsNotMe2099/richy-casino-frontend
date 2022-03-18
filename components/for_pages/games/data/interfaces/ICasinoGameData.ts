import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {CasinoGameModeType} from 'components/ui/Tabs'

export interface ICasinoGameDataDto {
  mode: CasinoGameModeType
  gameType: CasinoGameType;
  bet: number;
  currency: string;
  isDemo: boolean;
}

export interface ICasinoGameDiceDto extends ICasinoGameDataDto {
  // Коэфециент
  target: 'higher' | 'lower';
  value: number;
}

export interface ICasinoGameLimboDto extends ICasinoGameDataDto {
  // Коэфециент
  target: number;
}

export interface ICasinoGameKenoDto extends ICasinoGameDataDto {
  tiles: number[];
}
