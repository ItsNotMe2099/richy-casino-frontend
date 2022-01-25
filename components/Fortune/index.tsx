import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useEffect, useState } from 'react'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {
  
}

export default function Fortune(props: Props) {

  const [currentDate, setCurrentDate] = useState(null)
  //const [expireDate, setExpireDate] = useState(null)

  const handleClick = () => {
    setCurrentDate(Date.now())
  }

  const expireDate = Date.now() + 12*60*60*1000
  

  const timeToExpire = expireDate - currentDate

  const calculateTimeLeft = () => {
  
    let timeLeft = {}
  
    if (timeToExpire > 0) {
      timeLeft = {
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
      {timeLeft[interval] ? (+timeLeft[interval] >= 10 ? timeLeft[interval]  : `0${timeLeft[interval]}`) : '00'}
    </span>
  )
})

const hours = timerComponents[0] 
const minutes = timerComponents[1] 
const seconds = timerComponents[2] 

const getOutput = (index: number) => {
  if(!timerComponents.length){
    return 
  }
  switch(index){
    case 0: 
    return hours
    case 1:
    return minutes
    case 2: 
    return seconds
  }
}
  
  return (
    <div className={styles.root}>
      <div className={styles.wheel}>
        <img src='/img/Fortune/wheel.svg' alt=''/>
        <HiddenXs>
        <div className={styles.wrapper}>
          <div className={styles.everyday}>
            <div>lucky spin everyday</div>
          </div>
        </div>
        </HiddenXs>
        <div className={styles.right}>
          <img src='/img/Fortune/coins1.svg' alt=''/>
        </div>
        <div className={styles.left}>
          <img src='/img/Fortune/coins2.svg' alt=''/>
        </div>
      </div>
      <div className={styles.mobile}>
      <VisibleXs>
        <div className={styles.wrapperMobile}>
          <div className={styles.everydayMobile}>
            <div>lucky spin everyday</div>
          </div>
        </div>
      </VisibleXs>
      {!currentDate && <div className={styles.btn}><Button onClick={handleClick} className={styles.spin} background='pink'>Spin the wheel</Button></div>}
      {currentDate &&
      <div className={styles.next}>
        <div className={styles.free}>
          Next free spin bonus
        </div>
        <div className={styles.timer}>
          <div className={styles.hours}>
            {getOutput(0)}
          </div>
          :
          <div className={styles.hours}>
            {getOutput(1)}
          </div>
          :
          <div className={styles.hours}>
            {getOutput(2)}
          </div>
        </div>
      </div>}
      </div>
    </div>
  )
}
