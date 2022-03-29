import styles from './index.module.scss'
import {ReactElement} from 'react'
interface Props{
 children: ReactElement | ReactElement[]
}
export default function GamePageBetMobileLayout({children}: Props) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}


