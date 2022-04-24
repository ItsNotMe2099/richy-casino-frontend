import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import cookie from 'js-cookie'
import {CookiesLifeTime, Timers} from 'types/constants'
import {CookiesType} from 'types/enums'

interface Props {

}

export default function NotificationBanner(props: Props) {

  const context = useAppContext()

  const user = context.auth

  const [isShow, setIsShow] = useState(false)
  const modal = context.modal
  useEffect(() => {
    setTimeout(() => {
      const showCookie = cookie.get(CookiesType.notificationShown)
      if(!showCookie){
        setIsShow(true)
      }
    }, Timers.showNotificationBanner)
  }, [])


  const handleClose = () => {
    cookie.set(CookiesType.notificationShown, '1', { expires: CookiesLifeTime.notificationShown})
    setIsShow(false)
  }

  return (
    <>
    {(isShow && !modal && user) &&
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.coins}>
            <img src='/img/NotificationBanner/coins.png' alt=''/>
          </div>
          <div className={styles.close} onClick={handleClose}>
              <img src='/img/NotificationBanner/close.svg' alt=''/>
            </div>
          <div className={styles.subscribe}>
            <img src='/img/NotificationBanner/gift.png' alt=''/>
            <div className={styles.title}>
              Подпишись на уведомления
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.item}>
              <div className={styles.amount}>
                10$
              </div>
              <div className={styles.text}>
                на<br/> депозит
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.amount}>
                50
              </div>
              <div className={styles.text}>
                satoshi
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.amount}>
                1
              </div>
              <div className={styles.text}>
                lottery<br/> ticket
              </div>
            </div>
          </div>
          <div className={styles.btns}>
            <Button className={styles.subscribeBtn} size='normal' background='white'>Подписаться</Button>
            <Button className={styles.notNow} onClick={handleClose}>Не сейчас</Button>
          </div>
        </div>
      </div>
    }
    </>
  )
}

