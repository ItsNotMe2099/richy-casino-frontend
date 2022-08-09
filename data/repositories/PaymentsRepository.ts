import request from 'utils/request'
import Converter from 'utils/converter'
import {IDepositCryptoResponse, IDepositFiatResponse} from 'data/interfaces/IPaymentDeposit'
import {IWithdrawResponse} from 'data/interfaces/IPaymentWithDraw'

export default class PaymentsRepository {
  static async depositCrypto(currencyIso: string, paymentSystemId: number, paymentSystemCode: string, amount: number): Promise<IDepositCryptoResponse> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/deposit/crypto',
      data: {
        currency_iso: currencyIso,
        type_id: paymentSystemId,
        code: paymentSystemCode,
        amount
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }
  static async depositFiat(currencyIso: string, paymentSystemId: number, paymentSystemCode: string, redirectUrl: string, amount: number): Promise<IDepositFiatResponse> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/deposit/fiat',
      data: {
        currency_iso: currencyIso,
        type_id: paymentSystemId,
        code: paymentSystemCode,
        redirect_url: redirectUrl,
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

  static async purchaseCalculate(currencyIsoFrom: string, currencyIsoTo: string, amount: number): Promise<{ currencyIsoFrom: string, currencyIsoTo: string, amount: number, resultCoinAmount: number }> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/purchase/calculate',
      data: {
        currency_iso_from: currencyIsoFrom,
        currency_iso_to: currencyIsoTo,
        amount
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data
  }


}
