import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GameListRepository from 'data/repositories/GameListRepository'
import { IGameSession} from 'data/interfaces/IGameSession'
import GameIframeRichy from 'components/for_pages/CatalogPage/GameIframeRichy'
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
  useEffect(() => {
    const handler = event => {
      console.log('EventData', event.data)
      try {
        const data = JSON.parse(event.data)
        console.log('iframe event', data)
        if (data?.type === 'loaded') {
          setLoading(false)
        }
      }catch (e) {

      }
    }

    window.addEventListener('message', handler)

    // clean up
    return () => window.removeEventListener('message', handler)
  }, [])
  const init = async () => {
    setLoading(true)
    try {
      const [session, game] = await Promise.all([
        demo ? GameListRepository.createGameDemo(gameId, appContext.isMobile ? 'mobile' : 'desktop') : GameListRepository.createGame(gameId, appContext.isMobile ? 'mobile' : 'desktop'),
        GameListRepository.fetchGameInfo(gameId)
      ])
      setSession(session)
      setGame(game)
      console.log('CheckProvider', `${game?.providerId}` !== runtimeConfig.RICHY_PROVIDER_ID, game.providerId)
      if(`${game?.providerId}` !== runtimeConfig.RICHY_PROVIDER_ID){
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      setError(e)
    }


  }
  useEffect(() => {
    init()
  }, [router.query.demo, router.query.id])
  const isRichy = `${game?.providerId}` === runtimeConfig.RICHY_PROVIDER_ID

  const result = (<>
    {loading && <ContentLoader isOpen={true} style={'block'}/> }
    {game && <div style={{visibility: loading ? 'hidden' : 'visible'}}>{(isRichy ? <GameIframeRichy game={game} session={session}/> :
      <GameIframe session={session} error={error}/>)}</div>}
  </>)
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

