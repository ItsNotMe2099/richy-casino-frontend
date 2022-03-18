
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import request from 'components/for_pages/games/utils/request'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {ICasinoGame} from 'components/for_pages/games/data/interfaces/ICasinoGame'

export default class CasinoGameRepository {
  static async findByType(gameType: CasinoGameType, token: string): Promise<ICasinoGame> {
    const res = await request({
      method: 'get',
      url: `/api/casino-game/${gameType}`,
      token,
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async startGame(data: ICasinoGameDataDto, token: string): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/casino-game/start',
      data,
      token,
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

}
