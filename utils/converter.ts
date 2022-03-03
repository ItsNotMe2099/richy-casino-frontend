import {mapKeys, mapValues, camelCase, isObject} from 'lodash'
import {IApiPaginationResponse, IOption} from 'types/interfaces'
import {ICurrency} from 'data/interfaces/ICurrency'
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
export const convertCurrencyToOptions = (currencies: ICurrency[]): IOption<string>[] => {
  return currencies.map(i => ({
    label:`${i.name} (${i.iso})`,
    value: i.iso
  }))
}
