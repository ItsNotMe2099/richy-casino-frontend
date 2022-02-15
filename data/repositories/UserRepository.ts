import request from 'utils/request'
import IUser from 'data/interfaces/IUser'

export default class UserRepository {
  static async getUser(): Promise<IUser | null> {
    const res = await request({
      method: 'get',
      url: '/api/user/info',
    })
    if (res.err) {
      return null
    }
    return res.data?.data ? {...res.data?.data, currencyIso: res.data?.data.currency_iso} : null
  }
}
