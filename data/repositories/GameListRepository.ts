import request from 'utils/request'
import Converter from 'utils/converter'
import {IPagination} from 'types/interfaces'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import {IGame} from 'data/interfaces/IGame'
import {IGameWin} from 'data/interfaces/IGameWin'
import {IGameSession} from 'data/interfaces/IGameSession'
import {RICHY_CATEGORY_ID} from 'types/constants'

export default class GameListRepository {
  static async fetchProviders(name: string = null, page: number = 1, limit: number = 1000): Promise<IPagination<IGameProvider>> {
    const res = await request({
      method: 'get',
      url: '/api/games/provider',
      data:{
      ...(name ? {name} : {}),
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchCategories(name: string  = null, bannerSlogan: string  = null, page: number = 1, limit: number = 1000): Promise<IPagination<IGameCategory>> {
    const res = await request({
      method: 'get',
      url: '/api/games/category',
      data:{
        ...(name ? {name} : {}),
        ...(bannerSlogan ? {banner_slogan: bannerSlogan} : {}),
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }
  static async fetchGames({name, providerId, categoryId}: {name?: string, providerId?: number, categoryId?: number} = {}, page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game',
      data:{
        ...(name ? {name} : {}),
        ...(providerId ? {provider_id: providerId} : {}),
        ...(categoryId ? {category_id: categoryId} : {}),
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }
  static async fetchLiveGames({name, providerId, categoryId}: {name?: string, providerId?: number, categoryId?: number} = {}, page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/live',
      data:{
        ...(name ? {name} : {}),
        ...(providerId ? {provider_id: providerId} : {}),
        ...(categoryId ? {category_id: categoryId} : {}),
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchLatestGames({name, providerId, categoryId}: {name?: string, providerId?: number, categoryId?: number} = {}, page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/latest',
      data:{
        ...(name ? {name} : {}),
        ...(providerId ? {provider_id: providerId} : {}),
        ...(categoryId ? {category_id: categoryId} : {}),
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchPopularGames(page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/popular',
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

  static async fetchLatestWinGames(): Promise<IGameWin[]> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/latest-win',
    })
    if (res.err) {
      return null
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }

  static async createGame(gameId: number, clientType: string, token?: string): Promise<IGameSession> {
    const res = await request({
      method: 'post',
      url: '/api/games/session/start',
      token,
      data: {game_id: gameId, client_type: clientType}
    })
    console.log('gameId', gameId)
    console.error(res.err)
    if (res.err) {
      return null
    }
    return res.data.data ?  Converter.objectKeysToCamelCase(res.data.data) : null
  }

  static async fetchRichy(page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    return this.fetchGames({categoryId: RICHY_CATEGORY_ID}, page, limit)
  }

  static async createGameDemo(gameId: number, clientType: string, token?: string): Promise<IGameSession> {
    const res = await request({
      method: 'post',
      url: '/api/games/session/demo',
      token,
      data: {game_id: gameId, client_type: clientType}
    })
    if (res.err) {
      return null
    }
    console.log('ResData', res.data)
    return res.data.data ?  Converter.objectKeysToCamelCase(res.data.data) : null
  }

}
