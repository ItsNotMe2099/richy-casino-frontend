import request from 'utils/request'
import Converter from 'utils/converter'
import {IPagination} from 'types/interfaces'
import {ITournamentRichy} from 'data/interfaces/ITournamentRichy'
import {ITournamentHistory, ITournamentHistoryItem} from 'data/interfaces/ITournamentHistory'
import {ITournamentPosition} from 'data/interfaces/ITournamentPosition'
import {ITournamentNearest} from 'data/interfaces/ITournamentNearest'
import {ITournamentWinner} from 'data/interfaces/ITournamentWinner'
import {ITournamentUserRoundActive} from '../interfaces/ITournamentUserActive'
import {ITournamentStanding} from 'data/interfaces/ITournamentStanding'
import {ITournamentTop10List} from 'data/interfaces/ITournamentTop10'
import {AxiosRequestConfig} from 'axios'
interface ITournamentParticipateResponse{
  userId: number
  nickname: string
  tournamentId: number
  place: number
  currency: string
}
export default class TournamentRepository {

  static async fetchRichyTournament(): Promise<ITournamentRichy> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/richy',
    })
    if (res.err) {
      return null
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }
  static async fetchUserActiveRounds(): Promise<ITournamentUserRoundActive[]> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/active',
    })
    if (res.err) {
      return null
    }
    return res.data?.data.map(i => Converter.objectKeysToCamelCase(i))
  }

  static async participate(tournamentId: number): Promise<ITournamentParticipateResponse> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/participate',
      data: {tournament_id: tournamentId}
    })
    if (res.err) {
      throw res.err
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
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

  static async fetchNearest(): Promise<ITournamentNearest> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/nearest',
    })
    if (res.err) {
      return null
    }
    return Converter.objectKeysToCamelCase(res.data?.data)
  }

  static async fetchPositions(): Promise<ITournamentPosition[]> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/position',
    })
    if (res.err) {
      return null
    }
    return  res.data.data?.map(i => Converter.objectKeysToCamelCase(i))
  }
  static async fetchTop10({tournamentId, roundId}: {tournamentId?: number, roundId?: number} = {}): Promise<ITournamentTop10List> {
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



  static async fetchRoundStandings(tournamentRoundId: number, page = 1, limit = 10, config?: AxiosRequestConfig): Promise<IPagination<ITournamentStanding>> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/standings',
      data: {
        tournament_round_id: tournamentRoundId,
        page, 'per-page': limit
      },
      config
    })
    if (res.err) {
      throw res.err
    }
    return Converter.convertApiPaginationResponse(res.data)
  }

  static async fetchLastWinners(): Promise<ITournamentWinner[]> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round/last-winner',
    })
    if (res.err) {
      return null
    }
    return  res.data.data?.map(i => Converter.objectKeysToCamelCase(i))
  }

  static async fetchRoundByTournamentId(tournamentId: string | number): Promise<ITournamentHistoryItem | null> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round',
      data: {
        tournament_id: tournamentId
      }
    })
    if (res.err) {
      return null
    }
    if(res.data?.data?.length === 0){
      return null
    }
    return res.data?.data.map(i => Converter.objectKeysToCamelCase(i))[0]
  }
  static async fetchRoundByIdId(roundId: string | number): Promise<ITournamentHistoryItem | null> {
    const res = await request({
      method: 'get',
      url: '/api/tournament/round',
      data: {
        id: roundId
      }
    })
    if (res.err) {
      return null
    }
    if(res.data?.data?.length === 0){
      return null
    }
    return res.data?.data.map(i => Converter.objectKeysToCamelCase(i))[0]
  }

}
