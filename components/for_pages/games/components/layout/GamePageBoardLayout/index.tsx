import styles from './index.module.scss'
import {ReactElement} from 'react'
import cx from 'classnames'
interface Props{
  className?: string
  children?: ReactElement | ReactElement[]
}
export default function GamePageBoardLayout({children, className}: Props) {
  return (
    <div className={cx(styles.root, className)}>
      {children}
    </div>
  )
}


