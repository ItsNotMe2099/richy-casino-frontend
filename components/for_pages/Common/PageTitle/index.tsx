import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
  className?: string
  icon: string
  title: string
  onClick?: () => void
}

export default function PageTitle(props: Props) {

  return (
      <div className={styles.root}>
        <div className={styles.btn} onClick={props.onClick}>
          <img src='/img/FreeBitcoin/eva_arrow.svg' alt=''/>
        </div>
        <div className={styles.icon}>
          <img src={props.icon} alt=''/>
        </div>
        <div className={styles.title}>
          {props.title}
        </div>
      </div>
  )
}

