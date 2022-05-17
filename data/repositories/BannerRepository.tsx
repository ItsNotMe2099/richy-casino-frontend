import request from 'utils/request'
import {IBanner} from 'data/interfaces/IBanner'

export default class BannerRepository {
  static async fetchBanners(): Promise<IBanner[] | null> {

      const res = await request({
        url: '/api/games/category/banners',
        method: 'get',
        data: {
        },
      })
      if (res.err) {
        return null
      }
      return res.data.data
  }
}
