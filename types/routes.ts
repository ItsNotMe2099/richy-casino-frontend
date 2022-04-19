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
  static catalogGame(id: number): string{
    return `/catalog/game/${id}`
  }

  static get richyGames(){
    return '/catalog/category/richy-games'
  }
  static get aviator(){
    return '/catalog/game/aviator'
  }
}
