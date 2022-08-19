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
const getId = (game: IGameHistory)=>{
  return `${game?.gameId}${game?.userId}${game?.amountBet}${game?.coefficient}`
}

export default function Statistics(props: Props) {
  const {t} = useTranslation()
  const [data, setData] = useState<IPagination<IGameHistory>>({total: 0, data: []})
  const dataRef = useRef<IPagination<IGameHistory>>({total: 0, data: []})
  const [loading, setLoading] = useState(true)
  const context = useAppContext()
  const updatingRef = useRef<boolean>(true)
 const [isUpdating, setIsUpdating] = useState<boolean>(true)
  const isMobile = context.isMobile
  useEffect(() => {
    dataRef.current = data
  }, [data])
  useEffect(() => {
    GameListRepository.fetchGameSessionHistory(1, 10).then(newData => {

      setData(newData)
      setLoading(false)
      setIsUpdating(false)
    })
  }, [])

  useInterval(() => {
    setIsUpdating(true)
      GameListRepository.fetchGameSessionHistory(1, 10).then(data => {
        const currentData = dataRef.current
        if(data.data.length > 0 && currentData.data.find(i => getId(i) === getId(data.data[0])) ){
          setLoading(false)
          setIsUpdating(false)
          return
        }
        const setNewData = !currentData.data.find(i => getId(i) === getId(data.data[0])) ? [data.data[0], ...currentData.data] : [...currentData.data]
        setNewData.pop()
        setData({data: setNewData, total: currentData.total})
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
              <div className={classNames(styles.row, styles.rowInner)} key={getId(item)}>
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
                    {item.nickname || t('stats_player_hidden')}
                  </div>
                </div>
                {/*<div className={styles.cell}>
                  <div className={styles.id}>

                  </div>
            </div>*/}
                <div className={styles.cell}>
                  <div className={styles.multWrapper}>
                    <div className={classNames(styles.mult, {[styles.zero]:  item.amountWin <= 0 || item.coefficient < 1})}>
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
