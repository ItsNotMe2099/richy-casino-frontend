import styles from './index.module.scss'
import classNames from 'classnames'
import {useTimer} from 'react-timer-hook'
import {pad} from 'utils/formatters'

interface Props {
  expiredAt: Date | string
  days?: boolean
  mainPage?: boolean
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


  return (
    <div className={styles.root}>
      <div className={styles.hours}>
        <div className={classNames(styles.input, {[styles.large]: !props.mainPage})}>
          { pad('00', props.days ?
           days
            :
            hours
          )}
        </div>
        <div className={classNames(styles.label, {[styles.visible]: !props.mainPage})}>
          {props.days? <>дней</> : <>часов</>}
        </div>
      </div>
      <div className={classNames(styles.separator, {[styles.visibleSep]: !props.mainPage})}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.minutes}>
        <div className={classNames(styles.input, {[styles.large]: !props.mainPage})}>
        {pad('00', props.days ?
            hours
            :
            minutes
          )}
        </div>
        <div className={classNames(styles.label, {[styles.visible]: !props.mainPage})}>
        {props.days? <>часов</> : <>минут</>}
        </div>
      </div>
      <div className={classNames(styles.separator, {[styles.visibleSep]: !props.mainPage})}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={classNames(styles.seconds, {[styles.visible]: !props.mainPage})}>
        <div className={classNames(styles.input, {[styles.large]: !props.mainPage})}>
        {pad('00', props.days ?
            minutes
            :
            seconds
          )}
        </div>
        <div className={classNames(styles.label, {[styles.visible]: !props.mainPage})}>
        {props.days? <>минут</> : <>секунд</>}
        </div>
      </div>
    </div>
  )
}
