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

  static async fetchRound(): Promise<ILotteryRound> {
    const res = await request({
      method: 'get',
      url: '/api/lottery/round/view',
    })
    if (res.err) {
      throw res.err
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }

  static async buyTicket(): Promise<ILotteryBuyResponse> {
    const res = await request({
      method: 'post',
      url: '/api/lottery/round/view',
    })
    if (res.err) {
      throw res.err
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }


}
