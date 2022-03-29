import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from 'pages/catalog/index.module.scss'
import {Row, Col} from 'react-grid-system'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import nookies from 'nookies'
import {useRouter} from 'next/router'
import GameMines from 'components/for_pages/games/Mines'
import GameDice from 'components/for_pages/games/Dice'
import GameKeno from 'components/for_pages/games/Keno'
import GameLimbo from 'components/for_pages/games/Limbo'
import {GameWrapper} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import GameTowers from 'components/for_pages/games/Towers'
import GameStairs from 'components/for_pages/games/Stairs'
import {AudioPlayerProvider} from 'react-use-audio-player'
import {GameSoundWrapper} from 'components/for_pages/games/context/game_sound'
import GameWheelOfFortune from 'components/for_pages/games/WheelOfFortune'
import GameRoulette from 'components/for_pages/games/Roulette'
import GameDiamonds from 'components/for_pages/games/Diamonds'
import GameHilo from 'components/for_pages/games/Hilo'
import GamePlinko from 'components/for_pages/games/Plinko'
import GameAuthRepository from 'components/for_pages/games/data/reposittories/GameAuthRepository'
import {runtimeConfig} from 'config/runtimeConfig'
import GameCoinFlip from 'components/for_pages/games/ConiFlip'
interface Props{
  gameToken?: string
}
export default function CatalogPage(props: Props) {
  const {query} = useRouter()
  const renderGame = () => {
    switch (query.game as string) {
      case CasinoGameType.Mines:
        return <GameMines/>
      case CasinoGameType.Dice:
        return <GameDice/>
      case CasinoGameType.Keno:
        return <GameKeno/>
        case CasinoGameType.Wheel:
          return <GameWheelOfFortune/>
      case CasinoGameType.Limbo:
        return <GameLimbo/>
      case CasinoGameType.Tower:
        return <GameTowers/>
      case CasinoGameType.Stairs:
        return <GameStairs/>
      case CasinoGameType.Roulette:
        return <GameRoulette/>
      case CasinoGameType.Diamonds:
        return <GameDiamonds/>
      case CasinoGameType.HiLo:
        return <GameHilo/>
      case CasinoGameType.Plinko:
        return <GamePlinko/>
      case CasinoGameType.Coinflip:
        return <GameCoinFlip/>
      default:
        return <GameMines/>
    }
  }
  return (<AudioPlayerProvider>
      <Layout>
        <Row className={styles.desktop}>
          <Filter items={[]} mobile/>
          <Col className={styles.content}>
            <GameSoundWrapper>
            <GameWrapper token={props.gameToken} gameType={query.game as CasinoGameType}>{renderGame()}</GameWrapper>
            </GameSoundWrapper>
          </Col>
        </Row>
      </Layout>
    </AudioPlayerProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const cookieTokenName = 'gameToken'
  let gameToken = cookies[cookieTokenName]
  if(!gameToken){
    const authRes = await GameAuthRepository.loginGuest(runtimeConfig.GAMES_API_SECRET, 'btc')
    nookies.set(context, cookieTokenName, authRes.accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    gameToken = authRes.accessToken
  }
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
      gameToken
    },
  }
}
