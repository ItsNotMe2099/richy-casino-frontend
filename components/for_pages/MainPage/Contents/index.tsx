import styles from './index.module.scss'
import Link from 'next/link'
import {Routes} from 'types/routes'



interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Contents(props: Props) {

  const items = [
    {image: '/img/Contents/bitcoin.svg', label: 'Free Bitcoin', desc: 'Win satoshi every hour', link: Routes.freeBitcoin, value: 'bitcoin'},
    {image: '/img/Contents/gamepad.svg', label: 'Richy Games', desc: 'Our best crypto games', link: Routes.richyGames, value: 'richy'},
    {image: '/img/Contents/casino.svg', label: 'Casino', desc: 'Over 5000 games', link: Routes.catalog, value: 'casino'},
    {image: '/img/Contents/poker.png', label: 'Poker', desc: 'Top tournaments', link: Routes.poker, value: 'poker'},
    {image: '/img/Contents/cup.svg', label: 'Tournaments', desc: 'Top tournaments', link: Routes.tournaments, value: 'tournaments'},
    {image: '/img/Contents/live.svg', label: 'Live Casino', desc: 'Our best crypto games', link: Routes.catalogLive, value: 'live'},
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
    <div className={styles.root}>
    <div className={styles.transparent}></div>
    <div className={styles.transparentLeft}></div>
      {items.map((item, index) =>
         <Link href={item.link}  key={item.link}>
          <a className={styles.item}>
            <div className={styles.image}>
              <div className={styles.shadow}><img src={getShadow(item)} alt=''/></div>
              <div className={styles.icon}><img src={item.image} alt=''/></div>
            </div>
            <div className={styles.label}>
              {item.label}
            </div>
            <div className={styles.desc}>
              {item.desc.split(' ').map((word, index) =>
                index !== (item.desc.split(' ').length - 1) && <span>{word}&nbsp;</span>
              )}
              <br className={styles.break}/>
              {item.desc.split(' ').slice(item.desc.split(' ').length - 1).map((word, index) =>
                <>{word}&nbsp;</>
              )}
            </div>
          </a>
          </Link>
      )}
    </div>
    </div>
  )
}

