import request from 'utils/request'
import {IAuthEmailResponse, IAuthLoginResponse, IAuthPhoneResponse} from 'data/interfaces/IAuthResponse'

export default class AuthRepository {
  static async login(login: string, password: string): Promise<IAuthLoginResponse> {
    const res = await request({
      method: 'post',
      url: '/api/user/auth/login',
      data: {
        identity: login,
        password: password,
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }
  static async logout(): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/user/auth/logout',
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }
  static async registerEmail({email, password, currency}): Promise<IAuthEmailResponse> {
    const res = await request({
      method: 'post',
      url: '/api/user/auth/registration/email',
      data: {
        email,
        password,
        password2: password,
        currency_iso: currency
      },
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async registerPhoneSendOtp({phone, currency}): Promise<{ id: string, phone: string, currency_iso: string }> {
    const res = await request({
      method: 'post',
      url: '/api/user/registration/phone',
      data: {
         phone,
        currency_iso: currency
      },
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async registerPhone({code, phone, password}): Promise<IAuthPhoneResponse> {
    const res = await request({
      method: 'post',
      url: '/api/user/sms/activate',
      data: {
        phone,
        code,
        password,
        password2: password
      },
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async forgotPassword(login): Promise<{identity: string}> {
    const res = await request({
      method: 'post',
      url: '/api/user/password/request',
      data: {
        identity: login,
      },
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async resetPassword({identity, token, password}): Promise<{ id: string }> {
    const res = await request({
      method: 'post',
      url: '/api/user/password/restore',
      data: {
        identity,
        token,
        password,
        password2: password,
      },
    })
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

}
