import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string
  icon: string
  title: string
  onClick?: () => void
  lottery?: boolean
  shadowColor?: 'red' | 'blue' | 'yellow' | 'violet'
  style?: 'chess'
}

export default function PageTitle(props: Props) {

  const getShadow = (shadowColor) => {
    switch (shadowColor){
      case 'blue':
        return '/img/shadows/light-blue.png'
      case 'red':
        return '/img/shadows/light-red.png'
      case 'yellow':
        return '/img/shadows/light-yellow-pagetitle.png'
      case 'violet':
        return '/img/shadows/light-violet.png'
    }
  }

  const rootClass = {
    [styles.chess]: props.style === 'chess'
  }

  return (
      <div className={classNames(styles.root, rootClass)}>
        <div className={styles.btn} onClick={props.onClick}>
          <img src='/img/FreeBitcoin/eva_arrow.svg' alt=''/>
        </div>
        <div className={classNames(styles.icon, {[styles.lottery]: props.lottery})}>
          {props.shadowColor && <div className={styles.shadow}><img src={getShadow(props.shadowColor)} alt=''/></div>}
          <img src={props.icon} alt=''/>
        </div>
        <div className={styles.title}>
          {props.title}
        </div>
      </div>
  )
}

