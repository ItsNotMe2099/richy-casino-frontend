import styles from './index.module.scss'
import { Stage, Layer, Rect, Line, Text } from 'react-konva'
import { colors } from 'scss/variables'
import { useEffect, useMemo, useRef } from 'react'
import { IPosition, ISize } from 'types/interfaces'
import { positionsToPoints } from 'utils/converter'
import { MAX_FACTOR, ANIMATION_SPEED } from '../constants'
import konva from 'konva'

interface Props {
  size: ISize
  planePosition: IPosition
  startPosition: IPosition
  track: IPosition[]
  factor: number
  progress: number
}

interface IFactorPosition{
  value: number
  dy: number
}

export default function CanvasBackground(props: Props) {
  const factorCounts = 100
  const parts = 6
  const factorValue = MAX_FACTOR / parts
  const spaceValue = (props.size.height - props.size.height / 15) / parts
  const textLayerRef = useRef<konva.Layer>()
  const backgroundAnimatedRef = useRef<boolean>(false)
  const factors: IFactorPosition[] = useMemo(() => {
    const result: IFactorPosition[] = []
    for (let i=1; i<factorCounts; i++) {
      result.push({
        value: factorValue * i,
        dy: props.size.height - spaceValue * i,
      })
    }
    return result
  }, [])
  const lineGradient = useMemo((): CanvasGradient => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, props.size.height, props.size.width, 0)
    gradient.addColorStop(0, '#1D1E25')
    gradient.addColorStop(0.1, '#1D1E25')
    gradient.addColorStop(0.3, '#2C342E')
    gradient.addColorStop(0.6, '#695B33')
    gradient.addColorStop(1, '#DD4851')
    return gradient
  }, [])

  useEffect(() => {
    if (props.progress > 1 && !backgroundAnimatedRef.current) {
      backgroundAnimatedRef.current = true
      textLayerRef.current.to({
        y: spaceValue * factorCounts,
        duration: ANIMATION_SPEED * 300 * factorCounts,
      })
    }
  }, [props.progress])

  return (
    <Stage width={props.size.width} height={props.size.height} className={styles.root}>
      <Layer ref={textLayerRef as any}>
        {factors.map(item => (
          <Text
            key={item.value}
            x={15}
            y={item.dy}
            text={`${item.value}x`}
            fontStyle="bold"
            fontSize={14}
            fontFamily="Gilroy"
            fill={colors.dark200}
          />
        ))}
      </Layer>
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
          points={positionsToPoints(props.track)}
          stroke={lineGradient}
          strokeWidth={4}
          tension={0.1}
          fillAfterStrokeEnabled
        />
      </Layer>
    </Stage>
  )
}

