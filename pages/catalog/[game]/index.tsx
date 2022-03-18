import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from 'pages/catalog/index.module.scss'
import { Row, Col } from 'react-grid-system'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useRouter} from 'next/router'
import GameMines from 'components/for_pages/games/Mines'
import GameDice from 'components/for_pages/games/Dice'
import GameKeno from 'components/for_pages/games/Keno'
import GameLimbo from 'components/for_pages/games/Limbo'
import {GameWrapper} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'

export default function CatalogPage() {
  const {query} = useRouter()
  const renderGame = () => {
    switch (query.game as string){
      case CasinoGameType.Mines:
        return <GameMines/>
      case CasinoGameType.Dice:
        return <GameDice/>
      case CasinoGameType.Keno:
        return <GameKeno/>
    //  case CasinoGameType.WheelOfFortune:
    //    return <GameWheelOfFortune/>
      case CasinoGameType.Limbo:
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
        <GameWrapper gameType={query.game as CasinoGameType} token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGFydG5lclVzZXJJZCI6IjEyMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ3NTYwMTc1LCJleHAiOjIwMDc1NjAxNzV9.AmPBXZtnMEkwItIMB3YTF3z-lP6B4s7zHnrnyQVrGWY'}>{renderGame()}</GameWrapper>
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
