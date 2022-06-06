import request from 'utils/request'
import Converter from 'utils/converter'
import {IPagination} from 'types/interfaces'
import {ITournamentRichy} from 'data/interfaces/ITournamentRichy'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import {ITournamentPosition} from 'data/interfaces/ITournamentPosition'
import {ITournamentNearest} from 'data/interfaces/ITournamentNearest'
import {ITournamentWinner} from 'data/interfaces/ITournamentWinner'
import {ITournamentTop10List} from 'data/interfaces/ITournamentTop10'

export default class TournamentRepository {

  static async fetchRichyTournaments(): Promise<IPagination<ITournamentRichy[]>> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/richy',
    })
    if (res.err) {
      return null
    }
    return  res.data.data?.map(i => Converter.objectKeysToCamelCase(i))
  }

  static async fetchHistory(page: number = 1, limit: number = 1000): Promise<IPagination<ITournamentHistory>> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/history',
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

  static async fetchNearest(page: number = 1, limit: number = 1000): Promise<ITournamentNearest> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/nearest',
      data:{
        page,
        'per-page': limit
      }
    })
    if (res.err) {
      return null
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

  static async fetchPositions(): Promise<IPagination<ITournamentPosition[]>> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/position',
    })
    if (res.err) {
      return null
    }
    return  res.data.data?.map(i => Converter.objectKeysToCamelCase(i))
  }

  static async fetchTop10({tournamentId, roundId}: {tournamentId?: number, roundId?: number} = {}): Promise<ITournamentTop10List[]> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/top10',
      data: {
        ...(tournamentId ? {tournament_id: roundId} : {}),
        ...(roundId ? {round_id: roundId} : {})
      }
    })
    if (res.err) {
      return null
    }
    return  res.data.data?.map(i => Converter.objectKeysToCamelCase(i))
  }

  static async fetchWinners(): Promise<ITournamentWinner[]> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/last-winner',
    })
    if (res.err) {
      return null
    }
    return  res.data.data?.map(i => Converter.objectKeysToCamelCase(i))
  }

}
