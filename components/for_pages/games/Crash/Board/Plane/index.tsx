import RiveStateMachine from 'components/ui/RiveStateMachine'
import styles from './index.module.scss'
import { MutableRefObject } from 'react'
import { StateMachineInput } from 'rive-react'
import { IPosition } from 'types/interfaces'
import { useAppContext } from 'context/state'

interface Props{
  position: IPosition
  progress: number // form 0 to 1
  inputRef: MutableRefObject<StateMachineInput>
}

export default function Plane(props: Props) {
  const appContext = useAppContext()
  const planeSize: number = appContext.isMobile ? 240 : 300
  const left = props.position.x - planeSize / 2 - 10
  const top = props.position.y - planeSize / 2 - 20
  const startAngle = appContext.isMobile ? 10 : 7
  const maxAngle = appContext.isMobile ? 60 : 40
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
