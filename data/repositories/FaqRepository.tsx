import request from 'utils/request'
import {IFaqItem} from 'data/interfaces/IFaqItem'

export default class FaqRepository {
  static async fetchList(lang?: string): Promise<IFaqItem[] | null> {

      const res = await request({
        url: '/api/content/faq/index',
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
