import request from 'utils/request'
import Converter from 'utils/converter'
import {IPromoCode, IPromoCodeActivateResponse} from 'data/interfaces/IPromocode'

export default class PromoCodeRepository {
  static async fetchList(): Promise<IPromoCode[]> {
    const res = await request({
      method: 'get',
      url: '/api/promocodes/promocode/list',
    })
    if (res.err) {
      throw res.err
    }
    return (res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) as IPromoCode[]).map(i => ({
      ...i,
      bonuses: i.bonuses.map( i => ({
        ...i,
        amount: parseInt(i.amount as string,  10),
        maxAmount: parseInt(i.maxAmount as string,  10),
        bonusBalance: {...i.bonusBalance,
          freebitcoin: parseInt(i.bonusBalance.freebitcoin as string, 10),
          freespins: parseInt(i.bonusBalance.freespins as string, 10),
          lotteryTicket: parseInt(i.bonusBalance.lotteryTicket as string, 10),
          wheelSpin: parseInt(i.bonusBalance.wheelSpin as string, 10)
        }

      }))
    })) ?? []
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
