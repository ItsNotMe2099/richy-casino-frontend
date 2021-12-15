import styles from './index.module.scss'
import { Col } from 'react-grid-system'
import Button from 'components/ui/Button'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function ConstantSlide(props: Props) {

  return (
      <Col>
      <div className={styles.root}>
        <div className={styles.hero}><img src='/img/TopSlider/hero.svg' alt=''/></div>
        <div className={styles.money}><img src='/img/TopSlider/money.svg' alt=''/></div>
        <div className={styles.title}>
          Бонус на депозит
        </div>
        <div className={styles.bonus}>
          30 000 ₽
        </div>
        <div className={styles.fs}>
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

