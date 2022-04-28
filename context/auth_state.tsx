import { createContext, useContext, useState } from 'react'
import { useAppContext } from 'context/state'
import { LoginFormData } from 'types/interfaces'
import AuthRepository from 'data/repositories/AuthRepository'

interface IState {
  error: string,
  loading: boolean,
  loginFormData: LoginFormData | null
  setLoginFormData: (values: LoginFormData) => void
  login: (values: LoginFormData) => void,

}

const defaultValue: IState = {
  error: null,
  loading: false,
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
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (values: LoginFormData) => {
    setLoginFormData(values)
    setLoading(true)
    try {
      setError(null)
      const res = await AuthRepository.login(values?.authInput, values.password)
      if (!res) {
        return
      }
      const accessToken = res.token

      if (!accessToken) {
        return
      }

      appContext.setToken(accessToken)
      appContext.updateUserFromCookies()
      appContext.hideModal()
    }catch (e){

      setError(e)
    }
    setLoading(false)
  }

  const value: IState = {
    ...defaultValue,
    error,
    loading,
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