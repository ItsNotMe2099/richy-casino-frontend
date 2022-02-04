import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from 'pages/catalog/index.module.scss'
import { Row, Col } from 'react-grid-system'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useRouter} from 'next/router'
import {GameType} from 'types/enums'
import GameMines from 'components/for_pages/games/Mines'

export default function CatalogPage() {
  const {query} = useRouter()
  const renderGame = () => {
    switch (query.game as string){
      case GameType.Mines:
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
