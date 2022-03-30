import request from 'components/for_pages/games/utils/request'
import {IGamePagination} from 'components/for_pages/games/data/interfaces/IGamePagination'
import {ICasinoGameRound} from 'components/for_pages/games/data/interfaces/ICasinoGameRound'

export default class CasinoGameRoundRepository {
  static async listAll(): Promise<IGamePagination<ICasinoGameRound> | null> {
    const res = await request({
      method: 'get',
      url: '/api/game-round'
    })
    if (res.err) {
      return null
    }
    return res.data ?? null
  }

  static async listMy(): Promise<IGamePagination<ICasinoGameRound> | null> {
    const res = await request({
      method: 'get',
      url: '/api/game-round/my',
    })
    if (res.err) {
      return null
    }
    return res.data ?? null
  }

}
