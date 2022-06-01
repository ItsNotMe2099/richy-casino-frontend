import IUser from 'data/interfaces/IUser'

export default interface IUserUpdateResponse extends IUser{
  shouldConfirmOldPhone: boolean
  shouldConfirmNewPhone: boolean
}
