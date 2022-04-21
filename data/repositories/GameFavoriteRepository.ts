import request from 'utils/request'
import Converter from 'utils/converter'
import {IGameFavoriteStatus} from 'data/interfaces/IGameFavorite'

export default class GameFavoriteRepository {
  static async fetchStatus(): Promise<number[]> {
    const res = await request({
      method: 'get',
      url: '/api/games/game/favorite-list',

    })
    if (res.err) {
      return []
    }
    return (res.data.data as IGameFavoriteStatus[])?.map(i => i.gameId)
  }

  static async create(gameId: number): Promise<IGameFavoriteStatus> {
    const res = await request({
      method: 'post',
      url: '/api/games/game/add-favorite',
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
      url: '/api/games/game/delete-favorite',
      data: {game_id: gameId}
    })
    if (res.err) {
      return null
    }
    return res.data.data ?  Converter.objectKeysToCamelCase(res.data.data) : null
  }

}
