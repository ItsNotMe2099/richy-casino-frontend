import styles from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarPlayer/index.module.scss'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import {useEffect, useRef, useState} from 'react'
import classNames from 'classnames'
import {getPercentFromDuration} from 'components/for_pages/MoneyChess/utils/time'
import { differenceInSeconds, intervalToDuration} from 'date-fns'
import {pad} from 'utils/formatter'


interface Props {
  user: IGameUser
  startedAt?: string
  expiredAt?: string
  hasTimer: boolean
  className?: string
}
const getDuration = (startedAt: Date, expiredAt: string) => {
  const diff = differenceInSeconds( new Date(expiredAt), new Date(startedAt))
  if(diff > 0) {
    const duration = intervalToDuration({start: 0, end: diff * 1000})
    return `${pad('00', duration.minutes)}:${pad('00', duration.seconds)}`
  }else{
    return '00:00'
  }
}
const Timer = ({show, timerStartedAt, timerExpiredAt}: {show: boolean, timerStartedAt: string, timerExpiredAt: string}) => {
  const [progress, setProgress] = useState(getPercentFromDuration(timerStartedAt, timerExpiredAt))
  const intervalRef = useRef(null)
  const [duration, setDuration] = useState<string | null>(getDuration(new Date(), timerExpiredAt))
  useEffect(() => {
    if(!show){
      if(intervalRef.current){
        clearInterval( intervalRef.current)
      }
      return
    }
    if(intervalRef.current){
      clearInterval( intervalRef.current)
    }
    if(getPercentFromDuration(timerStartedAt, timerExpiredAt) >= 0){
      intervalRef.current = setInterval(() => {

        const percent = getPercentFromDuration(timerStartedAt, timerExpiredAt)
        setDuration(getDuration(new Date(), timerExpiredAt))

        if(percent >= 100){
          if(intervalRef.current){
            clearInterval( intervalRef.current)
          }
        }
        setProgress(percent)
      }, 1000)
    }
    return () => {
      if( intervalRef.current){
        clearInterval( intervalRef.current)
      }
    }
  }, [timerExpiredAt, show])
  const restProgress = (100 - progress)
  return <div className={classNames(styles.timer, {
    [styles.hidden]: !show,
    [styles.red]: show && restProgress < 10,
    [styles.yellow]: show && restProgress >= 10 && restProgress < 30}
    )}>
    <div className={styles.value}>{duration}</div>
  </div>
}
export default function ChessSideBarPlayer(props: Props) {
  return ( <div className={classNames(styles.root, props.className)}>
    <div className={styles.login}>
      {props.user?.login ?? `${props.user?.id ? `#${props.user?.id}` : ''}`}
    </div>
     <Timer show={props.hasTimer} timerStartedAt={props.startedAt} timerExpiredAt={props.expiredAt}/>
  </div>)
}
