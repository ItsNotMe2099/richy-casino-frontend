import styles from './index.module.scss'
import classNames from 'classnames'
import Header from 'components/for_pages/Common/Header'
import {useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IGameHistory} from 'data/interfaces/IGameHistory'
import GameListRepository from 'data/repositories/GameListRepository'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import { useAppContext } from 'context/state'
import {useInterval} from 'react-use'

interface Props {

}

export default function Statistics(props: Props) {
  const {t} = useTranslation()
  const [data, setData] = useState<IPagination<IGameHistory>>({total: 0, data: []})
  const [loading, setLoading] = useState(true)
  const context = useAppContext()
  const updatingRef = useRef<boolean>(true)
 const [isUpdating, setIsUpdating] = useState<boolean>(true)
  const isMobile = context.isMobile
  useEffect(() => {
    GameListRepository.fetchGameSessionHistory(1, 10).then(i => {

      setData(i)
      setLoading(false)
      setIsUpdating(false)
    })
  }, [])

  useInterval(() => {
    setIsUpdating(true)
      GameListRepository.fetchGameSessionHistory(1, 10).then(i => {
        setData(i)
        setLoading(false)
        setIsUpdating(false)
      })


  }, isUpdating ? null : 2000)
  return (
      <div className={styles.root}>
          <div className={styles.header}>
            <Header icon='/img/Statistics/stats.svg' label={t('stats_title')} style='labelOnly' shadowColor='violet'/>
          </div>
          <div className={styles.container}>
          <div className={styles.table}>
            <div className={styles.row}>
              <div className={styles.cell}>
                {t('stats_header_game')}
              </div>
              <div className={styles.cell}>
                {t('stats_header_player')}
              </div>
              {/*<div className={styles.cell}>
                {t('stats_header_bet')}
              </div>*/}
              <div className={styles.cell}>
                {t('stats_header_multiplier')}
              </div>
              <div className={styles.cell}>
                {t('stats_header_win')}
              </div>
            </div>
            {data.data.slice(0, 7).map((item, index) =>
              <div className={classNames(styles.row, styles.rowInner)} key={`${item.userId}${item.gameId}${item.coefficient}${item.amountWin}${item.amountBet}`}>
                <div className={styles.cell}>
                  <div className={styles.game}>
                    <div className={styles.gameImg}>
                      {/*<img src={item.imageIconPreviewUrl} alt=''/>*/}
                      {item.imageIconPreviewUrl && <Image src={item.imageIconSmallUrl || item.imageIconPreviewUrl} width={isMobile ? 16 : 28} height={isMobile ? 16 : 28}/>}
                    </div>
                    <div className={styles.gameLbl}>
                      {item.gameName}
                    </div>
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.gambler}>
                    {item.nickname ?? `#${item.userId}`}
                  </div>
                </div>
                {/*<div className={styles.cell}>
                  <div className={styles.id}>

                  </div>
            </div>*/}
                <div className={styles.cell}>
                  <div className={styles.multWrapper}>
                    <div className={classNames(styles.mult, {[styles.zero]:  item.amountWin <= 0 || item.coefficient < 0})}>
                      x{Math.abs(item.coefficient)?.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className={styles.cell}>
                  <div className={classNames(styles.amount, {[styles.red]: item.amountWin <= 0})}>
                    <CurrencySvg currencyIso={item.currencyIso} color className={styles.currencyIcon}/>
                  <div className={styles.amountText}>{item.amountWin}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
      </div>
  )
}
