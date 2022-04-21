import {HTMLInputTypeAttribute, MouseEventHandler, ReactElement} from 'react'
import { FieldConfig } from 'formik'
import {FavoriteEntityType, SnackbarType} from 'types/enums'

export interface IField extends FieldConfig {
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  disabled?: boolean
  onChange?: (val) => void
}

export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  onClick?: MouseEventHandler
}

export interface LoginFormData {
  authInput: string
  password: string
}

export interface Country {
  id: number
  iso: string
  iso3: string
  phone: string
  name: string
  currency_iso: string
  symbol: string
}


export interface IOption<T> {
  label: string
  value?: T
  symbol?: string | ReactElement,
  icon?: string
}
export interface IPagination<T>{
  data: T[]
  total: number
}
export interface IApiResponseErrorDetails{
  field: string,
  message: string
}
export interface IApiResponseError{
  code: number,
  details: IApiResponseErrorDetails[]
  message?: string
}
export interface IApiResponse{
  success: boolean,
  data: any
  error?: IApiResponseError
}
export interface IApiPaginationResponse{
  success: boolean,
  data: any[],
  _meta: {
    totalCount: number,
    pageCount: number,
    currentPage: number,
    perPage: number
  }
}
export interface ProfileModalArguments {
  onBack?: () => void
}
export interface RegistrationPhoneModalArguments {
  phone: string
}
export interface TwoFaModalArguments extends ProfileModalArguments{
  qrUrl: string
}
export interface RegistrationSuccessModalArguments {
  login: string
  password: string
}
export interface PasswordResetModalArguments {
  login: string
}

export interface IPosition{
  x: number
  y: number
}

export interface ISize{
  width: number
  height: number
}
export interface ISwitchFilterItem<T>{
  label?: string,
  icon?: string | ReactElement,
  value: T
}
export interface SnackbarData {
  text: string
  type: SnackbarType
}
export type FavoritesStoreType = {[entityType in FavoriteEntityType]: number[]}
