import { HTMLInputTypeAttribute, MouseEventHandler } from 'react'
import { FieldConfig } from 'formik'

export interface IField extends FieldConfig {
  label: string
  iconName?: 'field_name'
    | 'field_surname'
    | 'field_country'
    | 'field_city'
    | 'field_phone'
    | 'field_email'
    | 'field_telegram'
    | 'field_password'
    | 'field_repeat_pass'
  type: HTMLInputTypeAttribute
}

export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  onClick?: MouseEventHandler
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
