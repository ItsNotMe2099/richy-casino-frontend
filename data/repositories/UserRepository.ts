import request from 'utils/request'
import IUser from 'data/interfaces/IUser'
import {objectKeysToCamelCase} from 'utils/converter'
import {UserFormData} from 'types/form-data'

export default class UserRepository {
  static async getUser(): Promise<IUser | null> {
    const res = await request({
      method: 'get',
      url: '/api/user/info',
    })
    if (res.err) {
      return null
    }
    return res.data?.data ? {...objectKeysToCamelCase(res.data?.data)} : null
  }
  static async updateUser(data: UserFormData): Promise<IUser | null> {
    const res = await request({
      method: 'post',
      url: '/api/user/info/update',
      data
    })
    if (res.err) {
      return null
    }
    return res.data?.data ? {...objectKeysToCamelCase(res.data?.data)} : null
  }
  static async changePassword({currentPassword, newPassword}): Promise<any> {
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
}
