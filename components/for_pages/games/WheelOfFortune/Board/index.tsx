import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {MineStatus} from 'components/for_pages/games/Mines/data/enums'
import Mine from 'components/for_pages/games/Mines/Board/Mine'
import GameImageGround from 'components/for_pages/games/components/layout/GameImageGround'

interface Props{

}
export default function Board(props: Props) {
  const handleClick = (key) => {
    console.log(key)
  }

  return (
    <GamePageBoardLayout>
      <div className={styles.mines}>
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map(i => <Mine key={i} status={MineStatus.Mine} onClick={() => handleClick(i)}/>)}
      </div>
      <GameImageGround/>
    </GamePageBoardLayout>
  )
}


