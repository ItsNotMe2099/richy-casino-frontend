import { IPaymentMethod } from './../interfaces/IPaymentMethod'
import request from 'utils/request'
import Converter from 'utils/converter'


export default class PaymentMethodRepository {
  static async fetchDeposit(): Promise<IPaymentMethod[]> {
    const res = await request({
      method: 'get',
      url: '/api/finance/currency/deposit',
    })
    if (res.err) {
      return []
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }
  static async fetchWithdraw(): Promise<IPaymentMethod[]> {
    const res = await request({
      method: 'get',
      url: '/api/finance/currency/withdraw',
    })
    if (res.err) {
      return []
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }
}
