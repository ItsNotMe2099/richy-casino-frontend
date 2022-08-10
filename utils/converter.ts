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
    console.log('ApiResponse', res)
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
}
