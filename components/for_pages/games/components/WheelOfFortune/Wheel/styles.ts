import styled from 'styled-components'

import { NonDraggableImage } from 'components/for_pages/games/components/WheelOfFortune/common/styledComponents'

export const RouletteContainer = styled.div`
  position: relative;
  width: 80vw;
  max-width: 450px;
  height: 80vw;
  max-height: 450px;
  object-fit: contain;
  flex-shrink: 0;

  pointer-events: none;
`

export const RotationContainer = styled.div<{
  startRotationDegrees: number
  finalRotationDegrees: number
  startSpinningTime: number
  continueSpinningTime: number
  stopSpinningTime: number
}>`
  position: relative;
  width: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${props => props.startRotationDegrees}deg);

  &.started-spinning {
    animation: spin ${({ startSpinningTime }) => startSpinningTime / 1000}s
        cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running,
      continueSpin ${({ continueSpinningTime }) => continueSpinningTime / 1000}s
        linear ${({ startSpinningTime }) => startSpinningTime / 1000}s 1 normal
        forwards running,
      stopSpin ${({ stopSpinningTime }) => stopSpinningTime / 1000}s
        cubic-bezier(0, 0, 0.35, 1.02)
        ${({ startSpinningTime, continueSpinningTime }) =>
          (startSpinningTime + continueSpinningTime) / 1000}s
        1 normal forwards running;
  }

  @keyframes spin {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => props.startRotationDegrees + 360}deg);
    }
  }
  @keyframes continueSpin {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => props.startRotationDegrees + 360}deg);
    }
  }
  @keyframes stopSpin {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => 1440 + props.finalRotationDegrees}deg);
    }
  }
`

export const RouletteSelectorImage = styled(NonDraggableImage)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -18px;
  z-index: 1;
`
