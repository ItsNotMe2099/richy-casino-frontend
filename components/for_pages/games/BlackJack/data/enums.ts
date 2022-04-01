export enum BlackjackBetType{
  Info = 'info',
  Stand = 'stand',
  Split = 'split',
  Hit = 'hit',
  Double = 'double',
  Insurance = 'insurance',
}
export enum IBlackjackCardType{
  Spades = 'spades',
  Headers = 'hearts',
  Clubs = 'clubs',
  Diamonds = 'diamonds'
}
export interface IBlackjackCard{
  index: number
  type: IBlackjackCardType
  value: string,
  rank: number,
  slot: number,
  blackjackValue: number
}
