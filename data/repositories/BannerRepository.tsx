import request from 'utils/request'
import {IBanner} from 'data/interfaces/IBanner'
import Converter from 'utils/converter'

export default class BannerRepository {
  static async fetchBanners(): Promise<IBanner[] | null> {

      const res = await request({
        url: '/api/banners/banner',
        method: 'get',
        data: {
        },
      })
      if (res.err) {
        return null
      }
      return  res.data.data?.map(i => Converter.objectKeysToCamelCase(i))
  }
}
