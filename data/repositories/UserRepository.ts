import request from 'utils/request'
import IUser, {IUserBalanceCurrencyRaw} from 'data/interfaces/IUser'
import Converter from 'utils/converter'
import {UserFormData} from 'types/form-data'

export default class UserRepository {
  static async getUser(token?: string): Promise<IUser | null> {
    const res = await request({
      method: 'get',
      url: '/api/user/info',
      token
    })
    if (res.err) {
      return null
    }
    const convertCurrencyToArray = (data: IUserBalanceCurrencyRaw) => {
      return Object.keys(data).map(key => ({currency: key?.toUpperCase(), value: data[key]}))
    }
    if(res.data?.data) {
      const data = {...Converter.objectKeysToCamelCase(res.data?.data)}
      data.balance.currencies.totals = convertCurrencyToArray(data.balance.currencies.totals)
      data.balance.currencies.bonus = convertCurrencyToArray(data.balance.currencies.bonus)
      data.balance.currencies.real = convertCurrencyToArray(data.balance.currencies.real)
      return data
    }else{
      return null
    }
  }
  static async updateUser(data: UserFormData): Promise<IUser | null> {
    const res = await request({
      method: 'post',
      url: '/api/user/info/update',
      data
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? {...Converter.objectKeysToCamelCase(res.data?.data)} : null
  }
  static async changePassword(currentPassword: string, newPassword: string): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/user/password/change',
      data: {
        password_current: currentPassword,
        password_new: newPassword,
        password_new2: newPassword,
      },
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async changeDefaultCurrency(currencyIso): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/finance/currency/change',
      data: {
        currency_iso: currencyIso,
      },
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }
  static async twoFaEnable(): Promise<any> {
    const res = await request({
      method: 'put',
      url: '/api/user/two-factor/activate',
    })
    if (res?.err) {
      throw res.err
    }
    console.log('qrUrlD', res.data)
    return res.data?.qrUrl
  }
  static async twoFaDisable(): Promise<string> {
    const res = await request({
      method: 'put',
      url: '/api/user/two-factor/disable',
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }
}
