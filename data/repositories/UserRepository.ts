import request from 'utils/request'

export default class UserRepository {
  static async getUser(): Promise<any> {
    const res = await request({
      method: 'get',
      url: '/api/auth/info',
    })
    if (res.err) {
      return false
    }
    return res.data?.data
  }
}
