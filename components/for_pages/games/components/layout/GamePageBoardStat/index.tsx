import styles from './index.module.scss'
import classNames from 'classnames'
import {useEffect, useState} from 'react'
import {ICasinoGameUserStat} from 'components/for_pages/games/data/interfaces/ICasinoGameUseStat'
import CasinoGameRoundRepository from 'components/for_pages/games/data/reposittories/CasinoGameRoundRepository'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {useGameContext} from 'components/for_pages/games/context/state'
import GameModalCloseSvg from 'components/for_pages/games/components/svg/GameModalCloseSvg'
interface Props{
  className?: string
  open: boolean
  onClose: () => void
}
export default function GamePageBoardStat(props: Props) {
  const gameContext = useGameContext()
  const [stat, setStat] = useState<ICasinoGameUserStat | null>(null)
  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
        if(props.open){
          console.log('FinishEvent')
          //TODO check is demo
          CasinoGameRoundRepository.getUserStat().then(i => setStat(i))
        }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  useEffect(() => {
    CasinoGameRoundRepository.getUserStat().then(i => setStat(i))
  }, [props.open])
  const splitAmount = (amount) => {
    const parts = (amount ?? 0).toFixed(8)?.split('.')
    return <>{parts[0]}{parts.length > 1 ? '.' : ''}<span>{parts[1] ?? ''}</span></>
  }

  if(!stat){
    return null
  }
  return (
    <div className={classNames(styles.root, props.className, {[styles.opened]: props.open})}>
        <div className={styles.header}>Статистика</div>
      <div className={styles.close} onClick={props.onClose}><GameModalCloseSvg/></div>
      <div className={styles.fields}>
        <div className={classNames(styles.field, styles.fieldAmount)}>
          <div className={styles.label}>Пари сделано</div>
          <div className={classNames(styles.value, styles.betAmount)}>{stat.wager ? splitAmount(stat.wager) : 0} <span>{gameContext.user?.currency?.toUpperCase() ?? ''}</span></div>
        </div>
        <div className={classNames(styles.field, styles.fieldAmount)}>
          <div className={styles.label}>Прибыль</div>
          <div className={classNames(styles.value, styles.profitAmount)}>{stat.profit ? splitAmount(stat.profit) : 0} <span>{gameContext.user?.currency?.toUpperCase() ?? ''}</span></div>
        </div>
        <div className={classNames(styles.field, styles.fieldCount)}>
          <div className={styles.label}>Победа:&nbsp;</div>
          <div className={classNames(styles.value, styles.winCount)}>{stat.winCount ?? 0}</div>
        </div>
        <div className={classNames(styles.field, styles.fieldCount)}>
          <div className={styles.label}>Проигрыш:&nbsp;</div>
          <div className={classNames(styles.value, styles.loseCount)}>{stat.loseCount ?? 0}</div>
        </div>
      </div>

    </div>
  )
}


