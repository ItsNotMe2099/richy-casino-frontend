import request from 'utils/request'
import Converter from 'utils/converter'
import {IJackpotNearest} from 'data/interfaces/IJackpotNearest'
import {AxiosRequestConfig} from 'axios'

export default class JackPotRepository {
  static async fetchNearest(config?: AxiosRequestConfig): Promise<IJackpotNearest> {
    const res = await request({
      method: 'get',
      url: '/api/jackpot/round/nearest',
      config
    })
    if (res.err) {
      return null
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

}
