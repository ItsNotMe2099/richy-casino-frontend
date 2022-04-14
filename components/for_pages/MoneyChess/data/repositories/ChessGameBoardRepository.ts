
import request from 'components/for_pages/games/utils/request'
import {IGamePagination} from 'components/for_pages/games/data/interfaces/IGamePagination'
import {IChessGameBoard} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
export interface IChessGameListRequest{
   betAmountFrom?: number
  betAmountTo?: number
   times?: string[]
}
export default class ChessGameBoardRepository {
  static async listMyActive(data: IChessGameListRequest, page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGameBoard> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/board/active/my',
      data: {...data, page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listAllActive(data: IChessGameListRequest, page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGameBoard> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/board/active/all',
      data: {...data, page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listMyHistory(page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGameBoard> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/board/history/my',
      data: {page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listAllHistory(page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGameBoard> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/board/history/all',
      data: {page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

}
