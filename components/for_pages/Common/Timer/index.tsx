import styles from './index.module.scss'
import classNames from 'classnames'
import {useTimer} from 'react-timer-hook'
import {pad} from 'utils/formatter'
import {useEffect} from 'react'
import {useTranslation} from 'next-i18next'
import {pluralize} from 'numeralize-ru'

interface Props {
  expiredAt: Date
  days?: boolean
  minutes?: boolean
  style?: 'bonus' | 'freebitcoin' | 'tournament' | 'gift' | 'footer' | 'sheet' | 'wallet' | 'footerSmall' | 'tournamentMobile'
  onExpire?: () => void
  fontSize?: string
  rootPadding?: string
  inputWidth?: string
  inputHeight?: string
  circle?: string
}

export default function Timer(props: Props) {
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
  const timerClass = classNames({
    [styles.bonus]: props.style === 'bonus',
    [styles.freebitcoin]: props.style === 'freebitcoin',
    [styles.tournament]: props.style === 'tournament',
    [styles.tournamentMobile]: props.style === 'tournamentMobile',
    [styles.gift]: props.style === 'gift',
    [styles.footer]: props.style === 'footer',
    [styles.footerSmall]: props.style === 'footerSmall',
    [styles.sheet]: props.style === 'sheet',
    [styles.wallet]: props.style === 'wallet',
  })

  const daysLabel = pluralize(days, t('timer_days_1'), t('timer_days_2'), t('timer_days_5'))
  const hoursLabel = pluralize(hours, t('timer_hours_1'), t('timer_hours_2'), t('timer_hours_5'))
  const minsLabel = pluralize(minutes, t('timer_mins_1'), t('timer_mins_2'), t('timer_mins_5'))
  const secsLabel = pluralize(seconds, t('timer_secs_1'), t('timer_secs_2'), t('timer_secs_5'))
  return (
    <div className={classNames(styles.root, timerClass)} style={{...(props.rootPadding ? {padding: props.rootPadding}: {})}}>
      <div className={styles.end}>
        {t('timer_before_end')}
      </div>
      <div className={styles.timer}>
      <div className={styles.hours}>
        <div className={styles.input} style={{...(props.fontSize ? {fontSize: props.fontSize, width: props.inputWidth ? props.inputWidth : null, height: props.inputHeight ? props.inputHeight : null} : {})}}>
        <span>{ pad('00', props.days ?
           days
            : props.minutes ? minutes : hours
          )}</span>
        </div>
        <div className={styles.label}>
          {props.days ? daysLabel : props.minutes ? minsLabel : hoursLabel}
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.circle} style={{...(props.circle ?  {width: props.circle, height: props.circle} : {})}}></div>
        <div className={styles.circle} style={{...(props.circle ?  {width: props.circle, height: props.circle} : {})}}></div>
      </div>
      <div className={styles.minutes}>
        <div className={styles.input} style={{...(props.fontSize ? {fontSize: props.fontSize, width: props.inputWidth ? props.inputWidth : null, height: props.inputHeight ? props.inputHeight : null} : {})}}>
        <span>{pad('00', props.days ?
            hours
            :
          props.minutes ? seconds :  minutes
          )}</span>
        </div>
        <div className={styles.label}>
        {props.days ? hoursLabel : minsLabel}
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.seconds}>
        <div className={styles.input} style={{...(props.fontSize ? {fontSize: props.fontSize}: {})}}>
       <span>{pad('00', props.days ?
            minutes
            :
            seconds
          )}</span>
        </div>
        <div className={styles.label}>
        {props.days ? minsLabel : secsLabel}
        </div>
      </div>
      </div>
    </div>
  )
}
