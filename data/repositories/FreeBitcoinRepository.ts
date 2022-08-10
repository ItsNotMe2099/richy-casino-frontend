import request from 'utils/request'
import Converter from 'utils/converter'
import {IFreeBitcoinHistory} from 'data/interfaces/IFreeBitcoinHistory'
import {IFreeBitcoinSlot} from 'data/interfaces/IFreeBitcoinSlot'
import {IFreeBitcoinUserStatus} from 'data/interfaces/IFreeBitcoinUserStatus'
import {IFreeBitcoinGame} from 'data/interfaces/IFreeBitcoinGame'
import {IPagination} from 'types/interfaces'

export default class FreeBitcoinRepository {
  static async fetchHistory(page: number, limit : number): Promise<IPagination<IFreeBitcoinHistory>> {
    const res = await request({
      method: 'get',
      url: '/api/freebitcoin/slot/history',
      data: {
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return  Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchSlots(): Promise<IFreeBitcoinSlot[]> {
    const res = await request({
      method: 'get',
      url: '/api/freebitcoin/slot',
    })
    if (res.err) {
      return null
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }

  static async fetchUserStatus(): Promise<IFreeBitcoinUserStatus | null> {
    const res = await request({
      method: 'get',
      url: '/api/freebitcoin/slot/status',
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }


  static async play(): Promise<IFreeBitcoinGame | null> {
    const res = await request({
      method: 'get',
      url: '/api/freebitcoin/slot/game',
    })
    if (res.err) {
      return null
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }

}
