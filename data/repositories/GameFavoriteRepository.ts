import request from 'utils/request'
import Converter from 'utils/converter'
import {IGameFavoriteStatus} from 'data/interfaces/IGameFavorite'
import {IGame} from 'data/interfaces/IGame'

export default class GameFavoriteRepository {
  static async fetchStatus(): Promise<number[]> {
    const res = await request({
      method: 'get',
      url: '/api/games/favorite/index',

    })
    if (res.err) {
      return []
    }
    return (res.data.data as string[]).map(i => parseInt(i, 10))
  }

  static async fetchGames(): Promise<IGame[]> {
    const res = await request({
      method: 'get',
      url: '/api/games/favorite/games',

    })
    if (res.err) {
      return []
    }
    return res.data.data?.map(i => Converter.objectKeysToCamelCase(i)) ?? []
  }

  static async create(gameId: number): Promise<IGameFavoriteStatus> {
    const res = await request({
      method: 'post',
      url: '/api/games/favorite/add',
      data: {game_id: gameId}
    })
    if (res.err) {
      return null
    }
    return res.data.data ?  Converter.objectKeysToCamelCase(res.data.data) : null
  }

  static async delete(gameId: number): Promise<IGameFavoriteStatus> {
    const res = await request({
      method: 'post',
      url: '/api/games/favorite/remove',
      data: {game_id: gameId}
    })
    if (res.err) {
      return null
    }
    return res.data.data ?  Converter.objectKeysToCamelCase(res.data.data) : null
  }

}
