import styles from './index.module.scss'
import { Col } from 'react-grid-system'
import Button from 'components/ui/Button'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string
  modal?: boolean
  onRequestClose?: () => void
  noBack?: boolean
  sheet?: boolean
}

export default function ConstantSlide(props: Props) {

  return (
      <Col className={props.className}>
      <div className={classNames(styles.root, {[styles.noBack]: props.noBack})}>
        {props.modal &&
        <div className={classNames(styles.close, {[styles.closeSheet]: props.sheet})} onClick={props.onRequestClose}>
          <img src='/img/icons/close-bonus.svg' alt=''/>
        </div>}
        <div className={classNames(styles.hero, {[styles.sheet]: props.sheet})}><img src='/img/TopSlider/hero2.svg' alt=''/></div>
        <div className={styles.money}><img src='/img/TopSlider/money.svg' alt=''/></div>
        <div className={classNames(styles.title, {[styles.textLeft]: props.sheet})}>
          Бонус на депозит
        </div>
        <div className={classNames(styles.bonus, {[styles.textLeft]: props.sheet})}>
          30 000 ₽
        </div>
        <div className={classNames(styles.fs, {[styles.textLeft]: props.sheet})}>
          300 FS
        </div>
        <div className={styles.btn}>
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
      </div>
      </Col>
  )
}

