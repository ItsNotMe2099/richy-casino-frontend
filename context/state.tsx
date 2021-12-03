import { createContext, useContext } from 'react'

interface IState {}

const defaultValue: IState = {}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AppWrapper(props: Props) {
  return (
    <AppContext.Provider value={defaultValue}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
