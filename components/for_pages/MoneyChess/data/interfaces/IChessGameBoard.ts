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
  isFinished: boolean
  currentTurn: number;
  currentTurnSetAt: string;
  offerDrawUserId: number;
  dices: number[]
  currentDices: number[];
  pieces: IChessGameBoardPiece[];
  players: IChessGameBoardPlayer[];
  actionWaitExpiredAt?: string
  actionWaitStartedAt?: string
  actionDrawExpiredAt?: string
  winnerUserId?: number,
  countDrawOffers: number,
  winAmount: number
  ownerUserId: number
  loseAmount: number
  startedAt: string,
  finishedAt: string
  createdAt: Date;
}

