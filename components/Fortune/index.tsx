import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useTimer} from 'react-timer-hook'
import {addHours} from 'date-fns'
import {pad} from 'utils/formatter'
import dynamic from 'next/dynamic'

const Board = dynamic(() => import('./Board'), { ssr: false })

interface Props {

}

export default function Fortune(props: Props) {

  const [currentDate, setCurrentDate] = useState(null)

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
  } = useTimer({ expiryTimestamp: addHours(new Date(), 1), onExpire: () => null })


  const handleClick = () => {
    setCurrentDate(Date.now())
  }

  return (
    <div className={styles.root}>
      <div className={styles.wheel}>
        <div className={styles.board}>
          <Board inProgress={currentDate} />
        </div>
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
            {pad('00', hours)}
          </div>
          :
          <div className={styles.hours}>
            {pad('00', minutes)}
          </div>
          :
          <div className={styles.hours}>
            {pad('00', seconds)}
          </div>
        </div>
      </div>}
      </div>
    </div>
  )
}
