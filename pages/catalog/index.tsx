import TopSlider from 'components/for_pages/CatalogPage/TopSlider'
import Filter from 'components/for_pages/Common/Filter'
import GamesList from 'components/for_pages/CatalogPage/GamesList'
import Layout from 'components/layout/Layout'
import styles from 'pages/catalog/index.module.scss'
import { Row, Col } from 'react-grid-system'
import GamesListTop from 'components/for_pages/CatalogPage/GamesListTop'

export default function CatalogPage() {

  const money = '25 572 257 ₽'

  const games = [
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'tabletop',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'chess',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'vr',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'blackjack',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Hotline',
    image: '/img/GamesList/hotline.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'poker',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Roulette',
    image: '/img/GamesList/roulette.png',
    top: false,
    createdAt: '2020-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Live Casino',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'netent'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: '6'},
    {label: 'Classic dice',
    image: '/img/Games/blackjack.svg',
    top: true,
    createdAt: '2021-12-17T12:46:24.007Z',
    lastWin: '2021-12-17T12:46:24.007Z',
    category: 'Richy Games',
    provider: 'truelab'},
  ]

  const liveCasino = games.filter(item => item.category === 'Live Casino')
  const richyGames = games.filter(item => item.category === 'Richy Games')
  const topGames = games.filter(item => item.top)

  return (
    <Layout>
      <TopSlider money={money} slider/>
      <Row className={styles.desktop}>
      <Filter items={games} mobile/>
      <Col className={styles.content}>
      <Row>
      <TopSlider money={money}/>
      </Row>
      <GamesListTop items={topGames}/>
      <GamesList all items={games}/>
      <GamesList live items={liveCasino}/>
      <GamesList richy items={richyGames}/>
      </Col>
      </Row>
    </Layout>
  )
}
