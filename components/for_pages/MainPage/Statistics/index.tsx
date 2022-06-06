import styles from './index.module.scss'
import classNames from 'classnames'
import Header from 'components/for_pages/Common/Header'
import {useEffect, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IGameHistory} from 'data/interfaces/IGameHistory'
import GameListRepository from 'data/repositories/GameListRepository'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'

interface Props {

}

export default function Statistics(props: Props) {
  const [data, setData] = useState<IPagination<IGameHistory>>({total: 0, data: []})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    GameListRepository.fetchGameSessionHistory(1, 10).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])


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
            {data.data.map((item, index) =>
              <div className={classNames(styles.row, styles.rowInner)} key={index}>
                <div className={styles.cell}>
                  <div className={styles.game}>
                    <div className={styles.gameImg}>
                      <img src={item.imageIconPreviewUrl} alt=''/>
                    </div>
                    <div className={styles.gameLbl}>
                      {item.gameId}
                    </div>
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.gambler}>
                    #{item.userId}
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.id}>

                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.multWrapper}>
                    <div className={classNames(styles.mult, {[styles.zero]:  item.amountWin <= 0})}>
                      x{Math.abs(item.coefficient)?.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={classNames(styles.amount, {[styles.red]: item.amountWin <= 0})}>
                    <CurrencySvg currencyIso={item.currencyIso} color className={styles.currencyIcon}/>
                  {item.amountWin}
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
      </div>
  )
}
