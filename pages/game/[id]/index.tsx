import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GameListRepository from 'data/repositories/GameListRepository'
import { IGameSession} from 'data/interfaces/IGameSession'
import GameIframe from 'components/for_pages/CatalogPage/GameIframe'
import {useAppContext} from 'context/state'
import styles from './index.module.scss'
import GamePageFooter from 'components/for_pages/GamePage/GamePageFooter'
import {IGame} from 'data/interfaces/IGame'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import ContentLoader from 'components/ui/ContentLoader'
import {runtimeConfig} from 'config/runtimeConfig'

interface Props {

}

export default function CatalogPage(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const gameId = parseInt(router.query.id as string, 10)
  const demo = router.query.demo as string
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<IGameSession | null>(null)
  const [game, setGame] = useState<IGame | null>(null)
  const init = async () => {
    setLoading(true)
    try {
      const [session, game] = await Promise.all([
        demo ? GameListRepository.createGameDemo(gameId, appContext.isMobile ? 'mobile' : 'desktop') : GameListRepository.createGame(gameId, appContext.isMobile ? 'mobile' : 'desktop'),
        GameListRepository.fetchGameInfo(gameId)
      ])
      setSession({...session, gameUrl: 'http://localhost:3009/game/start?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MiIsInNlc3Npb25JZCI6Imo1UkVMTzZZcCIsImN1cnJlbmN5IjoiVVNEIiwiZ2FtZVR5cGUiOiJsaW1ibyIsImxvZ2luIjpudWxsLCJwYXJ0bmVyVXNlcklkIjpudWxsLCJpc0RlbW8iOnRydWUsImlhdCI6MTY2MDU0NDAwMSwiZXhwIjoxNjcxMzQ0MDAxfQ.P5iLJmy0_CyUpUZQVZ_EYsfYWfsd9faf5vlr-Wxych4'})

      setGame(game)
    } catch (e) {

      setError(e)
    }
    setLoading(false)

  }
  useEffect(() => {
    init()
  }, [router.query.demo, router.query.id])
  const isRichy = `${game?.providerId}` === runtimeConfig.RICHY_PROVIDER_ID

  const result = loading ? <ContentLoader isOpen={true} style={'block'}/> :
    <GameIframe showHeader={isRichy && !appContext.isMobile} game={game}  session={session} error={error}/>
  if (appContext.isMobile) {
    return (<div className={styles.mobile}>
      {result}
      <GamePageFooter/>
    </div>)
  }

  return (
    <WithGameFilterLayout>
      {result}
    </WithGameFilterLayout>
  )
}
