import { Stage, Layer, Rect, Line } from 'react-konva'
import { colors } from 'scss/variables'
import { useMemo } from 'react'
import { IPosition, ISize } from 'types/interfaces'

interface Props {
  size: ISize
  position: IPosition
  startPosition: IPosition
}

export default function CanvasBackground(props: Props) {
  const lineGradient = useMemo((): CanvasGradient => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, props.size.height, props.size.width, 0)
    gradient.addColorStop(0, '#2C342E')
    gradient.addColorStop(0.5, '#695B33')
    gradient.addColorStop(1, '#DD4851')
    return gradient
  }, [])

  return (
    <Stage width={props.size.width} height={props.size.height}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={4}
          height={props.size.height}
          fill={colors.dark600}
        />
        <Rect
          x={0}
          y={props.size.height - 4}
          width={props.size.width}
          height={4}
          fill={colors.dark600}
        />
        <Line
          points={[
            0, props.startPosition.y,
            props.position.x, props.position.y,
          ]}
          stroke={lineGradient}
          strokeWidth={4}
          tension={0.5}
          fillAfterStrokeEnabled
        />
      </Layer>
    </Stage>
  )
}

