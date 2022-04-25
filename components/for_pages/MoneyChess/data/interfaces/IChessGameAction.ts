import {ChessGameBoardStatus, IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {IChessGameBoardPlayer} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoardPlayer'
import {
  ChessGamePieceType,
  ChessGameSide,
  ChessGameSquare,
  GameActionType
} from 'components/for_pages/MoneyChess/data/enums'

export interface IChessGameAction {
  id: number;
  board: IChessGameBoard;
  boardId: number;
  table: IChessGame;
  tableId: number;
  player: IChessGameBoardPlayer;
  playerId: number;
  type: GameActionType;
  setBoardStatus: ChessGameBoardStatus;
  setPieceSquare: {piece: ChessGamePieceType, squareFrom: ChessGameSquare, squareTo: ChessGameSquare};
  setPieceCapture: {piece: ChessGamePieceType, side: ChessGameSide, square: ChessGameSquare};
  setPawnPromote: {piece: ChessGamePieceType, side: ChessGameSide, square: ChessGameSquare};
  setPossibleMoves: ChessGameSquare[];
  setDices: number[]
  setCurrentDices: number[];
  setActionWaitExpiredAt: string
  setActionDrawExpiredAt: string
  setWinnerUserId: number
  setOfferDrawUserId: number
  setWinAmount: number
  setLoseAmount: number
  setBoardTurn: number;
  createdAt: Date;
}

