import request from 'utils/request'
import Converter from 'utils/converter'
import {IDepositCryptoResponse, IDepositFiatResponse} from 'data/interfaces/IPaymentDeposit'
import {IWithdrawResponse} from 'data/interfaces/IPaymentWithDraw'
import {AxiosRequestConfig} from 'axios'

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
  static async depositFiat(currencyIso: string, paymentSystemId: number, paymentSystemCode: string, redirectUrl: string, amount: number, data: any): Promise<IDepositFiatResponse> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/deposit/fiat',
      data: {
        currency_iso: currencyIso,
        type_id: paymentSystemId,
        code: paymentSystemCode,
        redirect_url: redirectUrl,
        amount,
        ...(data?.extra_data ? {extra_data: data?.extra_data}: {})

      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }

  static async withdrawCrypto(currencyIso: string, paymentSystemId: number, paymentSystemCode: string, amount: number, address: string): Promise<IWithdrawResponse> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/withdrawal/crypto',
      data: {
        currency_iso: currencyIso,
        type_id: paymentSystemId,
        code: paymentSystemCode,
        amount,
        address
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }
  static async withdrawFiat(currencyIso: string, paymentSystemId: number, paymentSystemCode: string, redirectUrl: string, amount: number, wallet: string, cardHolder: string, cardExpiry: string, data: any): Promise<IWithdrawResponse> {
    const date = cardExpiry ? Converter.getMonthYearCardExpiry(cardExpiry) : null
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/withdrawal/fiat',
      data: {
        currency_iso: currencyIso,
        type_id: paymentSystemId,
        code: paymentSystemCode,
        redirect_url: redirectUrl,
        amount,
        wallet,
        card_holder_name: cardHolder,
      ...(date ? {card_valid_month: date.month, card_valid_year: date.year} : {}),
        ...(data?.extra_data ? {extra_data: data?.extra_data}: {})
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

  static async purchaseCalculate(currencyIsoFrom: string, currencyIsoTo: string, amount: number, config?: AxiosRequestConfig): Promise<{ currencyIsoFrom: string, currencyIsoTo: string, amount: number, resultCoinAmount: number }> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/purchase/calculate',
      data: {
        currency_iso_from: currencyIsoFrom,
        currency_iso_to: currencyIsoTo,
        amount
      },
      config
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }

  static async purchaseCrypto(currencyIsoFrom: string, currencyIsoTo: string, amount: string | number): Promise<{ currencyIsoFrom: string, currencyIsoTo: string, paymentUrl: string }> {
    const res = await request({
      method: 'post',
      url: '/api/finance/payment/purchase/crypto',
      data: {
        currency_iso_from: currencyIsoFrom,
        currency_iso_to: currencyIsoTo,
        amount
      }
    })
    if (res.err) {
      throw res.err
    }
    return res.data?.data ? Converter.objectKeysToCamelCase(res.data?.data) : null
  }


}
