export enum IPaymentMethodFieldType{
  String = 'string',
  Dropdown = 'dropdown',
  Number = 'number'
}
export interface IPaymentMethodField {
  key: string
  isRequired: boolean
  isPaymentAddress: boolean
  title: string
  type: IPaymentMethodFieldType
  options: {[key: string]: string}
}
export type IPaymentMethodFields = {[key: string]: IPaymentMethodField}
