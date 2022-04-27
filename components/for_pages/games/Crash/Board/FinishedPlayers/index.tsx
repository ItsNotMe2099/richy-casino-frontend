import styles from './index.module.scss'
import { IPosition, ISize } from 'types/interfaces'
import { useEffect, useState } from 'react'

interface User {
  name: string,
  value: number
}

interface UserWithTime extends User{
  time: number
}

interface Props {
  user?: User
  size: ISize
  time: number
}

export default function FinishedPlayers(props: Props) {
  const [list, setList] = useState<UserWithTime[]>([])
  const maxTime = 3000
  const offsetSpeed = 100
  const startPosition: IPosition = {
    x: 0,
    y: props.size.height / 2,
  }

  useEffect(() => {
    if (props.user) {
      const exists = list.find(item => item.name === props.user.name)
      const newUser: UserWithTime = {
        ...props.user,
        time: props.time,
      }
      if (!exists) {
        setList([...list, newUser])
      }
    }
  }, [props.user])

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
              {item.name} {item.value}x
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

