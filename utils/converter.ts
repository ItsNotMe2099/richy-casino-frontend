import { IApiPaginationResponse, IApiResponse, IOption, IOptionUserAccount, IPosition } from 'types/interfaces'
import { ICurrency } from 'data/interfaces/ICurrency'
import { IUserBalanceCurrency } from 'data/interfaces/IUser'
import UserUtils from 'utils/user'
import {DEFAULT_CURRENCY} from 'types/constants'
const camelcaseObjectDeep = require('camelcase-object-deep')

export default class Converter {
  static convertLibphonenumberToMask = (value: string): string => value
    .replace('x', '+')
    .replaceAll('x', '0')

  static objectKeysToCamelCase(entity) {
    return camelcaseObjectDeep(entity)
  }

  static convertApiPaginationResponse(res: IApiPaginationResponse) {
    return res?.data ? {
      data: res.data?.map(i => Converter.objectKeysToCamelCase(i)),
      total: res._meta?.totalCount,
      totalPages: res._meta?.pageCount
    } : null
  }
  static convertApiResponseError(res: IApiResponse) {
    if (res?.error?.details?.length > 0) {
      const messages = res.error.details.map(i => i.message)
      return messages.length === 1 ? messages[0] : messages
    }
    if (res?.error?.message) {
      return res?.error?.message
    }

    return 'api_error_unknown'

  }
  static prepareUserCurrency(currencies: ICurrency[]): IOption<string>[] {
    if (!currencies) {
      return []
    }
    return currencies.map(i => ({
      label: `${i.name} (${i.iso})`,
      value: i.iso
    }))
  }
  static convertCurrencyToOptions(currencies: ICurrency[]): IOption<string>[] {
    if (!currencies) {
      return []
    }
    return currencies.map(i => ({
      label: `${i.name} (${i.iso})`,
      value: i.iso,
      symbol: UserUtils.getCurrencyIcon(i.iso)
    }))
  }
  static convertCurrencyToOptionsExchange(currencies: ICurrency[]): IOption<string>[] {
    return currencies.map(i => ({
      label: i.iso,
      value: i.iso
    }))
  }

  static convertUserBalanceCurrencyToOption(item: IUserBalanceCurrency): IOptionUserAccount {
    return {
      label: item.currency,
      value: item.currency,
      balance: item.value,
      mainCurrency: DEFAULT_CURRENCY,
      calculatedBalance: item.calculated,
      symbol: UserUtils.getCurrencyIcon(item.currency)
    }
  }

  static convertUserBalanceCurrencyToOptions(currencies: IUserBalanceCurrency[]): IOptionUserAccount[] {
    return currencies.map(i => this.convertUserBalanceCurrencyToOption(i))
  }

  static currentItem(values, options: IOption<string>[]) {
    const array = options.filter(item => item.value === values.currency)
    return array[0]
  }

  static positionsToPoints(positions: IPosition[]): number[] {
    const points: number[] = []
    positions.forEach(item => {
      points.push(item.x)
      points.push(item.y)
    })
    return points
  }

  static angleToPosition(angle: number, radius: number): IPosition {
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    }
  }
  static splitIntoGroups<T>(arr: T[], groupSize: number): T[][] {
    let chunksArr = []
    if (arr != null && arr != undefined) {
      for (let i = 0; i < arr.length; i += groupSize) {
        if (arr.length - i >= groupSize)
          chunksArr.push(arr.slice(i, i + groupSize))
        else
          chunksArr.push(arr.slice(i, arr.length))
      }
      return chunksArr
    }
  }
  static getMonthYearCardExpiry(value: string): {month: number, year: number} | null{
    const split = value.split('/')
    if(split.length !== 2){
      return null
    }
    return {month: parseInt(split[0], 0), year: parseInt(split[1], 0)}
  }

  static convertRateToMin(rate: number, mul: number){
    const value = mul / rate
    let round = value
    /*
    если число больше нуля то проверяем сколько знаков до точки
     */
    let m; let count, number
    if(value > 1){

      if(value <= 5){
        round = 5
      }else if (value <= 10){
        round = 10
      }else if (value <= 50){
        round = 50
      }else if (value <= 100){
        round = 100
      }else if (value <= 250){
        round = 250
      }else if (value <= 500){
        round = 500
      }else if (value <= 750){
        round = 750
      }else if (value <= 1000){
        round = 1000
      }else if(value > 1000){
        const countBeforeDot =`${value}`.includes('.') ? `${value}`.split('.')[0].length : 1
        //15000
        //
        m = `1${Array.from({length: countBeforeDot - 1 }, (v, i) => '0').join('')}`
        round = Math.floor(value/500) * 500
        const round1000 = Math.floor(value/1000) * 1000
        if(value <= round1000 + 500){
          round = round1000 + 500
        }else{
          round = round1000 + 1000
        }
      }
    }else{
      const afterDot = `${value}`.split('.')[1]
      count = (afterDot.match(/^0+/) || [''])[0].length

      number = parseInt(`${parseInt(afterDot, 10)}`[0], 10)
      if(number < 5){
        m = `${Array.from({length: count }, (v, i) => '0').join('')}`
        round = parseFloat(`0.${m}1`)

      }else if(count > 0){
        m = `${Array.from({length: count - 1 }, (v, i) => '0').join('')}`
        round = parseFloat(`0.${m}1`)
      }else{
        round = 1
      }

    }
    return round
  }
   static sortByOrder(data: any, order: string[]){
    const sortByObject = order
      .reduce((obj, item, index) => {
        return {
          ...obj,
          [item.toLowerCase()]: index,
        }
      }, {})

    let key = order.length
    for(const item of data){
      if(typeof sortByObject[item.name?.toLowerCase()] === 'undefined') {
        sortByObject[item.name?.toLowerCase()] = key
      }
      ++key
    }
    const sorted = data.sort((a, b) => sortByObject[a.name?.toLowerCase()] - sortByObject[b.name?.toLowerCase()])
     return sorted
  }
}
