import request from 'utils/request'
import Converter from 'utils/converter'
import {IPromoCode, IPromoCodeActivateResponse} from 'data/interfaces/IPromocode'

export default class PromoCodeRepository {
  static async fetchCurrentActiveRound(): Promise<IPromoCode> {
    const res = await request({
      method: 'get',
      url: '/api/promocodes/promocode/list',
    })
    if (res.err) {
      throw res.err
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }

  static async activate(keyword: string): Promise<IPromoCodeActivateResponse> {
    const res = await request({
      method: 'post',
      url: '/api/promocodes/promocode/enter',
      data: {keyword}
    })
    if (res.err) {
      throw res.err
    }
    console.log('Reeee', Converter.objectKeysToCamelCase(res.data?.data))
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }


}
