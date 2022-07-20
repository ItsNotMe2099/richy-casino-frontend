import {IPaymentSystem} from './IPaymentSystem'
export interface IPaymentMethod {
  title: string
  imageUrl: string
  isCrypto: boolean
  paymentSystems: IPaymentSystem[]
}
