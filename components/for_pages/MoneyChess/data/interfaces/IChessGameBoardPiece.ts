import {IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {ChessGamePieceType, ChessGameSide, ChessGameSquare} from 'components/for_pages/MoneyChess/data/enums'

export interface IChessGameBoardPiece {
  id: number;
  board: IChessGameBoard;
  boardId: number;
  side: ChessGameSide;
  piece: ChessGamePieceType;
  square: ChessGameSquare;
  createdAt: Date;

}

