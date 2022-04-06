import {IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {ChessGamePieceType, ChessGameSide, ChessGameSquare} from 'components/for_pages/MoneyChess/data/enums'

export enum ChessGameBoardStatus {
  Waiting = 'waiting',
  InProgress = 'inProgress',
  FinishedByKingCapture = 'finishedByKingCapture',
  FinishedByDraw = 'finishedByDraw',
  FinishedByGiveUp = 'finishedByGiveUp',
  FinishedByTimeout = 'finishedByTimeout',
  WaitingAccept = 'waitAccept'
}

export interface IChessGameBoardPiece {
  id: number;
  board: IChessGameBoard;
  boardId: number;
  side: ChessGameSide;
  piece: ChessGamePieceType;
  square: ChessGameSquare;
  createdAt: Date;

}

