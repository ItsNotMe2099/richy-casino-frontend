import styles from './index.module.scss'
import {useEffect} from 'react'
import classNames from 'classnames'

import {pad} from 'utils/formatter'
import {useTimer} from 'react-timer-hook'


interface Props {
  expiredAt: Date
  hidden?: boolean
}
export const ChessSideBarTimer = (props: Props) => {
  const {
    seconds,
    minutes,
    restart
  } = useTimer({expiryTimestamp: props.expiredAt})
  useEffect(() => {
    restart(props.expiredAt, true)
  }, [props.expiredAt])
  return (
    <div className={classNames(styles.root, {[styles.hidden]: props.hidden})}>
      <div className={styles.time}>{pad('00', minutes)}:{pad('00', seconds)}</div>
    </div>
  )
}
