import { IPaymentMethod } from './../interfaces/IPaymentMethod'
import request from 'utils/request'
import Converter from 'utils/converter'
import {IPaymentMethodField, IPaymentMethodFields} from 'data/interfaces/IPaymentFields'


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
  static async fetchFields(code: string): Promise<IPaymentMethodField[]> {
    const res = await request({
      method: 'get',
      url: '/api/finance/payment/withdrawal/fields',
      data: {
        code
      }
    })
    if (res.err) {
      return []
    }
    const data = res.data?.data as IPaymentMethodFields
    const keys = Object.keys(data ?? {})
    const items = []
    for(const key of keys){
      items.push({...data[key], key})
    }
    console.log('FieldsItems', items)
    return items
  }
}
