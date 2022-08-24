import {IGame} from 'data/interfaces/IGame'
import {IGameProvider} from 'data/interfaces/IGameProvider'

export enum ITournamentRoundStatus {
  Active = 'active',
  Block = 'blocked',
  Payment = 'payment',
  Complete = 'complete'
}

export interface ITournamentHistoryUser {
  currentPlace: number
  remainingAmountSpentForNextSeat: number
  spentSum: number
  currencyIso: string
}
export interface ITournamentHistory {
  id?: number
  image: string
  imageMobile: string
  tournamentId?: number
  status?: ITournamentRoundStatus
  timeStart: string
  timeEnd: string
  timeBeforeEnd: string
  nexTimeStart: string
  participantsCount: number
  totalBankMoneyAmount: number
  totalUsersSpentMoneyAmount: number
  currency: string
  internalName: string
  tournamentName: string
  user: ITournamentHistoryUser
}
export interface ITournamentProvider extends IGameProvider{
  games: IGame[]
}
export interface ITournamentHistoryItem extends ITournamentHistory{
  providers: ITournamentProvider[]
}
