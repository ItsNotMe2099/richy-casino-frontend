
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
  paymentHistory = 'paymentHistory',
  profile = 'profile',
  settings = 'settings',
  wallet = 'wallet',
  exchange = 'exchange',
  favorite = 'favorite',
  betsHistory = 'betsHistory',
  buyCrypto = 'buyCrypto',
  FA = 'FA',
  withdraw = 'withdraw'
}

export enum CookiesType {
  accessToken = 'accessToken',
  sessionId = 'sessionId',
  language = 'language',
  notificationShown = 'notificationShown',
  firstVisitAt = 'firstVisitAt',
  bonusDepositShowMode = 'bonusDepositShowMode',
}
export enum TimerType{
  ShowNotificationBanner = 'showNotificationBanner',
  ShowBonusesBanner = 'showNotificationBanner',
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

export enum BonusDepositShowMode{
  Modal = 'modal',
  Spoiler = 'spoiler',
  Gift = 'gift'
}
export enum UserBalanceType{
  Totals = 'totals',
  Real = 'real',
  Bonus = 'bonus'
}
