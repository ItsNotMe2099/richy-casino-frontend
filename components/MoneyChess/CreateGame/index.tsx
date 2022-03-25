import Button from 'components/ui/Button'
import styles from './index.module.scss'

interface Props {
  onClick?: () => void
}

export default function CreateGame(props: Props) {

  return (
      <div className={styles.root}>
        <div className={styles.statistics}>
          <Button background='dark500' onClick={props.onClick}>Статистика</Button>
        </div>
        <div className={styles.own}>
          <div className={styles.opponents}>
            There are no opponets now.
          </div>
          <div className={styles.game}>
            Create your own game!
          </div>
          <Button className={styles.create} background='blueGradient500'>Создать игру</Button>
        </div>
        <div className={styles.money}>
          <img src='/img/Chess/money-chess.svg' alt=''/>
        </div>
      </div>
  )
}
