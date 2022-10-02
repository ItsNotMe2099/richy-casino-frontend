import request from 'utils/request'
import IUser, {IUserBalanceCurrencyRaw} from 'data/interfaces/IUser'
import Converter from 'utils/converter'
import {UserFormData} from 'types/form-data'
import {IPhoneNewConfirm, IPhoneOldConfirm} from 'data/interfaces/IPhoneConfirm'
import IUserUpdateResponse from 'data/interfaces/IUserUpdateResponse'
import {DEFAULT_CURRENCY} from 'types/constants'

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
    const convertCurrencyToArray = (data: IUserBalanceCurrencyRaw, calculated: IUserBalanceCurrencyRaw, mainCurrency: string) => {
      return Object.keys(data).map(key => ({currency: key?.toUpperCase(), value: data[key], calculated: calculated[key], mainCurrency: DEFAULT_CURRENCY}))
    }
    if(res.data?.data) {
      const data = {...Converter.objectKeysToCamelCase(res.data?.data)}
     data.balance.currencies.bonus = convertCurrencyToArray(data.balance.currencies.bonus, data.balance.calculatedToDefaultCurrency.bonus, data.currencyIso)
      data.balance.currencies.real = convertCurrencyToArray(data.balance.currencies.real, data.balance.calculatedToDefaultCurrency.real, data.currencyIso)
      return data
    }else{
      return null
    }
  }
  static async updateUser(data: UserFormData): Promise<IUserUpdateResponse> {
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
      method: 'post',
      url: '/api/user/two-factor/activate',
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data?.qrUrl
  }
  static async twoFaConfirm({code, password}): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/user/two-factor/confirm',
      data: {code, password}
    })
    if (res?.err) {
      throw res.err
    }
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

  static async confirmOldPhone(data: {phone: string, code: string}): Promise<IPhoneOldConfirm> {
    const res = await request({
      method: 'post',
      url: '/api/user/info/confirm-old-phone',
      data,
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }
  static async confirmNewPhone(data: {phone: string, code: string}): Promise<IPhoneNewConfirm> {
    const res = await request({
      method: 'post',
      url: '/api/user/info/confirm-new-phone',
      data,
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }
}
