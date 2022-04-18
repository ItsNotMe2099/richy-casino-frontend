import request from 'utils/request'
import Converter from 'utils/converter'
import {IPagination} from 'types/interfaces'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import {IGame} from 'data/interfaces/IGame'

export default class GameListRepository {
  static async fetchProviders(name: string = null, page: number = 1, limit: number = 1000): Promise<IPagination<IGameProvider>> {
    const res = await request({
      method: 'get',
      url: '/api/games/provider',
      data:{
        name,
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchCategories(name: string  = null, bannerSlogan: string  = null, page: number = 1, limit: number = 1000): Promise<IPagination<IGameCategory>> {
    const res = await request({
      method: 'get',
      url: '/api/games/category',
      data:{
        name,
        banner_slogan: bannerSlogan,
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }
  static async fetchGames({name, providerId, categoryId}: {name?: string, providerId?: number, categoryId?: number}, page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game',
      data:{
        name,
        provider_id: providerId,
        category_id: categoryId,
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }
  static async fetchLiveGames({name, providerId, categoryId}: {name?: string, providerId?: number, categoryId?: number}, page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/live',
      data:{
        name,
        provider_id: providerId,
        category_id: categoryId,
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
