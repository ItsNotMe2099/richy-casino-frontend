import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  expiredAt: Date
  days?: boolean
  mainPage?: boolean
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
  if (!timeLeft[interval]) {
    return
  }

  timerComponents.push(
    <span>
      {+timeLeft[interval] >= 10 ? timeLeft[interval]  : `0${timeLeft[interval]}`}
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
    return days ? days : '00'
    case 1: 
    return hours ? hours : '00'
    case 2:
    return minutes ? minutes : '00'
    case 3: 
    return seconds ? seconds : '00'
  }
}

  return (
    <div className={styles.root}>
      <div className={styles.hours}>
        <div className={classNames(styles.input, {[styles.large]: !props.mainPage})}>
          {props.days ?
            getOutput(0)
            :
            getOutput(1)
          }
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
        {props.days ?
            getOutput(1)
            :
            getOutput(2)
          }
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
        {props.days ?
            getOutput(2)
            :
            getOutput(3)
          }
        </div>
        <div className={classNames(styles.label, {[styles.visible]: !props.mainPage})}>
        {props.days? <>минут</> : <>секунд</>}
        </div>
      </div>
    </div>
  )
}
