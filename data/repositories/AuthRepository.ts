import request from 'utils/request'

export default class AuthRepository {
  static async login(login: string, password: string): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/auth/login',
      data: {
        authInput: login,
        password: password,
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }
  static async registerEmail({email, password, currency}): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/auth/register',
      data: {
        email,
        password,
        currencyIso: currency
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async registerPhoneSendOtp({phone}): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/auth/register/phone',
      data: {
        phoneNumber: phone
      },
    })
    console.log('ress', res)
    if (res?.err) {
      throw res.err
    }
    return res.data?.data
  }

  static async registerPhone({code, password, authToken}): Promise<any> {
    const res = await request({
      method: 'post',
      url: '/api/auth/register/checkotp',
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

}
