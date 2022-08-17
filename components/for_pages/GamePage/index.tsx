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

interface Props {
  gameId: number,
  isDemo: boolean
}

export default function GamePage(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const gameId = props.gameId
  const demo = props.isDemo
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
      setSession(session)
      setGame(game)
    } catch (e) {

      setError(e)
    }
    setLoading(false)

  }
  useEffect(() => {
    init()
  }, [props.isDemo, props.gameId])
  const isRichy = game?.providerName?.toLowerCase() === 'richy games'
  const result = loading ? <ContentLoader isOpen={true} style={'block'}/> : (isRichy ? <GameIframeRichy game={game} session={session}/> :
    <GameIframe session={session} error={error}/>)
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

export const getServerSideProps = async (context) => {
  return {
    props: {
    },
  }
}
