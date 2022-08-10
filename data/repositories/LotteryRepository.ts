import request from 'utils/request'
import Converter from 'utils/converter'
import {ILotteryBuyResponse, ILotteryRound, ILotteryRoundCurrent} from 'data/interfaces/ILotteryRound'

export default class LotteryRepository {
  static async fetchCurrentActiveRound(): Promise<ILotteryRoundCurrent> {
    const res = await request({
      method: 'get',
      url: '/api/lottery/round/current',
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }

  static async fetchRound(id: number): Promise<ILotteryRound> {
    const res = await request({
      method: 'get',
      url: '/api/lottery/round/view',
      data: {id}
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }

  static async buyTicket(amount: number): Promise<ILotteryBuyResponse> {
    const res = await request({
      method: 'post',
      url: '/api/lottery/ticket/buy',
      data: {
        amount
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }


}
