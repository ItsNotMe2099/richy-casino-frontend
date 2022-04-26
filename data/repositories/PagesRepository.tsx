import {ITextPage} from 'data/interfaces/ITextPage'
import request from 'utils/request'
import Converter from 'utils/converter'
import {IPagination} from 'types/interfaces'

export default class PagesRepository {
  static async fetchBySlug(slug?: string, lang?: string): Promise<ITextPage | null> {
    if(!slug){
      return null
    }

    const res = await request({
      url: '/api/content/text/view',
      method: 'get',
      data: {
        internal_name: slug,
        language_iso: lang
      },
    })
    if (res.err) {
      return null
    }
    return res.data.data ? Converter.objectKeysToCamelCase(res.data.data) : null
  }
  static async fetchList(page: number = 1, limit: number = 30): Promise<IPagination<ITextPage>> {
    const res = await request({
      url: '/api/content/text/index',
      method: 'get',
      data: {
        page,
        'per-page': limit
      },
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }
}
