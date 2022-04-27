import {GetServerSideProps} from 'next'
import styles from 'pages/index.module.scss'
import {Col, Row} from 'react-grid-system'
import Layout from 'components/layout/Layout'
import Contents from 'components/for_pages/MainPage/Contents'
import Games from 'components/for_pages/MainPage/Games'
import GameCard from 'components/for_pages/MainPage/GameCard'
import Winners from 'components/for_pages/MainPage/Winners'
import Statistics from 'components/for_pages/MainPage/Statistics'
import GamesList, {MainGameListType} from 'components/for_pages/MainPage/GamesList'
import Tournament from 'components/for_pages/MainPage/Tournament'
import TopSlider from 'components/for_pages/MainPage/TopSlider'
import BuyCrypto from 'components/for_pages/MainPage/BuyCrypto'
import VisibleXs from 'components/ui/VisibleXS'
import {getServerSideTranslation} from 'utils/i18'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'

const casinos = [
  {image: '/img/GamesList/hotline.png', label: 'hotline', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline2', provider: 'provider2', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline3', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline4', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline5', provider: 'provider2', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline6', provider: 'provider3', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline7', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline8', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/hotline.png', label: 'hotline9', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/hotline.png', label: 'hotline10', provider: 'provider3', category: 'category2'},
]

const live = [
  {image: '/img/GamesList/roulette.png', label: 'roulette', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette2', provider: 'provider2', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette3', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette4', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette5', provider: 'provider2', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette6', provider: 'provider3', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette7', provider: 'provider1', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette8', provider: 'provider3', category: 'category2'},
  {image: '/img/GamesList/roulette.png', label: 'roulette9', provider: 'provider1', category: 'category1'},
  {image: '/img/GamesList/roulette.png', label: 'roulette10', provider: 'provider3', category: 'category2'},
]

export default function IndexPage() {
  const {t} = useTranslation()
  return (
        <Layout>
          <NextSeo title={t('page_index_title')}/>
          <TopSlider/>
          <Contents/>
          <Games/>
          <Row className={styles.gamesLists}>
            <Col>
            <GamesList type={MainGameListType.All} label='Казино' icon='/img/Contents/casino.svg' items={casinos} shadowColor='red'/>
            </Col>
            <Col>
            <GamesList type={MainGameListType.Live} label='Live Casino' icon='/img/Contents/live.svg' items={live} shadowColor='blue'/>
            </Col>
          </Row>
          <VisibleXs>
            <BuyCrypto/>
          </VisibleXs>
          <Row className={styles.gameCards}>
            <Col className={styles.gameCard}>
              <GameCard poker/>
            </Col>
            <Col>
              <GameCard/>
            </Col>
          </Row>
          <Tournament balance='0,00000001 BTC'/>
          <Winners/>
          <Statistics/>
        </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}

