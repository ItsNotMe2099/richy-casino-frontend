import { createContext, useContext } from 'react'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import {IJackpotNearest} from 'data/interfaces/IJackpotNearest'

interface IState {
  tournamentsActive: ITournamentHistory[]
  tournamentsCompleted: ITournamentHistory[]
  jackpot: IJackpotNearest | null,

}

const defaultValue: IState = {
  tournamentsActive: [],
  tournamentsCompleted: [],
  jackpot: null
}
const DataContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode

}

export function DataWrapper(props: Props) {
  const value: IState = {
    ...defaultValue,

  }
  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  return useContext(DataContext)
}
