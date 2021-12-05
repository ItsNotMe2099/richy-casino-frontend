import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function Panel(props: Props) {
  return (
    <div className={classNames([styles.root, props.className])}>
      {props.children}
    </div>
  )
}

