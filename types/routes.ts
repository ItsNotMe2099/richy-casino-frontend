export class Routes{

  static get freeBitcoin(){
    return '/freeBitcoin'
  }
  static get lottery(){
    return '/lottery'
  }
  static get wheelOfFortune(){
    return '/wheelOfFortune'
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

  static catalogProvider(providerId: string | number): string{
    return `/catalog/providers/${providerId}`
  }

  static get richyGames(){
    return '/catalog/category/richy-games'
  }
  static get aviator(){
    return '/catalog/aviator'
  }
  static get poker(){
    return '/catalog/game/poker'
  }
}
