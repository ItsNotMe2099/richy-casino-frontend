import styles from './index.module.scss'
import GameModalLayout from 'components/for_pages/games/components/layout/GameModalLayout'
import {useGameContext} from 'components/for_pages/games/context/state'

interface Props{
  onClose: () => void,
}

export default function GameErrorModal(props: Props) {
  const gameContext = useGameContext()
  return (
    <GameModalLayout onClose={props.onClose} fixed>
      <div className={styles.root}>
        <div className={styles.error}>{gameContext.error}</div>
      </div>
    </GameModalLayout>

  )
}


