import styles from './index.module.scss'
import Link from 'next/link'
import { Row, Col } from 'react-grid-system'



interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Contents(props: Props) {

  const items = [
    {image: '/img/Contents/bitcoin.svg', label: 'Free Bitcoin', desc: 'Win satoshi every hour', link: '#', value: 'bitcoin'},
    {image: '/img/Contents/gamepad.svg', label: 'Richy Games', desc: 'Our best crypto games', link: '#', value: 'richy'},
    {image: '/img/Contents/casino.svg', label: 'Casino', desc: 'Over 5000 games', link: '#', value: 'casino'},
    {image: '/img/Contents/poker.svg', label: 'Poker', desc: 'Top tournaments', link: '#', value: 'poker'},
    {image: '/img/Contents/cup.svg', label: 'Tournaments', desc: 'Top tournaments', link: '#', value: 'tournaments'},
    {image: '/img/Contents/live.svg', label: 'Live Casino', desc: 'Our best crypto games', link: '#', value: 'live'},
  ]

  const getShadow = (item) => {
    switch (item.value){
      case 'bitcoin':
        return '/img/shadows/light-yellow.png'
      case 'richy':
        return '/img/shadows/light-blue.png'
      case 'casino':
        return '/img/shadows/light-red.png'
      case 'poker':
        return '/img/shadows/light-red.png'
      case 'tournaments':
        return '/img/shadows/light-yellow.png'
      case 'live':
        return '/img/shadows/light-blue.png'
    }
  }

  return (
    <div className={styles.wrapper}>
    <Row className={styles.row}>
    <div className={styles.root}>
    <div className={styles.transparent}></div>
      {items.map((item, index) =>
          <Col key={index} className={styles.col}>
          <Link href={item.link}>
          <a className={styles.item}>
            <div className={styles.image}>
              <div className={styles.shadow}><img src={getShadow(item)} alt=''/></div>
              <div className={styles.icon}><img src={item.image} alt=''/></div>
            </div>
            <div className={styles.label}>
              {item.label}
            </div>
            <div className={styles.desc}>
              {item.desc}
            </div>
          </a>
          </Link>
          </Col>
      )}
    </div>
    </Row>
    </div>
  )
}

