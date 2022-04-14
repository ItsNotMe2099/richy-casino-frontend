import RiveStateMachine from 'components/ui/RiveStateMachine'
import styles from './index.module.scss'
import { MutableRefObject } from 'react'
import { StateMachineInput } from 'rive-react'
import { IPosition } from 'types/interfaces'
import { useAppContext } from 'context/state'

interface Props{
  inputRef: MutableRefObject<StateMachineInput>
  planePosition: IPosition
  progress: number // from 0 to 1
}

export default function Plane(props: Props) {
  const appContext = useAppContext()
  const planeSize: number = appContext.isMobile ? 240 : 300
  const left = props.planePosition.x - planeSize / 2 - 10
  const top = props.planePosition.y - planeSize / 2 - 20
  const startAngle = 5
  const maxAngle = (appContext.isMobile ? 70 : 60) - startAngle
  const angle = maxAngle / 2 * props.progress + Math.exp(Math.log(maxAngle / 2) * props.progress) + startAngle

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
