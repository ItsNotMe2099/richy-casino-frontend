import styles from './index.module.scss'
import GameArrowSvg from 'components/for_pages/games/components/svg/GameArrowSvg'
import GameInfoSvg from 'components/for_pages/games/components/svg/GameInfoSvg'
import GameSoundMutedSvg from 'components/for_pages/games/components/svg/GameSoundMutedSvg'
import GameStatSvg from 'components/for_pages/games/components/svg/GameStatSvg'
import { useGameSound} from 'components/for_pages/games/context/game_sound'
import usePressAndHover from 'components/for_pages/games/hooks/usePressAndHover'
import GameSoundSvg from 'components/for_pages/games/components/svg/GameSoundSvg'
import classNames from 'classnames'
interface Props{
  onStatClick: () => void
  color?: 'green'
}
export default function GamePageBoardToolbar(props: Props) {
  const gameSound = useGameSound()
  const [soundBtnRef, soundBtnPress, soundBtnHover] = usePressAndHover()
  const handleSoundClick = () => {
    gameSound.setDisabled(!gameSound.disabled)
  }
  const handleInfoClick = () => {

  }
  const handlePfClick = () => {

  }
  return (
    <div className={classNames(styles.root, {[styles.green]: props.color === 'green'})}>
      <div className={styles.button} onClick={handleInfoClick}><GameInfoSvg/></div>
      <div className={styles.button} onClick={handleSoundClick} ref={soundBtnRef}>{soundBtnHover ?  (gameSound.disabled ? <GameSoundSvg/> : <GameSoundMutedSvg/>) : (gameSound.disabled ? <GameSoundMutedSvg/> : <GameSoundSvg/>)}</div>
      <div className={styles.button} onClick={props.onStatClick}><GameStatSvg/></div>
      <div className={styles.button} onClick={handlePfClick}><GameArrowSvg/></div>
    </div>
  )
}


