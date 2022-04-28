import styles from './index.module.scss'
import bitcoin from 'bitcoin-units'
import { useEffect, useRef, useState } from 'react'
import { useGameContext } from 'components/for_pages/games/context/state'
import { GameTickData } from '../../Board/Game'
import { AviatorEventType, IAviatorEvent } from 'data/interfaces/IAviatorEvent'
import Button from 'components/ui/Button'
import { ICasinoGameDataDto } from 'components/for_pages/games/data/interfaces/ICasinoGameData'

interface Props {}

export default function AviatorBetButton(props: Props) {
  const [inProgress, setInProgress] = useState(false)
  const [tickData, setTickData] = useState<GameTickData>()
  const gameContext = useGameContext()
  const gameDataRef = useRef<ICasinoGameDataDto>()

  useEffect(() => {
    const stateSubscription = gameContext.aviatorState$.subscribe(handleEvent)
    const tickSubscription = gameContext.aviatorTick$.subscribe(handleTick)
    return () => {
      stateSubscription.unsubscribe()
      tickSubscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    gameDataRef.current = gameContext.gameData
  }, [gameContext.gameData])

  const handleTick = (data: GameTickData) => {
    setTickData(data)
  }

  const handleEvent = (e: IAviatorEvent) => {
    if (e.type === AviatorEventType.planned) {
      setInProgress(true)
    }

    if (e.type === AviatorEventType.finished) {
      setInProgress(false)
      setTickData(null)
    }
  }

  const earnValue = (inProgress && tickData && gameDataRef.current) ? gameDataRef.current.bet * tickData.factor : 0
  const currency = gameDataRef.current?.currency || gameContext.user?.currency || 'btc'
  const earnValueStr = bitcoin(earnValue, 'btc').to(currency).value().toFixed(currency === 'satoshi' ? 0 : 8)

  return (
    <Button
      disabled={!inProgress}
      className={styles.root}
      size='normal'
      background='blueGradient500'
      type="submit"
      fluid
    >
      {earnValue ? `Забрать ${earnValueStr}` : 'Ставка'}
    </Button>
  )
}

