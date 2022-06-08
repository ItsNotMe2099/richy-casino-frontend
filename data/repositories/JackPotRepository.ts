import request from 'utils/request'
import Converter from 'utils/converter'
import {IJackpotNearest} from 'data/interfaces/IJackpotNearest'

export default class JackPotRepository {
  static async fetchNearest(): Promise<IJackpotNearest> {
    const res = await request({
      method: 'get',
      url: '/api/jackpot/round/nearest',
    })
    if (res.err) {
      return null
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

}
