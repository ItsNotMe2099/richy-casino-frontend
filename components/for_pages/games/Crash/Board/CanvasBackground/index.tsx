import styles from './index.module.scss'
import { Stage, Layer, Rect, Line, Text } from 'react-konva'
import { colors } from 'scss/variables'
import { useMemo } from 'react'
import { IPosition, ISize } from 'types/interfaces'
import Converter from 'utils/converter'
import { MAX_FACTOR, MAX_TIME } from '../constants'

interface Props {
  size: ISize
  track: IPosition[]
  factor: number
  time: number
}

interface IFactorPosition{
  value: number
  dy: number
}

interface ITimePosition{
  value: number
  dx: number
}

export default function CanvasBackground(props: Props) {
  const numberOfMarks = 200
  const numberOfTimes = 100
  const factorParts = 6
  const timeParts = 4
  const factorValue = MAX_FACTOR / factorParts
  const timeValue = MAX_TIME / timeParts
  const spaceVertical = (props.size.height - props.size.height / 15) / factorParts
  const spaceHorizontal = (props.size.width - props.size.width / 15) / timeParts
  const marksFactors: IFactorPosition[] = useMemo(() => {
    const result: IFactorPosition[] = []
    for (let i = 1; i < numberOfMarks; i++) {
      result.push({
        value: factorValue * i,
        dy: props.size.height - spaceVertical * i,
      })
    }
    return result
  }, [])
  const marksTimes: ITimePosition[] = useMemo(() => {
    const result: ITimePosition[] = []
    for (let i = 1; i < numberOfTimes; i++) {
      result.push({
        value: timeValue * i,
        dx: spaceHorizontal * i,
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

  const offsetFactorValue = props.factor > MAX_FACTOR ? props.factor - MAX_FACTOR : 0
  const offsetTimeValue = props.time > MAX_TIME ? props.time - MAX_TIME : 0
  const offsetY = props.size.height / MAX_FACTOR * offsetFactorValue
  const offsetX = props.size.width / MAX_TIME * offsetTimeValue * -1

  return (
    <Stage width={props.size.width} height={props.size.height} className={styles.root}>
      <Layer x={0} y={offsetY}>
        {marksFactors.map(item => (
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
      <Layer x={offsetX} y={0}>
        {marksTimes.map(item => (
          <Text
            key={item.value}
            x={item.dx}
            y={props.size.height - 20}
            text={`${Math.round(item.value / 1000 * 10) / 10}s`}
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
          points={Converter.positionsToPoints(props.track)}
          stroke={lineGradient}
          strokeWidth={4}
          tension={0.1}
          fillAfterStrokeEnabled
        />
      </Layer>
    </Stage>
  )
}

