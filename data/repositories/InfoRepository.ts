import request from 'utils/request'

export default class InfoRepository {
  static async getCountries(): Promise<any | null> {
    const res = await request({
      method: 'get',
      url: '/api/countries',
    })
    if (res.err) {
      return []
    }
    return res.data.data
  }
  static async getCurrencies(): Promise<any | null> {

    const res = await request({
      method: 'get',
      url: '/api/currencies',
    })
    if (res.err) {
      return []
    }
    return res.data.data
  }

}
