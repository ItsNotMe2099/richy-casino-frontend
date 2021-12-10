import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  
}

export default function Winners(props: Props) {

  const users = [
    {nickname: 'Erohin', sort: 1, game: 'Classic Dice',  amount: '0.357680', avatar: '/img/Winners/avatarM.svg'},
    {nickname: 'Enotova', sort: 2, game: 'Classic Dice',  amount: '0.357680', avatar: '/img/Winners/avatarF.svg'},
    {nickname: 'Sychev', sort: 3, game: 'Classic Dice',  amount: '0.357680', avatar: '/img/Winners/avatarM.svg'},
  ]

  return (
      <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.left}>
            <div className={styles.image}>
              <img src='/img/Winners/icon.svg' alt=''/>
            </div>
            <div className={styles.label}>
              ТОП-3 победителей за сегодня
            </div>
            </div>
            <div>
            <Link href='#'>
              <a className={styles.all}>
                <span>Смотреть</span> ТОП-100
              </a>
            </Link>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.illustration}>
              <img src='/img/Winners/illustration.svg' alt=''/>
            </div>
            <div className={styles.list}>
              {users.slice(0, 3).map((item, index) => 
                <div className={styles.user} key={index}>
                  <div className={styles.userLeft}>
                    <div className={styles.award}>
                      <img 
                      src={item.sort === 1 ? '/img/Winners/award1.svg' : item.sort === 2 ? '/img/Winners/award2.svg' : '/img/Winners/award3.svg'} 
                      alt=''/>
                    </div>
                  <div className={styles.avatar}>
                    <img src={item.avatar} alt=''/>
                  </div>
                  <div className={styles.nick}>
                    {item.nickname}
                  </div>
                </div>
                <div className={styles.game}>
                  {item.game}
                </div>
                <div className={styles.amount}>
                  +{item.amount} BTC
                </div>
                </div>
              )}
            </div>
          </div>
      </div>
  )
}
