import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useEffect, useRef, useState } from 'react'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useTimer} from 'react-timer-hook'
import {pad} from 'utils/formatter'
import dynamic from 'next/dynamic'
import { IWheelInfoUser, IWheelPlayResponse, IWheelSlot } from 'data/interfaces/IWheel'
import WheelRepository from 'data/repositories/WheelRepository'
import Spinner from 'components/ui/Spinner'
import { useAppContext } from 'context/state'
import { isAfter } from 'date-fns'

const Board = dynamic(() => import('./Board'), { ssr: false })

interface Props {

}

export default function Fortune(props: Props) {
  const totalTime = 5000
  const appContext = useAppContext()
  const slotsRef = useRef<IWheelSlot[]>([])
  const [gameResult, setGameResult] = useState<IWheelPlayResponse>(null)
  const userRef = useRef<IWheelInfoUser>()
  const [expirationDate, setExpirationDate] = useState<Date>(null)
  const [loaded, setLoaded] = useState(false)
  const [available, setAvailable] = useState<boolean>(false)

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
  } = useTimer({ expiryTimestamp: expirationDate })

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    slotsRef.current = await WheelRepository.fetchSlots()
    if (appContext.auth) {
      userRef.current = await WheelRepository.fetchUserInfo()
      if (userRef.current) {
        checkAvailable(userRef.current)
      }
    }
    setLoaded(true)
  }

  const play = async () => {
    if (appContext.auth) {
      const res = await WheelRepository.play()
      userRef.current = res.player
      setGameResult(res)
      const isAvailable = checkAvailable(userRef.current)
      if (isAvailable) {
        setTimeout(clear, totalTime)
      }
    }
  }

  const clear = () => {
    setGameResult(null)
  }

  const checkAvailable = (userData: IWheelInfoUser): boolean => {
    const expirationDate = new Date(userData.balanceSpinsTimeNewFreeAccrual)
    const isAvailable = userData.balanceSpins > 0 && isAfter(new Date(), expirationDate)
    setExpirationDate(expirationDate)
    setAvailable(isAvailable)
    return isAvailable
  }

  if (!loaded) {
    return (
      <div className={styles.loader}>
        <Spinner size={32} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.wheel}>
        <div className={styles.board}>
          <Board gameResult={gameResult} slots={slotsRef.current} />
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
      {available && (
        <div className={styles.btn}>
          <Button
            onClick={play}
            className={styles.spin}
            background="pink"
            disabled={!!gameResult}
          >
            Spin the wheel
          </Button>
        </div>
      )}
      {!available &&
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
