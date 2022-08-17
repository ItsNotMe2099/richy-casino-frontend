import request from 'utils/request'
import {
  IAuthEmailResponse,
  IAuthFaLoginResponse,
  IAuthLoginResponse,
  IAuthPhoneResponse
} from 'data/interfaces/IAuthResponse'
import Converter from 'utils/converter'

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
    if (res?.err) {
      throw res.err
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

  static async socialLogin(data: any, referer: string): Promise<IAuthLoginResponse> {
    const res = await request({
      method: 'get',
      url: '/api/user/social/login',
      data: {
        ...data
      },
      referer,
    })
    if (res?.err) {
      throw res.err
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

  static async telegramLogin(data: any): Promise<IAuthLoginResponse> {
    const res = await request({
      method: 'get',
      url: '/api/user/social/telegram',
      data: {
        ...data
      }
    })
    if (res?.err) {
      throw res.err
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

  static async faLogin(login: string, password: string, code: string): Promise<IAuthFaLoginResponse> {
    const res = await request({
      method: 'post',
      url: '/api/user/two-factor/login',
      data: {
        identity: login,
        password,
        code,
      },
    })
    if (res?.err) {
      throw res.err
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }
  static async logout(): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/user/auth/logout',
    })
    if (res?.err) {
      throw res.err
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }
  static async registerEmail({email, password, currency}): Promise<IAuthEmailResponse> {
    const res = await request({
      method: 'post',
      url: '/api/user/registration/email',
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
    return Converter.objectKeysToCamelCase(res.data?.data)
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
    return Converter.objectKeysToCamelCase(res.data?.data)
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
    return Converter.objectKeysToCamelCase(res.data?.data)
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
    return Converter.objectKeysToCamelCase(res.data?.data)
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
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

}
