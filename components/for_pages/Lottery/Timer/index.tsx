import { useTimer } from 'react-timer-hook'
import styles from './index.module.scss'
import {pad} from 'utils/formatter'
import {pluralize} from 'numeralize-ru'
import {useTranslation} from 'next-i18next'

interface Props {
  expiredAt: Date
  roundId: number
}

export default function Timer(props: Props) {
  const {t} = useTranslation()

  const expireDate = new Date(props.expiredAt)

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
  } = useTimer({ expiryTimestamp: expireDate, onExpire: () => console.warn('onExpire called') })

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {t('lottery_round_title')} <span>{props.roundId}</span> {t('lottery_round_ends_in')}
      </div>
      <div className={styles.timer}>
      <div className={styles.days}>
        <div className={styles.digit}>
          { pad('00',
            days
          )}
        </div>
        <div className={styles.label}>
          {pluralize(days, t('timer_days_1'), t('timer_days_2'), t('timer_days_5'))}
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
        { pad('00',
           hours
          )}
        </div>
        <div className={styles.label}>
          {pluralize(hours, t('timer_hours_1'), t('timer_hours_2'), t('timer_hours_5'))}
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
        { pad('00',
           minutes
          )}
        </div>
        <div className={styles.label}>
          {pluralize(hours, t('timer_mins_1'), t('timer_mins_2'), t('timer_mins_5'))}
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
        { pad('00',
           seconds
          )}
        </div>
        <div className={styles.label}>
          {pluralize(hours, t('timer_secs_1'), t('timer_secs_2'), t('timer_secs_5'))}
        </div>
      </div>
      </div>
    </div>
  )
}
