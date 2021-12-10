import styles from './index.module.scss'
import Link from 'next/link'
import classNames from 'classnames'

interface Props {
  
}

export default function Statistics(props: Props) {

  const users = [
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '2.567', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '0.00', amount: '2.567', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '2.567', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '2.567', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '0.00', amount: '2.567', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '2.567', id: 12345678987654321245},
  ]

  return (
      <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.left}>
            <div className={styles.image}>
              <img src='/img/Statistics/stats.svg' alt=''/>
            </div>
            <div className={styles.label}>
              Общая статистика
            </div>
            </div>
            <div>
            <Link href='#'>
              <a className={styles.all}>
                <span className={styles.desktop}>Полная статистика</span>
                <span className={styles.mobile}>Все</span>
              </a>
            </Link>
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.row}>
              <div className={styles.cell}>
                Игра
              </div>
              <div className={styles.cell}>
                Игрок
              </div>
              <div className={styles.cell}>
                ID ставки
              </div>
              <div className={styles.cell}>
                Коэффициент
              </div>
              <div className={styles.cell}>
                Выигрыш
              </div>
            </div>
            {users.slice(0, 5).map((item, index) =>
              <div className={classNames(styles.row, styles.rowInner)} key={index}>
                <div className={styles.cell}>
                  <div className={styles.game}>
                    <div className={styles.gameImg}>
                      <img src={item.gameImg} alt=''/>
                    </div>
                    <div className={styles.gameLbl}>
                      {item.game}
                    </div>
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.gambler}>
                    {item.nickname}
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.id}>
                    {item.id}
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={classNames(styles.mult, {[styles.zero]: +item.mult <= 0})}>
                    x{item.mult}
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={classNames(styles.amount, {[styles.red]: +item.mult <= 0})}>
                    <span>+</span>{item.amount}
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>
  )
}
