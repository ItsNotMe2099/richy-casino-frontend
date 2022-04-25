import request from 'utils/request'
import Converter from 'utils/converter'
import {IDepositCryptoResponse} from 'data/interfaces/IPaymentDeposit'
import {IWithdrawResponse} from 'data/interfaces/IPaymentWithDraw'

export default class PaymentsRepository {
  static async depositCrypto(currencyIso: string, amount: number): Promise<IDepositCryptoResponse> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/deposit/crypto',
      data: {
        currency_iso: currencyIso,
        amount
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }

  static async withdrawRequest(currencyIso: string, amount: number, address: string): Promise<IWithdrawResponse> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/withdrawal/request',
      data: {
        currency_iso: currencyIso,
        amount,
        address
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }
  static async createBalance(currencyIso: string): Promise<{ currency_iso: string }> {
    const res = await request({
      method: 'post',
      url: '/api/finance/balance/create',
      data: {
        currency_iso: currencyIso
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data
  }


}
