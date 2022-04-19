import TopSlider from 'components/for_pages/CatalogPage/TopSlider'
import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from 'pages/catalog/index.module.scss'
import {Row, Col} from 'react-grid-system'
import GamesListTop from 'components/for_pages/CatalogPage/GamesListTop'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import VisibleXs from 'components/ui/VisibleXS'
import HiddenXs from 'components/ui/HiddenXS'
import BuyCrypto from 'components/for_pages/MainPage/BuyCrypto'
import GamesListRichy from 'components/for_pages/CatalogPage/GamesListRichy'
import GamesListLive from 'components/for_pages/CatalogPage/GamesListAll'
import GamesListAll from 'components/for_pages/CatalogPage/GamesListLive'

export default function CatalogPage() {

  const money = '25 572 257 ₽'

  const games = [
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'tabletop',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'tabletop',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'tabletop',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'tabletop',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'tabletop',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'tabletop',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'chess',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'vr',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'blackjack',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Hotline',
      image: '/img/GamesList/hotline.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'poker',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Roulette',
      image: '/img/GamesList/roulette.png',
      top: false,
      createdAt: '2020-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Live Casino',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'netent'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.png',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: '6'
    },
    {
      label: 'Classic dice',
      image: '/img/Games/blackjack.svg',
      top: true,
      createdAt: '2021-12-17T12:46:24.007Z',
      lastWin: '2021-12-17T12:46:24.007Z',
      category: 'Richy Games',
      provider: 'truelab'
    },
  ]

  const liveCasino = games.filter(item => item.category === 'Live Casino')
  const topGames = games.filter(item => item.top)

  return (
    <Layout>
      <VisibleXs><TopSlider money={money}/></VisibleXs>
      <Row className={styles.desktop}>
        <Filter  mobile/>
        <Col className={styles.content}>
          <Row className={styles.row}>
            <HiddenXs><TopSlider money={money}/></HiddenXs>
          </Row>
          <GamesListTop />
          <VisibleXs><BuyCrypto/></VisibleXs>
          <GamesListAll />
          <GamesListLive />
          <GamesListRichy />
        </Col>
      </Row>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
