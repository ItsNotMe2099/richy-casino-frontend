import { CSSProperties, MutableRefObject, useEffect } from 'react'
import { Rive, StateMachineInput, useRive, useStateMachineInput } from 'rive-react'

export const STATE_MACHINE_NAME = 'State'
export const INPUT_NAME = 'Toggle'

interface Props{
  src: string
  inputRef: MutableRefObject<StateMachineInput>
  className?: string
  riveRef?: MutableRefObject<Rive>
  style?: CSSProperties
}

export default function RiveStateMachine(props: Props) {
  const { RiveComponent, rive } = useRive({
    src: props.src,
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  }, {
    fitCanvasToArtboardHeight: false,
    useDevicePixelRatio: false,
    useOffscreenRenderer: true,
  })

  const stateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  )

  useEffect(() => {
    if (!props.inputRef.current && stateMachineInput) {
      props.inputRef.current = stateMachineInput
      if (props.riveRef) {
        props.riveRef.current = rive
      }
    }
  }, [stateMachineInput])

  return <RiveComponent className={props.className} style={props.style}/>
}
