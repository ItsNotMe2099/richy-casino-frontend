import styles from './index.module.scss'
import { IPosition, ISize } from 'types/interfaces'
import { useEffect, useState } from 'react'
import { IBet } from 'data/interfaces/IAviatorEvent'

interface BetWithTime extends IBet{
  time: number
}

interface Props {
  bet?: IBet
  size: ISize
  time: number
}

export default function FinishedPlayers(props: Props) {
  const [list, setList] = useState<BetWithTime[]>([])
  const maxTime = 3000
  const offsetSpeed = 100
  const startPosition: IPosition = {
    x: 0,
    y: props.size.height / 2,
  }

  useEffect(() => {
    if (props.bet) {
      const exists = list.find(item => item.id === props.bet.id)
      const newUser: BetWithTime = {
        ...props.bet,
        time: props.time,
      }
      if (!exists) {
        setList([...list, newUser])
      }
    }
  }, [props.bet])

  return (
    <div className={styles.root} style={{ width: props.size.width, height: props.size.height }}>
      {list.map((item, index) => {
        const diff = props.time - item.time
        if (diff < maxTime) {
          const progress = diff / maxTime
          return (
            <div
              key={index}
              className={styles.player}
              style={{
                right: startPosition.x,
                top: startPosition.y,
                opacity: 1 - progress,
                transform: `translate(-${offsetSpeed * progress}px, ${offsetSpeed * progress}px)`
              }}
            >
              {item.user.login || `#${item.user.id}`} - {item.betAmount} {item.currency}
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

