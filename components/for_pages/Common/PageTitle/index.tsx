import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string
  icon: string
  title: string
  onClick?: () => void
  lottery?: boolean
}

export default function PageTitle(props: Props) {

  return (
      <div className={styles.root}>
        <div className={styles.btn} onClick={props.onClick}>
          <img src='/img/FreeBitcoin/eva_arrow.svg' alt=''/>
        </div>
        <div className={classNames(styles.icon, {[styles.lottery]: props.lottery})}>
          <img src={props.icon} alt=''/>
        </div>
        <div className={styles.title}>
          {props.title}
        </div>
      </div>
  )
}

