import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {AudioPlayerProvider} from 'react-use-audio-player'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import GameListRepository from 'data/repositories/GameListRepository'
import {GameSessionStrategy, IGameSession} from 'data/interfaces/IGameSession'
import {CookiesType} from 'types/enums'
import {getSelectorsByUserAgent} from 'react-device-detect'
import GameIframe from 'components/for_pages/CatalogPage/GameIframe'

interface Props {
  session?: IGameSession
}

export default function CatalogPage(props: Props) {

  return (<AudioPlayerProvider>
      <WithGameFilterLayout>
        <GameIframe session={props.session}/>
      </WithGameFilterLayout>
    </AudioPlayerProvider>
  )
}

export const getServerSideProps = async (context) => {
  const gameId = parseInt(context.query.id as string, 10)
  console.log('Demo', context.query)
  const ua = context.req ? context.req?.headers['user-agent'] : navigator.userAgent
  const {isMobile} = ua ? getSelectorsByUserAgent(ua) : {isMobile: false}
  const token = context.req.cookies[CookiesType.accessToken]
  const session = context.query.demo ? await GameListRepository.createGameDemo(gameId, isMobile ? 'mobile' : 'desktop', token) : await GameListRepository.createGame(gameId, isMobile ? 'mobile' : 'desktop', token)

  switch (session?.strategy){
    case GameSessionStrategy.Detect:
    case GameSessionStrategy.Redirect:

    case GameSessionStrategy.Iframe:
      break
  }
  console.log('session', session)
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
      session
    },
  }
}
