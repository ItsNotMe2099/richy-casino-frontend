import styles from './index.module.scss'
import { ISize } from 'types/interfaces'
import classNames from 'classnames'

interface ISettings {
  numberOfSections: number
  size: number
}

interface Props {
  settings: ISettings
}

export default function Desk(props: Props) {
  const circlePart = Math.PI * 2 / props.settings.numberOfSections
  const renderSections = (): React.ReactNode[] => {
    const result: React.ReactNode[] = []
    for (let i=0; i<props.settings.numberOfSections; i++) {
      result.push(
        <Section
          key={i}
          angle={circlePart * i}
          settings={props.settings}
          even={i % 2 === 0}
          text={`Секция ${i}`}
        />
      )
    }
    return result
  }

  return (
    <div className={styles.root} style={{ width: props.settings.size, height: props.settings.size }}>
      {renderSections()}
      <img src="/img/Fortune/cursor.svg" alt="" className={styles.cursor}/>
    </div>
  )
}

interface SectionProps {
  angle: number // rad
  settings: ISettings
  even: boolean
  text: string
}

function Section(props: SectionProps) {
  const imgAspectRation = 68 / 160
  const outerPadding = 10
  const radius = props.settings.size / 2 - outerPadding
  const imgSize: ISize = {
    height: radius,
    width: radius * imgAspectRation * (16 / props.settings.numberOfSections)
  }
  const color = props.even ? '#FF1B00' : 'transparent'

  return (
    <div
      className={classNames({
        [styles.section]: true,
        [styles.even]: props.even,
      })}
      style={{
        left: radius - imgSize.width / 2 + outerPadding,
        top: outerPadding,
        transform: `rotate(${props.angle}rad)`,
        width: imgSize.width,
        height: imgSize.height,
      }}
    >
      <svg className={styles.sectionBackground} viewBox="0 0 68 148" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0.516765 11.7757C-0.341416 7.44158 2.47466 3.21381 6.84264 2.54904C24.8982 -0.198867 43.2674 -0.182833 61.3182 2.59659C65.685 3.26899 68.4937 7.50167 67.6279 11.8343L41.8058 141.061C40.0905 149.645 27.8135 149.634 26.1132 141.047L0.516765 11.7757Z" fill={color} />
      </svg>
      <div className={styles.sectionContent}>
        <img src="/img/Fortune/coin.png" className={styles.sectionIcon} alt=""/>
        <div className={styles.sectionText}>
          {props.text}
        </div>
      </div>
    </div>
  )
}

