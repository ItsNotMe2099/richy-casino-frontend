import { createContext, useContext, useState } from 'react'
import { useAppContext } from 'context/state'
import { CookiesType} from 'types/enums'
import request from 'utils/request'
import Cookies from 'js-cookie'
import { LoginFormData } from 'types/interfaces'

interface IState {
  loginFormData: LoginFormData | null
  setLoginFormData: (values: LoginFormData) => void
  login: (values: LoginFormData) => void
}

const defaultValue: IState = {
  loginFormData: null,
  setLoginFormData: (values) => null,
  login: (values) => null
}

const AuthContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AuthWrapper(props: Props) {
  const appContext = useAppContext()
  const [loginFormData, setLoginFormData] = useState<LoginFormData | null>(null)

  const login = async (values: LoginFormData) => {
    setLoginFormData(values)
    const res = await request({
      method: 'post',
      url: 'https://admin.grtestdemo.com/api/auth/login',
      data: {
        authInput: loginFormData?.authInput,
        password: loginFormData?.password,
      },
    })
    console.log(res)
    if (res.err) {
      
      return
    }

    const accessToken = res.data.accessToken

    if (!accessToken) {
      return
    }

    Cookies.set(CookiesType.accessToken, accessToken, { expires: 365 })
    appContext.updateUserFromCookies()
  }

  const value: IState = {
    ...defaultValue,
    login,
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )

}

export function useAuthContext() {
  return useContext(AuthContext)
}
