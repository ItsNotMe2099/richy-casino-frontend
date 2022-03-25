import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from 'pages/catalog/index.module.scss'
import {Row, Col} from 'react-grid-system'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
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

export default function CatalogPage() {
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
            <GameWrapper gameType={query.game as CasinoGameType}
                         token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGFydG5lclVzZXJJZCI6IjEyMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ3ODcxNDg5LCJleHAiOjIwMDc4NzE0ODl9.1yQQsNBsjXvmJ7RP9_Sf74rsjAUVZlUBMLdPggBsn0A'}>{renderGame()}</GameWrapper>
            </GameSoundWrapper>
          </Col>
        </Row>
      </Layout>
    </AudioPlayerProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
