import styles from './index.module.scss'
import { Col } from 'react-grid-system'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import Timer from '../ShortBanner/Timer'

interface Props {
  children?: React.ReactNode
  className?: string
  modal?: boolean
  onRequestClose?: () => void
  noBack?: boolean
  sheet?: boolean
  longDown?: boolean
}

export default function ConstantSlide(props: Props) {

  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
      <Col className={props.className}>
      <div className={classNames(styles.root, {[styles.noBack]: props.noBack}, {[styles.rootDownBanner]: props.longDown})}>
        {(props.modal || props.longDown) &&
        <div className={classNames(styles.close, {[styles.closeSheet]: props.sheet})} onClick={props.onRequestClose}>
          <img src='/img/icons/close-bonus.svg' alt=''/>
        </div>}
        <div className={classNames(styles.hero, {[styles.sheet]: props.sheet}, {[styles.none]: props.longDown})}><img src='/img/TopSlider/hero2.svg' alt=''/></div>
        <div className={classNames(styles.money, {[styles.none]: props.longDown})}><img src='/img/TopSlider/money.svg' alt=''/></div>
        {props.longDown &&
          <>
          <div className={styles.moneyLeft}>
            <img src='/img/UserFooter/money-left-down-banner.svg' alt=''/>
          </div>
          <div className={styles.moneyRight}>
            <img src='/img/UserFooter/money-right-down-banner.svg' alt=''/>
          </div>
          <div className={styles.coinUp}>
            <img src='/img/UserFooter/coin-up.svg' alt=''/>
          </div>
          <div className={styles.coinDown}>
            <img src='/img/UserFooter/coin-down.svg' alt=''/>
          </div>

          </>
        }
        <div className={classNames({[styles.downBanner]: props.longDown})}>
        <div className={classNames(styles.title, {[styles.textLeft]: props.sheet})}>
          Бонус на депозит
        </div>
        <div className={classNames(styles.bonus, {[styles.textLeft]: props.sheet})}>
          30 000 ₽
        </div>
        <div className={classNames(styles.fs, {[styles.textLeft]: props.sheet})}>
          300 FS
        </div>
        <div className={classNames(styles.btn, {[styles.none]: props.longDown})}>
          <Button size='normal' background='payGradient500'>Получить</Button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.satoshi}>
            50 Satoshi
          </div>
          <div className={styles.satoshi}>
            10 Лотерейных билетов
          </div>
        </div>
        {props.longDown && <Timer expiredAt={expiredAt} size='normal'/>}
        </div>
      </div>
      </Col>
  )
}

