export interface IUserBalanceCurrency{
  currency: string,
  value: number
}
export default interface IUser {
  id: number
  email: string
  phone: string
  currencyIso?: string
  countryId: number,
  cityId: number,
  countryIso: string,
  birthdayDate?: string,
  username?: string
  surname?: string,
  name?: string,
  balance: {
    total_calculated_amount: number,
    currencies: {
      totals: IUserBalanceCurrency[],
      real: IUserBalanceCurrency[],
      bonus: IUserBalanceCurrency[],
    }
  }
  flags: {
    isHideUserName: boolean,
    iHideFromLeaderboard: boolean,
    isHideFromStatistics: boolean,
    isHideBalance: boolean,
  }
}
