import { useAppContext } from 'context/state'
import { useMeasure } from 'react-use'
//import {useEffect} from 'react'
//import TournamentRepository from 'data/repositories/TournamentRepository'
import { useTranslation } from 'next-i18next'
import TournamentRepository from 'data/repositories/TournamentRepository'
import { useEffect, useState } from 'react'
import { ITournamentRichy } from 'data/interfaces/ITournamentRichy'
import { useTournamentContext } from 'context/tournament_state'
import * as Scroll from 'react-scroll'
import TournamentBanner from 'components/for_pages/TournamentPage/TournamentBanner'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
interface Props {

}

export default function Tournament(props: Props) {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const tournamentContext = useTournamentContext()
  const [tournament, setTournament] = useState<ITournamentRichy | null>(null)

  useEffect(() => {
    TournamentRepository.fetchRichyTournament().then(i => {
      setTournament(i)
    })
  }, [])

  const [ref, { width }] = useMeasure()
  const isMobile = appContext.isMobile

  const handleJoin = async () => {
    if (!tournament) {
      return
    }
    const res = await tournamentContext.participate(tournament.tournamentId)


    if (res) {
      TournamentRepository.fetchRichyTournament().then(i => {
        setTournament(i)
      })
      setTimeout(() => {
        Scroll.scroller.scrollTo('tournament-user-position', {
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: -250,
        })
      }, 300)
    }
  }
  if (!tournament) {
    return null
  }
   return (
    <TournamentBanner tournament={tournament as any as ITournamentHistory}/>
  )
}
