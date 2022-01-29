import styles from './index.module.scss'
import classNames from 'classnames'
import Timer from './Timer'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'

interface Props {
  children?: React.ReactNode
  className?: string
  reverse?: boolean
  timer?: boolean
  longDown?: boolean
  onRequestClose?: () => void
  authBanner?: boolean
}

export default function ShortBanner(props: Props) {
  const appContext = useAppContext()
  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
    <div className={classNames(styles.root,
      {[styles.noPaddingLeft]: (props.timer && !props.authBanner)}, {[styles.authBannerPadding]: props.authBanner})}
         onClick={() => appContext.showModal(ModalType.bonus)}>
      {props.longDown &&
      <div className={styles.close} onClick={(e) => {
        e.stopPropagation()
        props.onRequestClose()
      }}>
        <img src='/img/icons/close-bonus.svg' alt=''/>
      </div>}
      <div className={classNames(styles.hero, {[styles.withTimer]: (props.timer && !props.authBanner)})}><img
        src='/img/ShortBanner/hero.svg' alt=''/></div>
      <div className={styles.money}><img src='/img/ShortBanner/money.svg' alt=''/></div>
      <div
        className={classNames(styles.money2, {[styles.money2Timer]: props.timer}, {[styles.money2AuthBanner]: props.authBanner})}>
        <img src='/img/ShortBanner/money2.svg' alt=''/>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span className={classNames({[styles.bonusTimer]: props.timer})}>Бонус</span><br
            className={classNames(styles.break, {[styles.showBreak]: props.timer})}/> 30 000 ₽ + 300 FS
          </div>
          <div className={classNames(styles.bottom, {[styles.reverse]: props.reverse})}>
            <div className={styles.satoshi}>
              50 Satoshi
            </div>
            <div className={styles.satoshi}>
              10 Лотерейных билетов
            </div>
          </div>
        </div>
        {props.timer && <div className={styles.timer}><Timer expiredAt={expiredAt}/></div>}
      </div>
    </div>
  )
}

