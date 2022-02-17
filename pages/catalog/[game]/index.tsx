import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from 'pages/catalog/index.module.scss'
import { Row, Col } from 'react-grid-system'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useRouter} from 'next/router'
import {GameType} from 'types/enums'
import GameMines from 'components/for_pages/games/Mines'
import GameDice from 'components/for_pages/games/Dice'
import GameKeno from 'components/for_pages/games/Keno'
import GameWheelOfFortune from 'components/for_pages/games/WheelOfFortune'
import GameLimbo from 'components/for_pages/games/Limbo'

export default function CatalogPage() {
  const {query} = useRouter()
  const renderGame = () => {
    switch (query.game as string){
      case GameType.Mines:
        return <GameMines/>
      case GameType.Dice:
        return <GameDice/>
      case GameType.Keno:
        return <GameKeno/>
      case GameType.WheelOfFortune:
        return <GameWheelOfFortune/>
      case GameType.Limbo:
        return <GameLimbo/>
      default:
        return <GameMines/>
    }
  }
  return (
    <Layout>
      <Row className={styles.desktop}>
      <Filter items={[]} mobile/>
      <Col className={styles.content}>
        {renderGame()}
      </Col>
      </Row>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
