import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {GDiceProgressBar} from 'components/for_pages/games/Dice/components/ProgressBar'
import {useEffect, useRef, useState} from 'react'
import GField from 'components/for_pages/games/components/inputs/GField'
import GFieldChance from 'components/for_pages/games/Dice/components/GFieldChance'
import GameImageGround from 'components/for_pages/games/components/layout/GameImageGround'
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {DiceProgressResult} from 'components/for_pages/games/Dice/components/DiceProgressResult'
import {useGameContext} from 'components/for_pages/games/context/state'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'

interface Props{
  values: ICasinoGameDiceDto,
  onSetValue:(name: string, value: any) => void
}
export default function Board(props: Props) {
  const gameContext = useGameContext()
  const {values, onSetValue} = props
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const gameSound = useGameSound()
  const changeValByProgressTimeoutRef = useRef(null)
  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
      setResult(data)

      if(data){
        gameSound.play(data.win ? GameSound.Win : GameSound.Lose, 100)
        onSetValue('profit', data.profit.toFixed(8))
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleChangeTarget = () => {
    const newTarget = values.target === 'lower' ? 'higher' : 'lower'
    const newValue = 100 - values.value
    onSetValue('target',newTarget)
    onSetValue('value', newValue)
    gameSound.play(GameSound.Bet)
    setDiceProfit(newTarget, newValue)
    setChance(newTarget, newValue)
  }
  const handleChangeValueByProgressBar = (value) => {
    if(changeValByProgressTimeoutRef.current){
      clearTimeout(changeValByProgressTimeoutRef.current)
      changeValByProgressTimeoutRef.current = null
    }
    changeValByProgressTimeoutRef.current = setTimeout(() => handleChangeValue(value), 100)
  }
  const handleChangeValue = (value) => {
    gameSound.play(GameSound.Bet, 100)
    setDiceProfit(values.target, value)
    setChance(values.target, value)
  }
  const setDiceProfit = (target: string, value: number) => {
    const payout = diceProfit(target === 'lower' ? 0 : value, target === 'higher' ? 100 : value).toFixed(2)
    onSetValue('payout', `x${payout}`)
  }

  const diceProfit = (min: number, max: number) => {
    let payout, range
    if(min === max) {
      payout = 99.0
    }else {
      range = max - min
      payout = 99.0 / range
    }
    return payout
  }
  const setChance = (target: string, value: number) => {
    onSetValue('chance', (target === 'higher' ? 100 - value : value))
  }
  const handleChangeChance = (value) => {
    const newValue = values.target === 'higher' ? 100 - value : value
      onSetValue('value', newValue)
    setDiceProfit(values.target, newValue)
  }
  return (
    <GamePageBoardLayout className={styles.layout}>
        <div className={styles.diceContainer}>

          </div>
      {result?.data && <DiceProgressResult value={result.data.value} isWin={result.win}/>}
              <GDiceProgressBar className={styles.progressBar} maxValue={99} minValue={2}  state={values.target} name={'value'} onChange={handleChangeValueByProgressBar}/>
              <div className={styles.fields}>
                <div className={styles.subFields}>
                <GField name={'payout'} disabled label={'Выплата'}  className={styles.field}  suffix={'clear'}/>
                <GField name={'value'} onChange={handleChangeValue} className={styles.field} label={values.target === 'lower' ? 'Прокрутить вниз' : 'Прокрутить вверх'} suffix={<img onClick={handleChangeTarget} className={styles.exchangeSuffix} src={'/img/Games/exchange.svg'}/>}/>
                </div>
                <GFieldChance name={'chance'} onChange={handleChangeChance}  className={styles.fieldChance} label={'Шанс выиграть'} min={1} max={98}/>
              </div>
          <GameImageGround/>
    </GamePageBoardLayout>
  )
}


