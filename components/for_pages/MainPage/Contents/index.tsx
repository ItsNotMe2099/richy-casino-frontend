import styles from './index.module.scss'
import Link from 'next/link'



interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Contents(props: Props) {

  const items = [
    {image: '/img/Contents/bitcoin.svg', label: 'Free Bitcoin', desc: 'Win satoshi every hour', link: '#'},
    {image: '/img/Contents/gamepad.svg', label: 'Richy Games', desc: 'Our best crypto games', link: '#'},
    {image: '/img/Contents/casino.svg', label: 'Casino', desc: 'Over 5000 games', link: '#'},
    {image: '/img/Contents/poker.svg', label: 'Poker', desc: 'Top tournaments', link: '#'},
    {image: '/img/Contents/cup.svg', label: 'Tournaments', desc: 'Top tournaments', link: '#'},
    {image: '/img/Contents/live.svg', label: 'Live Casino', desc: 'Our best crypto games', link: '#'},
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.transparent}></div>
    <div className={styles.root}>
      {items.map((item, index) =>
          <Link href={item.link} key={index}>
          <a className={styles.item}>
            <div className={styles.image}>
              <img src={item.image} alt=''/>
            </div>
            <div className={styles.label}>
              {item.label}
            </div>
            <div className={styles.desc}>
              {item.desc}
            </div>
          </a>
          </Link>
      )}
    </div>
    </div>
  )
}

