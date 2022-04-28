import RiveStateMachine from 'components/ui/RiveStateMachine'
import styles from './index.module.scss'
import { MutableRefObject } from 'react'
import { StateMachineInput } from 'rive-react'
import { IPosition } from 'types/interfaces'

interface Props{
  position: IPosition
  progress: number // form 0 to 1
  inputRef: MutableRefObject<StateMachineInput>
  isSmallScreen: boolean
}

export default function Plane(props: Props) {
  const planeSize: number = props.isSmallScreen ? 240 : 300
  const left = props.position.x - planeSize / 2 - 10
  const top = props.position.y - planeSize / 2 - 20
  const startAngle = props.isSmallScreen ? 20 : 7
  const maxAngle = props.isSmallScreen ? 50 : 40
  const angle = maxAngle * props.progress + startAngle

  return (
    <div className={styles.root} style={{left, top, transform: `rotate(-${angle}deg)`}}>
      <RiveStateMachine
        src="/animations/crash/plane.riv"
        inputRef={props.inputRef}
        style={{width: planeSize, height: planeSize}}
      />
    </div>
  )
}
