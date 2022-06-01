import styles from './index.module.scss'
import {ReactElement} from 'react'
interface Props{
  header: ReactElement
  sideBar: ReactElement
  board: ReactElement
  history: ReactElement
}
export default function GamePageLayout(props: Props) {
  const {header, sideBar, board, history} = props
  return (
    <div className={styles.root}>
        <div>{header}</div>
      <div className={styles.columns}>
        <div className={styles.sideBar}>{sideBar}</div>
        <div className={styles.board}>{board}</div>
      </div>
        <div>{history}</div>
    </div>
  )
}


