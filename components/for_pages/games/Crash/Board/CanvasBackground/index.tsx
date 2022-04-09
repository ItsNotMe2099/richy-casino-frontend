import { Stage, Layer, Rect, Line } from 'react-konva'
import { colors } from 'scss/variables'
import { useMemo } from 'react'

interface Props {
  width: number
  height: number
}

export default function CanvasBackground(props: Props) {
  const lineGradient = useMemo((): CanvasGradient => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, props.height, props.width, 0)
    gradient.addColorStop(0, '#2C342E')
    gradient.addColorStop(0.5, '#695B33')
    gradient.addColorStop(1, '#DD4851')
    return gradient
  }, [])

  return (
    <Stage width={props.width} height={props.height}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={4}
          height={props.height}
          fill={colors.dark600}
        />
        <Rect
          x={0}
          y={props.height - 4}
          width={props.width}
          height={4}
          fill={colors.dark600}
        />
        <Line
          points={[
            4, props.height - 6,
            props.width * 0.7, props.height * 0.7,
            props.width - 6, 0,
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

