
export interface UserFormData{
  id?: number
  username: string
  surname: string
  name: string
  birthday_date: string
  fakePassword?: string
  currentPassword?: string
  password?: string
  passwordConfirm?: string
  country_iso: string
  city_id: number
  gender: number
  currency_iso: string
  phone: string,
  email: string,
  is_hide_username: boolean
  is_hide_from_leaderboard: boolean
  is_hide_from_statistics: boolean
  is_hide_balance: boolean
}
