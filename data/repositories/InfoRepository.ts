import request from 'utils/request'
import {ICurrency} from 'data/interfaces/ICurrency'

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
  static async getCurrencies(): Promise<ICurrency[]> {
    const res = await request({
      method: 'get',
      url: '/api/finance/currency/index',
    })
    if (res.err) {
      return null
    }
    return res.data?.data ?? []
  }

}
