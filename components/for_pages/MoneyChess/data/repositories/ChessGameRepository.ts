
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import request from 'components/for_pages/games/utils/request'
import {IChessGameCreateFormData} from 'components/for_pages/MoneyChess/data/types'
import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'
import {IGamePagination} from 'components/for_pages/games/data/interfaces/IGamePagination'
export interface IChessGameListRequest{
   betAmountFrom?: number
  betAmountTo?: number
   times?: string[]
}
export default class ChessGameRepository {
  static async create(data: IChessGameCreateFormData): Promise<IChessGame | null> {
    const res = await request({
      method: 'post',
      url: '/api/chess-game/table',
      data

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async findById(id: number): Promise<IChessGame | null> {
    const res = await request({
      method: 'get',
      url: `/api/chess-game/table/${id}`,

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listMyActive(data: IChessGameListRequest, page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/active/my',
      data: {...data, page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listAllActive(data: IChessGameListRequest, page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/active/all',
      data: {...data, page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listMyHistory(page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/history/my',
      data: {page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listAllHistory(page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/history/all',
      data: {page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async resetGame(id: number, side: ChessGameSide): Promise<IChessGame | null>  {
    const res = await request({
      method: 'post',
      url: `/api/chess-game/table/${id}/reset`,
      data: {side}
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async sit(data: ICasinoGameDataDto, token: string): Promise<IChessGame | null>  {
    const res = await request({
      method: 'post',
      url: '/api/casino-game/start',
      data,
      token,
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

}
