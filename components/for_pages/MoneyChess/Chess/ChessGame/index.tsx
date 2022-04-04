import Board from '../components/Board'
import styles from './index.module.scss'

interface Props {
  
}

export default function ChessGame(props: Props) {

  return (
    <div className={styles.root}>
      <Board/>
    </div>
  )
}
