import styles from './index.module.scss'
import GameArrowSvg from 'components/for_pages/games/components/svg/GameArrowSvg'
import GameInfoSvg from 'components/for_pages/games/components/svg/GameInfoSvg'
import GameMuteSvg from 'components/for_pages/games/components/svg/GameMuteSvg'
import GameStatSvg from 'components/for_pages/games/components/svg/GameStatSvg'
interface Props{

}
export default function GamePageBoardToolbar(props: Props) {

  const handleClick = () => {

  }
  return (
    <div className={styles.root}>
      <div className={styles.button} onClick={handleClick}><GameInfoSvg/></div>
      <div className={styles.button} onClick={handleClick}><GameMuteSvg/></div>
      <div className={styles.button} onClick={handleClick}><GameStatSvg/></div>
      <div className={styles.button} onClick={handleClick}><GameArrowSvg/></div>
    </div>
  )
}


