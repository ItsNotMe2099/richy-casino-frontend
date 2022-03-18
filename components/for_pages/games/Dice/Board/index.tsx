import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {GDiceProgressBar} from 'components/for_pages/games/Dice/components/ProgressBar'
import {useEffect, useState} from 'react'
import GField from 'components/for_pages/games/components/inputs/GField'
import GFieldChance from 'components/for_pages/games/Dice/components/GFieldChance'
import GameImageGround from 'components/for_pages/games/components/layout/GameImageGround'
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {DiceProgressResult} from 'components/for_pages/games/Dice/components/DiceProgressResult'
import {useGameContext} from 'components/for_pages/games/context/state'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'

interface Props{
  values: ICasinoGameDiceDto,
  onSetValue:(name: string, value: any) => void
}
export default function Board(props: Props) {
  const gameContext = useGameContext()
  const {values, onSetValue} = props
  const [roll, setRoll] = useState(2)
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
      setResult(data)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleClick = (key) => {
    console.log(key)
  }

  const handleSubmit = (date) => {

  }
  const initialValues = {

  }
  const handleChangeTarget = () => {
    onSetValue('target',values.target === 'lower' ? 'higher' : 'lower')
    onSetValue('value', 100 - values.value)
  }
  return (
    <GamePageBoardLayout>
        <div className={styles.diceContainer}>
            <div className='dice' style={{ backgroundImage: 'url()' }} />
          </div>
      {result?.data && <DiceProgressResult value={result.data.value} isWin={result.win}/>}
              <GDiceProgressBar className={styles.progressBar} limit={100}  state={values.target} name={'value'} onChange={(val) => setRoll(val)}/>
              <div className={styles.fields}>
                <div className={styles.subFields}>
                <GField name={'payout_x'} label={'Выплата'} suffix={'clear'}/>
                <GField name={'value'} className={styles.fieldRoll} label={values.target === 'lower' ? 'Прокрутить вниз' : 'Прокрутить вверх'} suffix={<img onClick={handleChangeTarget} className={styles.exchangeSuffix} src={'/img/Games/exchange.svg'}/>}/>
                </div>
                <GFieldChance name={'chance'}  className={styles.fieldChance} label={'Шанс выиграть'} min={10} max={60}/>
              </div>
          <GameImageGround/>
    </GamePageBoardLayout>
  )
}


