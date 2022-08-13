import styles from './index.module.scss'
import {useMeasure} from 'react-use'
import classNames from 'classnames'
import {useTimer} from 'react-timer-hook'
import {useEffect} from 'react'
import {pluralize} from 'numeralize-ru'
import {pad} from 'utils/formatter'
import {useTranslation} from 'next-i18next'

interface Props {
  expiredAt: Date
  onExpire?: () => void
}
const TimerItem = (props: {value: number, label: string}) => {
  const parts =  pad('00', props.value)
  return (<div className={styles.timerItem}>
    <div className={styles.timerGroup}>
      <div className={styles.timerSquare}><div className={styles.number}>{parts[0]}</div></div>
      <div className={styles.timerSquare}><div className={styles.number}>{parts[1]}</div></div>
    </div>
    <div className={styles.timeLabel}>{props.label}</div>
  </div>)
}
export default function TournamentCardTimer(props: Props) {
  const [ref, { width }] = useMeasure()
  const {t} = useTranslation()
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: new Date(props.expiredAt), onExpire: props.onExpire })
  useEffect(() => {
    restart(props.expiredAt)
  }, [props.expiredAt])
  const handleJoin = () => {

  }
  const daysLabel = pluralize(days, t('timer_days_1'), t('timer_days_2'), t('timer_days_5'))
  const hoursLabel = pluralize(hours, t('timer_hours_1'), t('timer_hours_2'), t('timer_hours_5'))
  const minsLabel = pluralize(minutes, t('timer_mins_1'), t('timer_mins_2'), t('timer_mins_5'))

  return (
    <div className={classNames(styles.root)}>
      <div className={styles.label}>     {t('tournament_card_timer')}</div>
      <div className={styles.timer}>
        <TimerItem value={days} label={daysLabel}/>
        <div className={styles.separator}>:</div>
        <TimerItem value={hours} label={hoursLabel}/>
        <div className={styles.separator}>:</div>
        <TimerItem value={minutes} label={minsLabel}/>
      </div>
    </div>

  )
}
