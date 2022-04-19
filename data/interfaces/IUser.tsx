export interface IUserBalanceCurrency{
  currency: string,
  value: number
}
export interface IUserBalanceCurrencyRaw{
  [key: string]: number
}
export default interface IUser {
  id: number
  email: string
  phone: string
  currencyIso?: string
  countryId: number,
  cityId: number,
  gender: number
  countryIso: string,
  birthdayDate?: string,
  username?: string
  surname?: string,
  name?: string,
  balance: {
    totalCalculatedAmount: number,
    currencies: {
      totals: IUserBalanceCurrency[],
      real: IUserBalanceCurrency[],
      bonus: IUserBalanceCurrency[],
    }
  }
  extraBalances: {
    wheelSpins: number,
    lotteryTickets: number,
    freeBitcoin: number
    freespinAmount: number
  },
  flags: {
    isHideUserName: boolean,
    iHideFromLeaderboard: boolean,
    isHideFromStatistics: boolean,
    isHideBalance: boolean,
  }
}
