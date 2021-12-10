import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from 'pages/index.module.scss'
import { Col, Container, Row } from 'react-grid-system'
import Layout from 'components/layout/Layout'
import Contents from 'components/for_pages/MainPage/Contents'
import Games from 'components/for_pages/MainPage/Games'
import GameCard from 'components/for_pages/MainPage/GameCard'
import Winners from 'components/for_pages/MainPage/Winners'
import Statistics from 'components/for_pages/MainPage/Statistics'

export default function IndexPage() {
  return (
    <div className={styles.root}>
      <Container style={{height: '100%', minHeight: '100%'}}>
        <Layout>
          <Contents/>
          <Games/>
          <Row className={styles.gameCards}>
            <Col className={styles.gameCard}>
              <GameCard poker/>
            </Col>
            <Col>
              <GameCard/>
            </Col>
          </Row>
          <Winners/>
          <Statistics/>
        </Layout>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: {
    ...await serverSideTranslations(context.locale ?? 'en', ['common']),
  },
})
