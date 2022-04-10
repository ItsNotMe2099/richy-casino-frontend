import { STATE_MACHINE_NAME, INPUT_NAME } from './constants'
import { MutableRefObject, useEffect } from 'react'
import { StateMachineInput, useRive, useStateMachineInput } from 'rive-react'

interface Props{
  inputRef: MutableRefObject<StateMachineInput>
  className?: string
}

export default function Rocket(props: Props) {
  const { RiveComponent, rive } = useRive({
    src: '/animations/limbo/rocket.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  })

  const stateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  )

  useEffect(() => {
    if (!props.inputRef.current && stateMachineInput) {
      props.inputRef.current = stateMachineInput
    }
  }, [stateMachineInput])

  return <RiveComponent className={props.className} />
}
