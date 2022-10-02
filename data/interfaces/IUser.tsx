export interface IUserBalanceCurrency{
  currency: string,
  value: number
  calculated: number,
  mainCurrency: string
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
      real: IUserBalanceCurrency[],
      bonus: IUserBalanceCurrency[],
    },
    calculatedToUserCurrency: {
      real: IUserBalanceCurrency[],
      bonus: IUserBalanceCurrency[],
    },
    calculatedToDefaultCurrency: {
      real: IUserBalanceCurrency[],
      bonus: IUserBalanceCurrency[],
    },

  }
  extraBalances: {
    wheelSpins: number,
    lotteryTickets: number,
    freeBitcoin: number
    freespinAmount: number
  },
  flags: {
    isHideUsername: boolean,
    isHideFromLeaderboard: boolean,
    isHideFromStatistics: boolean,
    isHideBalance: boolean,
    is2FaEnabled: boolean
  }
}
