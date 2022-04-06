import {ChessGameType} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'

export interface IChessGameCreateFormData{
  gameType: ChessGameType;
  betAmount: number;
  currency: string
  lifetime?: number;
  increaseTime?: number;
  time: string
}
