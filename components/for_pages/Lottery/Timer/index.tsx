import { useTimer } from 'react-timer-hook'
import styles from './index.module.scss'
import {pad} from 'utils/formatters'

interface Props {
  expiredAt: Date
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
      <div className={styles.left}>
        Lottery round <span>334</span> ends in
      </div>
      <div className={styles.timer}>
      <div className={styles.days}>
        <div className={styles.digit}>
          { pad('00', 
           days
          )}
        </div>
        <div className={styles.label}>
          days
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
        { pad('00', 
           hours
          )}
        </div>
        <div className={styles.label}>
          hours
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
        { pad('00', 
           minutes
          )}
        </div>
        <div className={styles.label}>
          minutes
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
        { pad('00', 
           seconds
          )}
        </div>
        <div className={styles.label}>
          seconds
        </div>
      </div>
      </div>
    </div>
  )
}
