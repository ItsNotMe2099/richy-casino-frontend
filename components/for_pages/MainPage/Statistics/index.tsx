import styles from './index.module.scss'
import classNames from 'classnames'
import Header from 'components/for_pages/Common/Header'

interface Props {

}

export default function Statistics(props: Props) {

  const users = [
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '0.00', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '0.00', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '0.00', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '0.00', amount: '+ 2.00829378', id: 12345678987654321245},
    {nickname: 'Alex Terner', game: 'Baccart Hash Dice', gameImg: '/img/Statistics/game.svg', mult: '1.51', amount: '+ 2.00829378', id: 12345678987654321245},
  ]

  return (
      <div className={styles.root}>
          <div className={styles.header}>
            <Header icon='/img/Statistics/stats.svg' label='Статистика' style='labelOnly' shadowColor='violet'/>
          </div>
          <div className={styles.container}>
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
            {users.slice(0, 10).map((item, index) =>
              <div className={classNames(styles.row, styles.rowInner)} key={index}>
                <div className={styles.cell}>
                  <div className={styles.game}>
                    <div className={styles.gameImg}>
                      <img src={item.gameImg} alt=''/>
                    </div>
                    <div className={styles.gameLbl} title={item.game}>
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
                  <div className={styles.id} title={item.id.toString()}>
                    {item.id}
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.multWrapper}>
                    <div className={classNames(styles.mult, {[styles.zero]: +item.mult <= 0})}>
                      x{item.mult}
                    </div>
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={classNames(styles.amount, {[styles.red]: +item.mult <= 0})}>
                  <img src='/img/Winners/BTC.png' alt=''/>
                  {item.amount}
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
      </div>
  )
}