import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'


interface Props {
  icon: string
  color: string
  label: string
  amount: number
}

export  const Bonus = (props: Props) => {
  const {t} = useTranslation()
  return (
    <div className={styles.bonusItem}>
      <div className={styles.bonusLeft}>
        <div className={styles.bonusIcon}>
          <img src={props.icon} alt=''/>
        </div>
        <div className={styles.bonusLabel} style={{color: props.color}}>
          {props.label}
        </div>
      </div>
      <div className={styles.number} style={{color: props.color}}>
        {props.amount}
      </div>
    </div>
  )
  }
