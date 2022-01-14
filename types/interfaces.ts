import { HTMLInputTypeAttribute, MouseEventHandler } from 'react'
import { FieldConfig } from 'formik'

export interface IField extends FieldConfig {
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
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

export interface Currency {
  id: number
  iso: string
  name: string
  symbol: string
  type: number
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
