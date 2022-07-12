import {IPaymentSystem} from './IPaymentSystem'
export interface IPaymentMethod {
  title: string
  imageUrl: string
  paymentSystems: IPaymentSystem[]
}
