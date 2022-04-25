import request from 'utils/request'
import Converter from 'utils/converter'
import {IPagination} from 'types/interfaces'
import {BalanceTransactionType, IBalanceTransaction} from 'data/interfaces/IBalanceTransaction'
import {IWithdrawHistory} from 'data/interfaces/IWithdrawHistory'
const queryString = require('query-string')
export default class BalanceTransactionRepository {
  static async fetchTransactions(type: BalanceTransactionType[], page: number = 1, limit: number = 1000): Promise<IPagination<IBalanceTransaction>> {
    const res = await request({
      method: 'get',
      url: `/api/finance/transaction?${queryString.stringify({
        type,
        page,
        'per-page': limit
      }, {arrayFormat: 'bracket'})}`,

    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchWithdrawalHistory( page: number = 1, limit: number = 1000): Promise<IPagination<IWithdrawHistory>> {
    const res = await request({
      method: 'get',
      url: '/api/finance/payment/withdrawal/list',
      data:{
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

}
