
export const CONTACTS = {
  email: 'support@richy.casino',
  facebook: '#',
  youtube: '#',
  twitter: '#',
  linkedIn: '#'
}

export const LINKS = {
  RICHY_GAMES: '/catalog/category/richy'
}

export const RICHY_CATEGORY_NAME = 'richy'

export const CookiesLifeTime: {
  accessToken: number,
  sessionId: number,
  language: number
  notificationShown: number
  firstVisitAt: number
  bonusDepositShowMode?: number
} = {
  accessToken: 365 * 3,
  sessionId: 365 * 3,
  language: 365 * 3,
  notificationShown: 365 * 3,
  firstVisitAt: 365 * 3,
  bonusDepositShowMode: 365 * 3,
}
export const Timers: {
  showNotificationBanner: number,
  showBonusesBanner: number,
} = {
  showNotificationBanner: 3 * 1000,
  showBonusesBanner: 3 * 1000,
}
