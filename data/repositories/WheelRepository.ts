import request from 'utils/request'
import Converter from 'utils/converter'
import {IWheelInfoUser, IWheelPlayResponse, IWheelSlot} from 'data/interfaces/IWheel'

export default class WheelRepository {
  static async fetchSlots(): Promise<IWheelSlot[]> {
    const res = await request({
      method: 'get',
      url: '/api/wheel/slot/index',
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }

  static async fetchUserInfo(): Promise<IWheelInfoUser> {
    const res = await request({
      method: 'get',
      url: '/api/wheel/slot/user',
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }

  static async play(): Promise<IWheelPlayResponse> {
    const res = await request({
      method: 'get',
      url: '/api/wheel/slot/play',
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }


}
