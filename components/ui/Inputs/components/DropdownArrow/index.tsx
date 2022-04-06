import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  active: boolean
}

export default function DropdownArrow(props: Props) {
  return <div className={classNames(styles.root, {[styles.reverse]: props.active})}>
    <img src='/img/Select/arrow-exchange.svg' alt=''/>
  </div>
}
