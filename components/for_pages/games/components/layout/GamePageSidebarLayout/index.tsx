import styles from './index.module.scss'
import {ReactElement} from 'react'
import classNames from 'classnames'
interface Props{
  className?: string
  children?: ReactElement | ReactElement[]
}
export default function GamePageSidebarLayout({children, className}: Props) {
  return (
    <div className={classNames(styles.root, className)}>
      {children}
    </div>
  )
}


