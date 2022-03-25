import request from 'components/for_pages/games/utils/request'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'

export default class GameUserRepository {
  static async getUser(token: string): Promise<IGameUser | null> {
    const res = await request({
      method: 'get',
      url: '/api/user/me',
      token
    })
    if (res.err) {
      return null
    }
    return res.data ?? null
  }

}
