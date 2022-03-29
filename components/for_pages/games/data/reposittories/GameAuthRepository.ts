import request from 'components/for_pages/games/utils/request'
import {IGameAuthResponse} from 'components/for_pages/games/data/interfaces/IGameAuthResponse'

export default class GameAuthRepository {

  static async loginGuest(accountToken: string, currency: string): Promise<IGameAuthResponse | null> {
    const res = await request({
      method: 'post',
      url: '/api/auth/login-guest',
      token: accountToken,
      data: {
        currency
      }
    })
    if (res.err) {
      return null
    }
    return res.data ?? null
  }

}
