import styles from './index.module.scss'
import GameModalLayout from 'components/for_pages/games/components/layout/GameModalLayout'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useAppContext} from 'context/state'

interface Props{
  onClose: () => void,
}

export default function GameResultModal(props: Props) {
  const appContext = useAppContext()
  const gameContext = useGameContext()
  return (
    <GameModalLayout onClose={props.onClose} fixed={appContext.isMobile}>
      <div className={styles.root}>
        <div className={styles.icon}><img src={'/img/Games/icons/win.png'}/></div>
        <div className={styles.profit}>{gameContext.result?.profit?.toFixed(8)} {gameContext.result?.currency}</div>
        <div className={styles.multiplier}>{gameContext.result?.multiplier >= 0 ? `x${gameContext.result?.multiplier}`: ''}</div>
      </div>
    </GameModalLayout>

  )
}


