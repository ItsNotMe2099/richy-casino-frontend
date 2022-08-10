import request from 'utils/request'
import Converter from 'utils/converter'
import {IPagination} from 'types/interfaces'
import {IGameProvider} from 'data/interfaces/IGameProvider'
import {IGameCategory} from 'data/interfaces/IGameCategory'
import {IGame} from 'data/interfaces/IGame'
import {IGameWin} from 'data/interfaces/IGameWin'
import {IGameSession} from 'data/interfaces/IGameSession'
import {RICHY_CATEGORY_NAME} from 'types/constants'
import {IGameHistory} from 'data/interfaces/IGameHistory'
import {format, subDays} from 'date-fns'

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

  static async fetchCategories(name: string  = null, bannerSlogan: string  = null, page: number = 1, limit: number = 1000, isFeatured?: boolean): Promise<IPagination<IGameCategory>> {
    const res = await request({
      method: 'get',
      url: '/api/games/category',
      data:{
        ...(name ? {name} : {}),
        ...(bannerSlogan ? {banner_slogan: bannerSlogan} : {}),
        page,
        'per-page': limit,
      ...(typeof isFeatured !== 'undefined' ? {is_featured: isFeatured} : {})
      }
    })
    if (res.err) {
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }
  static async fetchGames({name, providerId, categoryId, providerInternalName}: {name?: string, providerId?: number, categoryId?: number, providerInternalName?: string} = {}, page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game',
      data:{
        ...(name ? {name} : {}),
        ...(providerId ? {provider_id: providerId} : {}),
        ...(categoryId ? {category_id: categoryId} : {}),
        ...(providerInternalName ? {providerInternalName} : {}),

        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return {data: [], total: 0}
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
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchLatestGames({name, providerId, categoryId, isLive}: {name?: string, providerId?: number, categoryId?: number, isLive?: boolean} = {}, page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/latest',
      data:{
        ...(name ? {name} : {}),
        ...(providerId ? {provider_id: providerId} : {}),
        ...(categoryId ? {category_id: categoryId} : {}),
        ...(typeof isLive !== 'undefined' ? {is_live: isLive} : {}),
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchPopularGames(page: number = 1, limit: number = 1000, isLive?: boolean): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/popular',
      data:{
        page,
        'per-page': limit,
        ...(typeof isLive !== 'undefined' ? {is_live: isLive} : {}),
      }
    })
    if (res.err) {
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }



  static async fetchLatestWinGames(): Promise<IGameWin[]> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/latest-win'
    })
    if (res.err) {
      return []
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }

  static async fetchTop(page: number = 1, limit: number = 1000, {dateFrom, dateTo}: {dateFrom?: string, dateTo?: string} = {}): Promise<IPagination<IGame>> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/top',
      data: {
        ...(dateFrom ? {date_from: dateFrom} : {}),
        ...(dateTo ? {date_to: dateTo} : {}),
      }
    })
    if (res.err) {
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchTopWeek(page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    return this.fetchTop(1, limit, {
      dateFrom: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      dateTo: format(new Date(), 'yyyy-MM-dd')
    })
  }
  static async fetchTopMonth(page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    return this.fetchTop(1, limit, {
      dateFrom: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
      dateTo: format(new Date(), 'yyyy-MM-dd')
    })
  }

  static async fetchGameSessionHistory(page: number = 1, limit: number = 1000): Promise<IPagination<IGameHistory>> {
    const res = await request({
      method: 'get',
      url: '/api/games/session/history',
      data:{
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return {data: [], total: 0}
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchGameInfo(id: number): Promise<IGame | null> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/info-game',
      data:{
       id
      }
    })
    if (res.err) {
      throw res.err
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

  static async createGame(gameId: number, clientType: string, token?: string, sessionId?: string, language?: string): Promise<IGameSession> {
    const res = await request({
      method: 'post',
      url: '/api/games/session/start',
      token,
      language,
      sessionId,
      data: {game_id: gameId, client_type: clientType}
    })
    if (res.err) {
      throw res.err
    }
    return res.data.data ?  Converter.objectKeysToCamelCase(res.data.data) : null
  }

  static async fetchRichy(page: number = 1, limit: number = 1000): Promise<IPagination<IGame>> {
    return this.fetchGames({providerInternalName: RICHY_CATEGORY_NAME}, page, limit)
  }

  static async createGameDemo(gameId: number, clientType: string, token?: string, sessionId?: string, language?: string): Promise<IGameSession> {
    const res = await request({
      method: 'post',
      url: '/api/games/session/demo',
      token,
      language,
      sessionId,
      data: {game_id: gameId, client_type: clientType}
    })
    if (res.err) {
      throw res.err
    }

    return res.data.data ?  Converter.objectKeysToCamelCase(res.data.data) : null
  }

}
