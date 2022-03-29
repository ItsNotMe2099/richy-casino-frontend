import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import Item from './Item'
import Stat from './Stat'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {chain} from 'components/for_pages/games/utils/chain'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import {getRandom} from 'components/for_pages/games/utils/rand'

interface Props{

}
export default function Board(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [resultTiles, setResultTiles] = useState([])
  const [resultMultiplier, setResultMultiplier] = useState(null)
  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      if(!data){
        setResultTiles([])
        setResult(null)
        return
      }
      chain(data.data.diamonds.length, 100, (i) => {
        gameSound.play(getRandom(14,15) as  GameSound)
        setResultTiles(tiles => [...tiles, data.data.diamonds[i]])
        if(i === data.data.diamonds.length - 1){
          setResult(data)
          setResultMultiplier(data.multiplier)
          //gameContext.setShowResultModal(true)

        }
      })
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])


  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <div className={styles.board}>
      <div className={styles.diamonds}>
        {Array.from({length: 5}, (_, i) => i).map(i => <Item key={i} color={resultTiles[i]}/>)}
      </div>

      <Stat hasResult={!!result} resultMultiplier={resultMultiplier}/>
      </div>
      </div>
    </GamePageBoardLayout>
  )
}


