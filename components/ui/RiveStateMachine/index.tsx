import { MutableRefObject, useEffect } from 'react'
import { StateMachineInput, useRive, useStateMachineInput } from 'rive-react'

export const STATE_MACHINE_NAME = 'State'
export const INPUT_NAME = 'Toggle'

interface Props{
  src: string
  inputRef: MutableRefObject<StateMachineInput>
  className?: string
}

export default function RiveStateMachine(props: Props) {
  const { RiveComponent, rive } = useRive({
    src: props.src,
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
