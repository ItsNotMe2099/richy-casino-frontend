import { HTMLInputTypeAttribute, MouseEventHandler } from 'react'
import { FieldConfig } from 'formik'

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

export const CONTACTS = {
  email: 'support@richy.com',
  facebook: '#',
  youtube: '#',
  twitter: '#',
  linkedIn: '#'
}

export const LINKS = {

}
export interface IOption<T> {
  label: string
  value?: T
  symbol?: string,
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
export interface RegistrationPhoneModalArguments {
  phone: string
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
