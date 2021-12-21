import { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface Props {
  expiredAt: Date
}

export default function Timer(props: Props) {

  const currentDate = Date.now()

  const expireDate = props.expiredAt.getTime()

  const timeToExpire = expireDate - currentDate


  const calculateTimeLeft = () => {
  
    let timeLeft = {}
  
    if (timeToExpire > 0) {
      timeLeft = {
        days: Math.floor(timeToExpire / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeToExpire / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeToExpire / 1000 / 60) % 60),
        seconds: Math.floor((timeToExpire / 1000) % 60)
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
  timerComponents.push(
    <span>
      {timeLeft[interval] ? timeLeft[interval] : '0'}
    </span>
  )
})

const days = timerComponents[0] 
const hours = timerComponents[1] 
const minutes = timerComponents[2] 
const seconds = timerComponents[3] 

const getOutput = (index: number) => {
  if(!timerComponents.length){
    return 
  }
  switch(index){
    case 0:
    return days 
    case 1: 
    return hours 
    case 2:
    return minutes 
    case 3: 
    return seconds 
  }
}

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        Lottery round <span>334</span> ends in
      </div>
      <div className={styles.timer}>
      <div className={styles.days}>
        <div className={styles.digit}>
          {getOutput(0)}
        </div>
        <div className={styles.label}>
          days
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
            {getOutput(1)}
        </div>
        <div className={styles.label}>
          hours
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
            {getOutput(2)}
        </div>
        <div className={styles.label}>
          minutes
        </div>
      </div>
      <div className={styles.days}>
        <div className={styles.digit}>
            {getOutput(3)}
        </div>
        <div className={styles.label}>
          seconds
        </div>
      </div>
      </div>
    </div>
  )
}
