import styles from './index.module.scss'
import {ReactElement, useState} from 'react'
import cx from 'classnames'
import GamePageBoardToolbar from 'components/for_pages/games/components/layout/GamePageBoardToolbar'
import GameResultModal from 'components/for_pages/games/components/modals/GameResultModal'
import {useGameContext} from 'components/for_pages/games/context/state'
import GameErrorModal from 'components/for_pages/games/components/modals/GameErrorModal'
import GamePageBoardStat from 'components/for_pages/games/components/layout/GamePageBoardStat'
interface Props{
  className?: string
  children?: ReactElement | ReactElement[]
  toolbarColor?: 'green'
}
export default function GamePageBoardLayout({children, className, toolbarColor}: Props) {
  const gameContext = useGameContext()
  const [statOpened, setStatOpened] = useState<boolean>(false)
  const handleCloseResultModal = () => {
    gameContext.setShowResultModal(false)
    gameContext.clear()
  }

  return (
    <div className={cx(styles.root, className)}>
      {children}
      <GamePageBoardStat open={statOpened} onClose={() => setStatOpened(false)}/>
      <GamePageBoardToolbar color={toolbarColor} onStatClick={() => setStatOpened(!statOpened)}/>
      <GameResultModal open={gameContext.showResultModal} onClose={handleCloseResultModal}/>
      {gameContext.error && <GameErrorModal  onClose={handleCloseResultModal}/>}
    </div>
  )
}


