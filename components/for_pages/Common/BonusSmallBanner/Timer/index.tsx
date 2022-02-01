import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  expiredAt: Date
  days?: boolean
  mainPage?: boolean
  size?: 'large' | 'normal' | 'small'
}

export default function Timer(props: Props) {

  const currentDate = Date.now()

  const expireDate = props.expiredAt.getTime()

  const timeToExpire = expireDate - currentDate


  const calculateTimeLeft = () => {
  
    let timeLeft = {}
  
    if (timeToExpire > 0) {
      timeLeft = {
        hours: Math.floor((timeToExpire / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeToExpire / 1000 / 60) % 60),
      }
    }
  
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  
    return () => clearTimeout(timer)
  })

  const timerComponents = []

Object.keys(timeLeft).forEach((interval) => {
  if (!timeLeft[interval]) {
    return
  }

  timerComponents.push(
    <span>
      {timeLeft[interval] ? (+timeLeft[interval] >= 10 ? timeLeft[interval]  : `0${timeLeft[interval]}`) : '00'}
    </span>
  )
})

const hours = timerComponents[0] 
const minutes = timerComponents[1] 

const getOutput = (index: number) => {
  if(!timerComponents.length){
    return 
  }
  switch(index){
    case 0: 
    return hours
    case 1:
    return minutes
  }
}

const getSizeClass = (size) => {
  switch (size) {
    case 'normal':
      return styles.rootNormal
    case 'large':
      return styles.rootLarge
    case 'small':
      return styles.rootSmall
    default:
      return styles.root
  }
}

  return (
    <div className={`${styles.root} ${getSizeClass(props.size)}`}>
    <div className={styles.wrapper}>
      <div className={styles.hours}>
        <div className={styles.input}>
          {getOutput(0)}
        </div>
      </div>
      <div className={classNames(styles.separator, {[styles.visibleSep]: !props.mainPage})}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.minutes}>
        <div className={styles.input}>
          {getOutput(1)}
        </div>
      </div>
    </div>
    </div>
  )
}
