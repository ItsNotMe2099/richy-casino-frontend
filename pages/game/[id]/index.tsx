import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GameListRepository from 'data/repositories/GameListRepository'
import {GameSessionStrategy, IGameSession} from 'data/interfaces/IGameSession'
import {CookiesType} from 'types/enums'
import {getSelectorsByUserAgent} from 'react-device-detect'
import GameIframeRichy from 'components/for_pages/CatalogPage/GameIframeRichy'
import GameIframe from 'components/for_pages/CatalogPage/GameIframe'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import GamePageFooter from 'components/for_pages/GamePage/GamePageFooter'
import { RICHY_CATEGORY_NAME } from 'types/constants'
import { IGame } from 'data/interfaces/IGame'
interface Props {
  session?: IGameSession
  richyGame?: IGame
}

export default function CatalogPage(props: Props) {
  const appContext = useAppContext()

const result = (props.richyGame ? <GameIframeRichy game={props.richyGame} session={props.session}/> : <GameIframe session={props.session}/>)
if(appContext.isMobile){
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
  const gameId = parseInt(context.query.id as string, 10)
  const ua = context.req ? context.req?.headers['user-agent'] : navigator.userAgent
  const {isMobile} = ua ? getSelectorsByUserAgent(ua) : {isMobile: false}
  const token = context.req.cookies[CookiesType.accessToken]
  const gamesRichy = await GameListRepository.fetchGames({providerInternalName: RICHY_CATEGORY_NAME})
  const session = context.query.demo ? await GameListRepository.createGameDemo(gameId, isMobile ? 'mobile' : 'desktop', token) : await GameListRepository.createGame(gameId, isMobile ? 'mobile' : 'desktop', token)
  
  switch (session?.strategy){
    case GameSessionStrategy.Detect:
    case GameSessionStrategy.Redirect:

    case GameSessionStrategy.Iframe:
      break
  }

  return {
    props: {
      richyGame: gamesRichy.data.find(i => i.id === gameId),
      session
    },
  }
}
