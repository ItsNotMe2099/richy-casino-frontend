interface IAuthResponse {
  id?: number
  currency_iso?: string
  token: string
}
export  interface IAuthLoginResponse extends IAuthResponse {
  identity?: string
  is2faRequired: boolean
}
export  interface IAuthFaLoginResponse extends IAuthResponse {
  identity?: string
}
export  interface IAuthPhoneResponse extends IAuthResponse {
  phone?: string
}
export  interface IAuthEmailResponse extends IAuthResponse {
  email?: string
}
