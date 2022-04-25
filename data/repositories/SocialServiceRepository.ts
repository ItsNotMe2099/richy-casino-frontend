import request from 'utils/request'
import Converter from 'utils/converter'
import {ISocialService} from 'data/interfaces/ISocialService'

export default class SocialServiceRepository {
  static async fetchServices(): Promise<ISocialService[]> {
    const res = await request({
      method: 'get',
      url: '/api/user/social/services',
    })
    if (res.err) {
      throw res.err
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }



}
