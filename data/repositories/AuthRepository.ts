import request from 'utils/request'
import IAuthResponse from 'data/interfaces/IAuthResponse'

export default class AuthRepository {
  static async login(login: string, password: string): Promise<IAuthResponse> {
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
  static async registerEmail({email, password, currency}): Promise<IAuthResponse | null> {
    const res = await request({
      method: 'post',
      url: '/api/user/auth/registration',
      data: {
        email,
        password,
        currency_iso: currency
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async registerPhoneSendOtp({phone, currency}): Promise<IAuthResponse | null> {
    const res = await request({
      method: 'post',
      url: '/api/user/auth/register/phone',
      data: {
         phone,
        currency_iso: currency
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async registerPhone({code, phone, authToken}): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/user/auth/sms',
      data: {
        code,
        password,
        authToken
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async forgotPassword(login): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/auth/forgotPassword',
      data: {
        authInput: login,
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async resetPassword({login, password, code}): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/auth/resetPassword',
      data: {
        authInput: login,
        password,
        password_confirmation: password,
        code
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

}
