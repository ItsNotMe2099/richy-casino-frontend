import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {IChessGameBoardPiece} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoardPiece'
import {IChessGameBoardPlayer} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoardPlayer'

export enum ChessGameBoardStatus {
  Waiting = 'waiting',
  InProgress = 'inProgress',
  FinishedByKingCapture = 'finishedByKingCapture',
  FinishedByDraw = 'finishedByDraw',
  FinishedByGiveUp = 'finishedByGiveUp',
  FinishedByTimeout = 'finishedByTimeout',
  WaitingAccept = 'waitAccept'
}

export interface IChessGameBoard {
  id: number;
  table: IChessGame;
  tableId: number;
  status: ChessGameBoardStatus;
  currentTurn: number;
  currentTurnSetAt: string;
  offerDraw: number;
  dices: number[]
  currentDices: number[];
  pieces: IChessGameBoardPiece[];
  players: IChessGameBoardPlayer[];
  createdAt: Date;
}

