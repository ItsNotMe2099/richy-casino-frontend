export class Routes{

  static get bonuses(){
    return '/freebitcoin'
  }

  static get freeBitcoin(){
    return '/freebitcoin'
  }
  static get lottery(){
    return '/lottery'
  }
  static get wheelOfFortune(){
    return '/wheelOfFortune'
  }

  static get referral(){
    return '/referral'
  }

  /*      Catalog    */
  static get catalog(){
    return '/catalog'
  }
  static catalogCategory(key?: number): string{
    return `/catalog/category/${key}`
  }
  static catalogGame(id: number, isDemo?: boolean): string{
    return `/game/${id}${isDemo ? '?demo=true' : ''}`
  }

  static get catalogAll(){
    return '/catalog/category/all'
  }

  static get catalogLive(){
    return '/catalog/category/live'
  }
  static get catalogTop(){
    return '/catalog/category/top'
  }
  static get catalogFavorite(){
    return '/catalog/category/favorite'
  }
  static get catalogLast(){
    return '/catalog/category/last'
  }

  static catalogProvider(providerId: string | number): string{
    return `/catalog/providers/${providerId}`
  }

  static get richyGames(){
    return '/catalog/category/richy'
  }
  static get aviator(){
    return '/game/11933'
  }
  static get poker(){
    return '/catalog/minipoker'
  }
  static get chess(){
    return '/catalog/game/poker'
  }
  static get tournaments(){
    return '/tournaments'
  }
  static get leaderBoard(){
    return '/#leader-board'
  }
}
