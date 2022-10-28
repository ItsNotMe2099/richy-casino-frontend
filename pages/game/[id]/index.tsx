import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GameListRepository from 'data/repositories/GameListRepository'
import {IGameSession} from 'data/interfaces/IGameSession'
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
import {getServerSideTranslation} from 'utils/i18'
import {GetServerSideProps} from 'next'
import {RequestError} from 'types/request'
import {ModalType} from 'types/enums'
import Button from 'components/ui/Button'
import {useTranslation} from 'next-i18next'

interface Props {

}

export default function CatalogPage(props: Props) {
  const appContext = useAppContext()
  const {t} = useTranslation()
  const router = useRouter()
  const gameId = parseInt(router.query.id as string, 10)
  const demo = router.query.demo as string
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorAuth, setErrorAuth] = useState<boolean>(false)
  const [session, setSession] = useState<IGameSession | null>(null)
  const [game, setGame] = useState<IGame | null>(null)
  useEffect(() => {
    const handler = event => {
      try {
        const data = JSON.parse(event.data)
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
    setError(null)
    setErrorAuth(false)
    try {
      const [session, game] = await Promise.all([
        demo ? GameListRepository.createGameDemo(gameId, appContext.isMobile ? 'mobile' : 'desktop') : GameListRepository.createGame(gameId, appContext.isMobile ? 'mobile' : 'desktop'),
        GameListRepository.fetchGameInfo(gameId)
      ])
      setSession(session)
      setGame(game)
      if(`${game?.providerId}` !== runtimeConfig.RICHY_PROVIDER_ID){
        setLoading(false)
      }
    } catch (e) {
      if(e instanceof RequestError && (e as RequestError).code === 403){
        appContext.showModal(ModalType.registration)
        setError( (e as RequestError).message)
        setErrorAuth(true)
      }else {
        console.error(e)
        setError(e)
      }
      setLoading(false)
    }


  }
  useEffect(() => {
    init()
  }, [router.query.demo, router.query.id, appContext.auth])
  const isRichy = `${game?.providerId}` === runtimeConfig.RICHY_PROVIDER_ID

  const result = (<>
    {loading && <ContentLoader isOpen={true} style={'block'}/> }
    {!loading && error && !errorAuth && <div className={styles.error}>{error}</div>}
    {!loading && errorAuth && <div className={styles.error}>{error}<div className={styles.errorAuth}>

      <Button className={styles.buttonLogin} type='submit' size='play' fluid background='blueGradient500' onClick={() => appContext.showModal(ModalType.registration)} spinner={loading}>{t('login_button')}</Button>

    </div></div>}
    {game && !error && <div className={styles.wrapper} style={{visibility: loading ? 'hidden' : 'visible'}}>{(isRichy ? <GameIframeRichy game={game} session={session}/> :
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


export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await getServerSideTranslation(context)
    }
  }
}
