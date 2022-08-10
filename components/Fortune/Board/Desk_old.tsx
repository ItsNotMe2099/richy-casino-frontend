import { Stage, Layer, Shape } from 'react-konva'
import { colors } from 'scss/variables'
import { IPosition } from 'types/interfaces'
import Converter from 'utils/converter'

interface ISettings {
  numberOfSections: number
  size: number
}

interface Props {
  settings: ISettings
}

export default function Desk(props: Props) {
  return (
    <Stage width={props.settings.size} height={props.settings.size}>
      <Layer>
        <Section angle={0} settings={props.settings} />
      </Layer>
    </Stage>
  )
}

interface SectionProps {
  angle: number
  settings: ISettings
}

function Section(props: SectionProps) {
  const radius = props.settings.size / 2
  const circlePart = 180 / props.settings.numberOfSections
  const firstAngle = props.angle
  const secondAngle = firstAngle + circlePart
  const firstPoint = Converter.angleToPosition(firstAngle, radius)
  const secondPoint = Converter.angleToPosition(secondAngle, radius)
  const center: IPosition = {
    x: radius,
    y: radius,
  }

  return (
    <Shape
      sceneFunc={(ctx, shape) => {
        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(firstPoint.x + center.x, firstPoint.y + center.y)
        ctx.lineTo(secondPoint.x + center.x, secondPoint.y + center.y)
        ctx.closePath()
        ctx.fillStrokeShape(shape)
      }}
      stroke={colors.blue500}
      strokeWidth={1}
    />
  )
}
