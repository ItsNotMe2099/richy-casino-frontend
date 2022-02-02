import styles from './index.module.scss'
import classNames from 'classnames'
import {useTimer} from 'react-timer-hook'
import {pad} from 'utils/formatters'
import HiddenXs from 'components/ui/HiddenXS'

interface Props {
  expiredAt: Date | string
  days?: boolean
  style?: 'bonus' | 'freebitcoin' | 'tournament' | 'gift' | 'footer' | 'sheet' | 'wallet' | 'footerSmall'
}

export default function Timer(props: Props) {

  const currentDate = Date.now()

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

  const timerClass = classNames({
    [styles.bonus]: props.style === 'bonus',
    [styles.freebitcoin]: props.style === 'freebitcoin',
    [styles.tournament]: props.style === 'tournament',
    [styles.gift]: props.style === 'gift',
    [styles.footer]: props.style === 'footer',
    [styles.footerSmall]: props.style === 'footerSmall',
    [styles.sheet]: props.style === 'sheet',
    [styles.wallet]: props.style === 'wallet',
  })


  return (
    <div className={classNames(styles.root, timerClass)}>
      <HiddenXs>
        <div className={styles.end}>
          До окончания
        </div>
      </HiddenXs>
      <div className={styles.timer}>
      <div className={styles.hours}>
        <div className={styles.input}>
          { pad('00', props.days ?
           days
            :
            hours
          )}
        </div>
        <div className={styles.label}>
          {props.days? <>дней</> : <>часов</>}
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.minutes}>
        <div className={styles.input}>
        {pad('00', props.days ?
            hours
            :
            minutes
          )}
        </div>
        <div className={styles.label}>
        {props.days? <>часов</> : <>минут</>}
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.seconds}>
        <div className={styles.input}>
        {pad('00', props.days ?
            minutes
            :
            seconds
          )}
        </div>
        <div className={styles.label}>
        {props.days? <>минут</> : <>секунд</>}
        </div>
      </div>
      </div>
    </div>
  )
}
