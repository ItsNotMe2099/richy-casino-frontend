import {IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'

export interface IChessGameBoardPlayer {
  id: number;
  board: IChessGameBoard;
  boardId: number;
  side: ChessGameSide;
  user: IGameUser;
  userId: number;
  amount: number;
  isWinner: boolean;
  createdAt: Date;
}

