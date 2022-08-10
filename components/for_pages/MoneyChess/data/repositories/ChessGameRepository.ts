
import request from 'components/for_pages/games/utils/request'
import {ChessGamePlayerActionDto, IChessGameCreateFormData} from 'components/for_pages/MoneyChess/data/types'
import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import { ChessGameSquare, GamePlayerActionType} from 'components/for_pages/MoneyChess/data/enums'
import {IGamePagination} from 'components/for_pages/games/data/interfaces/IGamePagination'
import {IChessGameAction} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameAction'
export interface IChessGameListRequest{
   betAmountFrom?: number
  betAmountTo?: number
   times?: string[]
}
export default class ChessGameRepository {
  static async create(data: IChessGameCreateFormData): Promise<IChessGame | null> {
    const res = await request({
      method: 'post',
      url: '/api/chess-game/table',
      data

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async findById(id: number, token?: string): Promise<IChessGame | null> {
    const res = await request({
      method: 'get',
      url: `/api/chess-game/table/${id}`,
      token
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listMyActive(data: IChessGameListRequest, page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/active/my',
      data: {...data, page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listAllActive(data: IChessGameListRequest, page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/active/all',
      data: {...data, page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listMyHistory(page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/history/my',
      data: {page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }
  static async listAllHistory(page: number = 1, limit: number = 30): Promise<IGamePagination<IChessGame> | null> {
    const res = await request({
      method: 'get',
      url: '/api/chess-game/table/history/all',
      data: {page, limit}

    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async sit(tableId: number): Promise<IChessGame | null>  {
    const res = await request({
      method: 'post',
      url: `/api/chess-game/table/${tableId}/sit`
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async exit(id: number): Promise<IChessGame | null>  {
    const res = await request({
      method: 'post',
      url: `/api/chess-game/table/${id}/exit`,
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async resetGame(id: number): Promise<IChessGame | null>  {
    const res = await request({
      method: 'post',
      url: `/api/chess-game/table/${id}/reset`,
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async acceptReset(id: number): Promise<IChessGame | null>  {
    const res = await request({
      method: 'post',
      url: `/api/chess-game/table/${id}/acceptReset`,
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }


  static async action(data: ChessGamePlayerActionDto): Promise<IChessGameAction | null>  {
    const res = await request({
      method: 'put',
      url: '/api/chess-game/player/game-action',
      data
    })
    if (res?.err) {
      throw res.err
    }
    return res.data
  }

  static async startGame(tableId: number): Promise<IChessGameAction | null>  {
    return ChessGameRepository.action({type: GamePlayerActionType.StartGame, tableId, accept: true})
  }

  static async newDices(tableId: number): Promise<IChessGameAction | null>  {
    return ChessGameRepository.action({type: GamePlayerActionType.NewDices, tableId})
  }
  static async selectPiece(tableId: number, squareFrom: ChessGameSquare): Promise<IChessGameAction | null>  {
    return ChessGameRepository.action({type: GamePlayerActionType.SelectPiece, tableId, squareFrom})
  }
  static async move(tableId: number, squareFrom: ChessGameSquare, squareTo: ChessGameSquare): Promise<IChessGameAction | null>  {
    return ChessGameRepository.action({type: GamePlayerActionType.Move, tableId, squareFrom, squareTo})
  }
  static async askDraw(tableId: number): Promise<IChessGameAction | null>  {
    return ChessGameRepository.action({type: GamePlayerActionType.OfferDraw, tableId})
  }
  static async rejectDraw(tableId: number): Promise<IChessGameAction | null>  {
    return ChessGameRepository.action({type: GamePlayerActionType.AcceptDraw, tableId, accept: false})
  }
  static async acceptDraw(tableId: number): Promise<IChessGameAction | null>  {
    return ChessGameRepository.action({type: GamePlayerActionType.AcceptDraw, tableId, accept: true})
  }

}
