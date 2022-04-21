import { IApiPaginationResponse, IApiResponse, IOption, IPosition } from 'types/interfaces'
import {ICurrency} from 'data/interfaces/ICurrency'
import { IUserBalanceCurrency } from 'data/interfaces/IUser'
import UserUtils from 'utils/user'
const camelcaseObjectDeep = require('camelcase-object-deep')

export default class Converter {
  static convertLibphonenumberToMask = (value: string): string => value
    .replace('x', '+')
    .replaceAll('x', '0')

  static objectKeysToCamelCase(entity) {
      return camelcaseObjectDeep(entity)
  }

  static convertApiPaginationResponse(res: IApiPaginationResponse){
    return res?.data ? {
      data: res.data?.map(i => Converter.objectKeysToCamelCase(i)),
      total: res._meta?.totalCount
    } : null
  }
  static  convertApiResponseError(res: IApiResponse){
    if (res.error.details?.length > 0) {
      const messages = res.error.details.map(i => i.message)
      return messages.length === 1 ? messages[0] : messages
    }
    if(res?.error?.message){
      return res?.error?.message
    }

    return 'api_error_unknown'

  }
  static convertCurrencyToOptions(currencies: ICurrency[]): IOption<string>[]{
    if (!currencies) {
      return []
    }
    return currencies.map(i => ({
      label: `${i.name} (${i.iso})`,
      value: i.iso
    }))
  }
  static convertCurrencyToOptionsExchange(currencies: ICurrency[]): IOption<string>[]{
    return currencies.map(i => ({
      label: i.name,
      value: i.iso
    }))
  }

  static  convertUserBalanceCurrencyToOption(item: IUserBalanceCurrency): IOption<string>{
    return {
      label: item.currency,
      value: `${item.value}`,
      symbol: UserUtils.getCurrencyIcon(item.currency)
    }
  }

  static  convertUserBalanceCurrencyToOptions(currencies: IUserBalanceCurrency[]): IOption<string>[]{
    return currencies.map(i => this.convertUserBalanceCurrencyToOption(i))
  }

  static currentItem(values, options: IOption<string>[]){
    const array = options.filter(item => item.value === values.currency)
    return array[0]
  }

  static positionsToPoints(positions: IPosition[]): number[]{
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
}
