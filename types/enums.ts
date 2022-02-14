export enum ModalType {
  login,
  registration,
  passwordReset,
  passwordRecovery,
  registrationSuccess,
  registrationPhone = 12,
  fortune = 9,
  bonus = 10,
  profileBurger = 11
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
}

export enum GameType{
  Mines = 'mines',
  Dice = 'dice',
  Keno = 'keno',
  Limbo = 'limbo',
  WheelOfFortune = 'wheelOfFortune',
}
