
export enum ModalType {
  login,
  registration,
  passwordReset,
  passwordRecovery,
  registrationSuccess,
  registrationPhone = 12,
  fortune = 9,
  bonus = 10,
  profileBurger = 11,
  createGame = 19,
  opponents = 20,
}

export enum ProfileModalType {
  paymentHistory = 5,
  profile = 6,
  settings = 7,
  wallet = 8,
  exchange = 13,
  favorite = 14,
  betsHistory = 15,
  buyCrypto = 16,
  FA = 17,
  withdraw = 18
}

export enum CookiesType {
  accessToken = 'accessToken',
  Language = 'language'
}

export enum GameType{
  Baccarat = 'baccarat',
  Blackjack = 'blackjack',
  Coinflip = 'coinflip',
  Crash = 'crash',
  Diamonds = 'diamonds',
  Dice = 'dice',
  HiLo = 'hilo',
  Keno = 'keno',
  Limbo = 'limbo',
  Mines = 'mines',
  Plinko = 'plinko',
  Roulette = 'roulette',
  Stairs = 'stairs',
  Tower = 'tower',
  VideoPoker = 'videoPoker',
  Wheel = 'wheel',
}

export enum BetSwitchFilterKey{
  All = 'all',
  My = 'my'
}

export enum PaymentSwitchFilterKey{
  All = 'all',
  Deposit = 'deposit',
  Withdrawal = 'withdrawal'
}
export enum SnackbarType {
  error,
  success,
}
export enum FavoriteEntityType {
  games = 'games',
}
