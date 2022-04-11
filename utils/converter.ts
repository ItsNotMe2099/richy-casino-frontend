import {mapKeys, mapValues, camelCase, isObject} from 'lodash'
import { IApiPaginationResponse, IApiResponse, IOption, IPosition } from 'types/interfaces'
import {ICurrency} from 'data/interfaces/ICurrency'
import { IUserBalanceCurrency } from 'data/interfaces/IUser'
export const convertLibphonenumberToMask = (value: string): string => value
  .replace('x', '+')
  .replaceAll('x', '0')

export function objectKeysToCamelCase(entity) {
  if (!isObject(entity)) return entity
  let result
  result = mapKeys(entity, (value, key) => camelCase(key))
  result = mapValues(result, (value) => objectKeysToCamelCase(value))
  return result
}
export const convertApiPaginationResponse = (res: IApiPaginationResponse) => {
  return res?.data ? {
    data: res.data?.map(i => objectKeysToCamelCase(i)),
    total: res._meta?.totalCount
  } : null
}
export const convertApiResponseError = (res: IApiResponse) => {
  if(!res.error.details?.length){
    return 'Unknown error'
  }
  const messages =  res.error.details.map(i => i.message)
  return messages.length === 1 ? messages[0] : messages
}
export const convertCurrencyToOptions = (currencies: ICurrency[]): IOption<string>[] => {
  if (!currencies) {
    return []
  }
  return currencies.map(i => ({
    label:`${i.name} (${i.iso})`,
    value: i.iso
  }))
}
export const convertCurrencyToOptionsExchange = (currencies: ICurrency[]): IOption<string>[] => {
  return currencies.map(i => ({
    label: i.name,
    value: i.iso
  }))
}

export const convertUserBalanceCurrencyToOptions = (currencies: IUserBalanceCurrency[]): IOption<string>[] => {
  return currencies.map(i => ({
    label: i.currency,
    value: `${i.value}`
  }))
}

export const currentItem = (values, options: IOption<string>[]) => {
  const array = options.filter(item => item.value === values.currency)
  return array[0]
}

export const positionsToPoints = (positions: IPosition[]): number[] => {
  const points: number[] = []
  positions.forEach(item => {
    points.push(item.x)
    points.push(item.y)
  })
  return points
}
