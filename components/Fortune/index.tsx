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
import { useAppContext } from 'context/state'
import { isAfter } from 'date-fns'
import Winner from './Winner'
import classNames from 'classnames'
import RichyLoader from 'components/ui/RichyLoader'
import { ModalType } from 'types/enums'
import { useMeasure } from 'react-use'
import { useTranslation } from 'next-i18next'

const Board = dynamic(() => import('./Board'), { ssr: false })

// const mockRes: IWheelPlayResponse = {
//   currencyIso: 'BTC',
//   player: {balanceSpins: 2, balanceSpinsTimeNewFreeAccrual: '2022-04-24T16:00:47+03:00'},
//   winAmount: 0.005,
// }

interface Props {
  isBottomSheet?: boolean
}

export default function Fortune(props: Props) {
  const totalTime = 5000
  const {t} = useTranslation()
  const appContext = useAppContext()
  const [ref, { width, height }] = useMeasure()
  const canvasSize = appContext.isMobile ? width + width * 0.1 : 390
  const slotsRef = useRef<IWheelSlot[]>([])
  const [gameResult, setGameResult] = useState<IWheelPlayResponse>(null)
  const gameResultRef = useRef<IWheelPlayResponse>(null)
  const [winnerResult, setWinnerResult] = useState<IWheelPlayResponse>(null)
  const userRef = useRef<IWheelInfoUser>()
  const [expirationDate, setExpirationDate] = useState<Date>(null)
  const [loaded, setLoaded] = useState(false)
  const [available, setAvailable] = useState<boolean>(false)
  const [showWinner, setShowWinner] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const timer = useTimer({ expiryTimestamp: expirationDate, onExpire: () => {
    setTimeout(() => {
      init()
    }, 500)

    } })

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    timer.restart(expirationDate)
  }, [expirationDate])

  useEffect(() => {
    gameResultRef.current = gameResult
  }, [gameResult])

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
    console.log('Plsy')
    if (appContext.auth) {
      setButtonDisabled(true)
      setShowWinner(false)
      setGameResult(null)
      setWinnerResult(null)
      try {
        const res = await WheelRepository.play()
        // const res = mockRes
        userRef.current = res.player
        setGameResult(res)
        checkAvailable(userRef.current)
        setTimeout(clear, totalTime)
      }catch (e) {
        setButtonDisabled(false)
      }
    }else{
      appContext.showModal(ModalType.registration)
    }
  }

  const clear = () => {
    if (gameResultRef.current) {
      setWinnerResult(gameResultRef.current)
      setShowWinner(true)
    }
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
        <RichyLoader/>
      </div>
    )
  }

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.wheel}>
        <div className={styles.board}>
          <Board canvasSize={canvasSize} gameResult={gameResult} slots={slotsRef.current} />
        </div>
      </div>
      <HiddenXs>
          <div className={classNames(styles.wrapper, {[styles.withTimer]: !available && appContext.auth })}>
            <div className={styles.everyday}>
              <div>{t('fortune_lucky_spin_title')}</div>
              <div className={styles.right}>
                <img src='/img/Fortune/coins1.svg' alt=''/>
              </div>
              <div className={styles.left}>
                <img src='/img/Fortune/coins2.svg' alt=''/>
              </div>
            </div>
          </div>
        </HiddenXs>
      <div className={styles.mobile}>
        <img src='/img/Fortune/mob_coins_top_right.svg' alt='' className={styles.bgMobileCoinsTopRight}/>
        <img src='/img/Fortune/mob_coins_bottom_left.svg' alt='' className={styles.bgMobileCoinsBottomLeft}/>
        <VisibleXs>
          <div className={styles.wrapperMobile}>
            <div className={styles.everydayMobile}>
              <div>{t('fortune_lucky_spin_title')}</div>
            </div>
          </div>
        </VisibleXs>
        {(available || !appContext.auth)  && (
          <div className={styles.btn}>
            <Button
              onClick={play}
              className={styles.spin}
              background="pink"
              disabled={buttonDisabled}
            >{t('fortune_spin_button')}
            </Button>
          </div>
        )}
        {!available && appContext.auth && (
          <div className={styles.next}>
            <div className={styles.free}>
            {t('fortune_spin_next')}
            </div>
            <div className={styles.timer}>
              <div className={styles.hours}>
                {pad('00', timer.hours)}
              </div>
              :
              <div className={styles.hours}>
                {pad('00', timer.minutes)}
              </div>
              :
              <div className={styles.hours}>
                {pad('00', timer.seconds)}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={classNames({
        [styles.winnerOverlay]: true,
        [styles.visible]: showWinner,
      })}>
        <Winner
          data={winnerResult}
          className={styles.winner}
          onRequestClose={() => {
            setShowWinner(false)
            setWinnerResult(null)
            setButtonDisabled(false)
          }}
        />
      </div>
    </div>
  )
}
