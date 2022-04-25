import {ChessGameType, IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {
  ChessGameSquare,
  ChessGameTableActionType,
  GamePlayerActionType
} from 'components/for_pages/MoneyChess/data/enums'

export interface IChessGameCreateFormData{
  gameType: ChessGameType;
  betAmount: number;
  currency: string
  lifetime?: number;
  increaseTime?: number;
  time: string
}
export interface ChessOpponentModalArguments{
  board: IChessGameBoard
}

export interface IChessTableActionEvent {
  type: ChessGameTableActionType;
  tableId: number;
  table: IChessGame
  board?: IChessGameBoard
  accountId?: number;
}

export class ChessGamePlayerActionDto{
  type: GamePlayerActionType;
  tableId: number;
  boardId?: number;
  accept?: boolean;
  squareFrom?: ChessGameSquare;
  squareTo?: ChessGameSquare
  dices?: number[]//test
}
