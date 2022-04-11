import RiveStateMachine from 'components/ui/RiveStateMachine'
import styles from './index.module.scss'
import { MutableRefObject } from 'react'
import { StateMachineInput } from 'rive-react'
import { IPosition } from 'types/interfaces'

interface Props{
  inputRef: MutableRefObject<StateMachineInput>
  position: IPosition
  progress: number
}

export default function Plane(props: Props) {
  const left = props.position.x - 150
  const top = props.position.y - 175
  const maxAngle = Math.log(80)

  return (
    <div className={styles.root} style={{left, top, transform: `rotate(-${Math.exp(maxAngle * props.progress)}deg)` }}>
      <RiveStateMachine
        src="/animations/crash/plane.riv"
        inputRef={props.inputRef}
        className={styles.plane}
      />
    </div>
  )
}
