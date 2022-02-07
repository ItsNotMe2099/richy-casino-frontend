import styles from './index.module.scss'
import {ReactElement} from 'react'
interface Props{
  children?: ReactElement | ReactElement[]
}
export default function GamePageSidebarLayout({children}: Props) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}


