import request from 'utils/request'
import {convertApiPaginationResponse} from 'utils/converter'
import {IPagination} from 'types/interfaces'
import {IBalanceTransaction, IBalanceTransactionType} from 'data/interfaces/IBalanceTransaction'

export default class BalanceTransactionRepository {
   static async fetchTransactions(type: IBalanceTransactionType, page: number = 1, limit: number = 1000): Promise<IPagination<IBalanceTransaction>> {
    const res = await request({
      method: 'get',
      url: '/api/finance/transaction',
      data:{
        type,
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
   return convertApiPaginationResponse(res.data)
  }

}
