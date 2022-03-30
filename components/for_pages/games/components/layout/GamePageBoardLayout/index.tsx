import styles from './index.module.scss'
import {ReactElement, useState} from 'react'
import cx from 'classnames'
import GamePageBoardToolbar from 'components/for_pages/games/components/layout/GamePageBoardToolbar'
import HiddenXs from 'components/ui/HiddenXS'
import GameResultModal from 'components/for_pages/games/components/modals/GameResultModal'
import {useGameContext} from 'components/for_pages/games/context/state'
import GameErrorModal from 'components/for_pages/games/components/modals/GameErrorModal'
import GamePageBoardStat from 'components/for_pages/games/components/layout/GamePageBoardStat'
interface Props{
  className?: string
  children?: ReactElement | ReactElement[]
}
export default function GamePageBoardLayout({children, className}: Props) {
  const gameContext = useGameContext()
  const [statOpened, setStatOpened] = useState<boolean>(false)
  const handleCloseResultModal = () => {
    gameContext.setShowResultModal(false)
    gameContext.clear()
  }

  return (
    <div className={cx(styles.root, className)}>
      {children}
      <HiddenXs>
        <>
        <GamePageBoardStat open={statOpened} onClose={() => setStatOpened(false)}/>
        <GamePageBoardToolbar onStatClick={() => setStatOpened(!statOpened)}/>
        </>
      </HiddenXs>
      {gameContext.showResultModal && <GameResultModal  onClose={handleCloseResultModal}/>}
      {gameContext.error && <GameErrorModal  onClose={handleCloseResultModal}/>}
    </div>
  )
}


