import { createContext, useContext, useEffect, useState } from 'react'
import { ModalType, SnackbarType } from 'types/enums'
import { ITournamentPosition } from 'data/interfaces/ITournamentPosition'
import { ITournamentUserRoundActive } from '../data/interfaces/ITournamentUserActive'
import TournamentRepository from 'data/repositories/TournamentRepository'
import { useAppContext } from './state'

interface IState {
  userPosition: ITournamentPosition
  userActiveRounds: ITournamentUserRoundActive[]
  participateLoading: boolean
  participate: (tournamentId: number) => Promise<boolean>,
}

const defaultValue: IState = {
  userPosition: null,
  userActiveRounds: [],
  participateLoading: false,
  participate: (tournamentId: number) => null,
}
const TournamentContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode

}

export function TournamentWrapper(props: Props) {
  const appContext = useAppContext()
  const [userPosition, setUserPosition] = useState<ITournamentPosition | null>(null)
  const [userActiveRounds, setUserActiveRounds] = useState<ITournamentUserRoundActive[]>([])
  const [participateLoading, setParticipateLoading] = useState(false)
  const fetchUserPositions = () => {
    TournamentRepository.fetchPositions().then(i => {
      if (i?.length > 0) {
        setUserPosition(i[0])
      } else {
        setUserPosition(null)
      }
    })
  }
  const fetchUserActiveRounds = () => {
    TournamentRepository.fetchUserActiveRounds().then(i => {
      setUserActiveRounds(i)
    })
  }
  useEffect(() => {
    if (appContext.auth) {
      fetchUserPositions()
      fetchUserActiveRounds()
    } else {
      setUserPosition(null)
      setUserActiveRounds([])
    }
  }, [appContext.auth])
  const value: IState = {
    ...defaultValue,
    userPosition,
    userActiveRounds,
    participateLoading,
    participate: async (tournamentId: number) => {
      if (!appContext.auth) {
        appContext.showModal(ModalType.registration)
      } else {
        setParticipateLoading(true)
        try {
          const res = await TournamentRepository.participate(tournamentId)
          await Promise.all([fetchUserActiveRounds(), fetchUserPositions()])
          setParticipateLoading(false)
          return true
        } catch (err) {
          appContext.showSnackbar(err, SnackbarType.error)
        }

        setParticipateLoading(false)
      }
      return false
    }
  }


  return (
    <TournamentContext.Provider value={value}>
      {props.children}
    </TournamentContext.Provider>
  )
}

export function useTournamentContext() {
  return useContext(TournamentContext)
}
