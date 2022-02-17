import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import Item from './Item'
import GameImageGround from 'components/for_pages/games/components/layout/GameImageGround'
import {KenoItemStatus} from 'components/for_pages/games/Keno/data/enums'
import EmptyStat from 'components/for_pages/games/Keno/Board/EmptyStat'

interface Props{

}
export default function Board(props: Props) {
  const handleClick = (key) => {
    console.log(key)
  }

  return (
    <GamePageBoardLayout>
      <div className={styles.mines}>
      {Array.from({length: 40}, (_, i) => i + 1).map(i => <Item key={i} id={i} status={KenoItemStatus.UnActive} onClick={() => handleClick(i)}/>)}
      </div>
      <EmptyStat/>
      <GameImageGround/>
    </GamePageBoardLayout>
  )
}


