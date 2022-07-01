import styles from './index.module.scss'
import Link from 'next/link'
import {Routes} from 'types/routes'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import { useAppContext } from 'context/state'



interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Contents(props: Props) {
  const {t} = useTranslation()
  const contex = useAppContext()
  const isMobile = contex.isMobile
  const items = [
    {image: '/img/Contents/bitcoin.svg', label: t('main_card_free_bitcoin_title'), desc: t('main_card_free_bitcoin_desc'), link: Routes.freeBitcoin, value: 'bitcoin'},
    {image: '/img/Contents/gamepad.svg', label: t('main_card_richy_games_title'), desc: t('main_card_richy_games_desc'), link: Routes.richyGames, value: 'richy'},
    {image: '/img/Contents/casino.svg', label: t('main_card_casino_title'), desc: t('main_card_casino_desc'), link: Routes.catalog, value: 'casino'},
    {image: '/img/Contents/poker.png', label: t('main_card_poker_title'), desc: t('main_card_poker_desc'), link: Routes.poker, value: 'poker'},
    {image: '/img/Contents/cup.svg', label: t('main_card_tournaments_title'), desc: t('main_card_tournaments_desc'), link: Routes.tournaments, value: 'tournaments'},
    {image: '/img/Contents/live.svg', label: t('main_card_live_casino_title'), desc: t('main_card_live_casino_desc'), link: Routes.catalogLive, value: 'live'},
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
      {items.map((item, index) =>
         <Link href={item.link}  key={item.link}>
          <a className={styles.item}>
            <div className={styles.image}>
              <div className={styles.shadow}><Image src={getShadow(item)} width={92} height={92}/></div>
              <div className={styles.icon}><Image src={item.image} width={isMobile ? 42 : 56} height={isMobile ? 42 : 56}/></div>
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

