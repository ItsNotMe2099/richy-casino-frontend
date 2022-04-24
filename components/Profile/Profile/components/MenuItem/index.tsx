import styles from './index.module.scss'
import classNames from 'classnames'
import {useTranslation} from 'next-i18next'

interface Props {
  label: string
  icon: string
  isActive?: boolean
  onClick?: () => void
}

export  const MenuItem = (props: Props) => {
  const {t} = useTranslation()
  return (
    <div className={classNames(styles.menuItem, {[styles.active]: props.isActive})} onClick={props.onClick}>
      <div className={styles.menuIcon}>
        <img src={props.icon} alt=''/>
      </div>
      <div className={styles.menuLabel}>
        {props.label}
      </div>
    </div>
  )
}
