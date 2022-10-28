import request from 'utils/request'
import Converter from 'utils/converter'
import {IBettingStartResponse} from 'data/interfaces/IBettingStartResponse'

export default class BettingRepository {
  static async start(): Promise<IBettingStartResponse> {
    const res = await request({
      method: 'get',
      url: '/api/games/session/betting-start'
    })
    if (res.err) {
      return null
    }

    return Converter.objectKeysToCamelCase(res.data?.data)
  }
}
