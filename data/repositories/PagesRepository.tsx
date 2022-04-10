import {ITextPage} from 'data/interfaces/ITextPage'
import request from 'utils/request'

export default class PagesRepository {
  static async fetchBySlug(slug?: string, lang?: string): Promise<ITextPage | null> {
    if(!slug){
      return null
    }

      const res = await request({
        url: '/api/content/text/view',
        method: 'get',
        data: {
          internal_name: slug
        },
      })
      if (res.err) {
        return null
      }
      return res.data.data
  }
}
