import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string
  other?: boolean
}

export default function LangSelect(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.other]: props.other})}>
        <img src='/img/layout/top/russia.svg' alt=''/> Ru
    </div>
  )
}

