import { ICountry } from './../interfaces/ICountry'
import request from 'utils/request'
import {ICurrency} from 'data/interfaces/ICurrency'
import {ICity} from 'data/interfaces/ICity'
import Converter from 'utils/converter'


export default class InfoRepository {
  static async getCountries(): Promise<any | null> {
    const res = await request({
      method: 'get',
      url: '/api/content/geo/country',
    })
    if (res.err) {
      return []
    }
    return res.data.data
  }
  static async getCurrencies(): Promise<ICurrency[]> {
    const res = await request({
      method: 'get',
      url: '/api/finance/currency/index',
    })
    if (res.err) {
      return []
    }
    return res.data.data?.map(i => ({...Converter.objectKeysToCamelCase(i), rateCurrencies: i.rate_currencies})) ?? []
  }
  static async convertCurrency(currencyFrom: string, currencyTo: string, amount: number): Promise<boolean> {
    const res = await request({
      method: 'post',
      url: '/api/finance/currency/convert',
      data: {
        converted_from: currencyFrom,
        converted_to: currencyTo,
        amount
      }
    })
    if (res.err) {
      throw res.err
    }
    return true
  }

  static async getCurrencyByCountry(): Promise<ICurrency> {
    const res = await request({
      method: 'get',
      url: '/api/finance/currency/by-country',
    })
    if (res.err) {
      return null
    }
    return Converter.objectKeysToCamelCase(res?.data?.data)
  }

  static async getCountryByIp(): Promise<ICountry> {
    const res = await request({
      method: 'get',
      url: '/api/content/geo/country-by-ip',
    })
    if (res.err) {
      return null
    }
    return  res?.data?.data
  }

  static async getCities(countryIso: string): Promise<ICity[]> {
    const res = await request({
      method: 'get',
      url: '/api/content/geo/city',
      data: {
        country_iso: countryIso
      }
    })
    if (res.err) {
      return []
    }
    if(!res.data.data?.city){
      return []
    }

    return Object.keys(res.data.data?.city).map(key => ({id: key, name: res.data.data.city[key]}))
  }

}
