import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import {IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'

export enum ChessGameType {
  Classic = 'classic',
  WithDoubling = 'withDoubling',
}
export enum ChessGameStatus {
  Waiting = 'waiting',
  InProgress = 'inProgress',
  Finished = 'finished',
}

export interface IChessGame {
  id: number;
  status: ChessGameStatus;
  currentBoard: IChessGameBoard;
  currentBoardId: number;
  gameType: ChessGameType;
  lifetime: number;
  increaseTime: number;
  timeKey: string;
  betAmount: number;
  currency: string
  ownerUser: IGameUser;
  ownerUserId: number;
  opponentUser: IGameUser;
  opponentUserId: number;
  finishedAt: string
  startedAt: string
  createdAt: string;
}

