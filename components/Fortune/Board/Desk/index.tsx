import styles from './index.module.scss'
import { ISize } from 'types/interfaces'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import StrokeSvg from './StrokeSvg'
import { IWheelSlot } from 'data/interfaces/IWheel'

interface ISettings {
  size: number
  slots: IWheelSlot[]
}

interface Props {
  settings: ISettings
  inProgress: boolean
  activeSectionIndex: number
}

export default function Desk(props: Props) {
  const rootRef = useRef<HTMLDivElement>()
  const numberOfSections = props.settings.slots.length
  const circlePart = Math.PI * 2 / numberOfSections
  const [stopped, setStopped] = useState(false)
  const finishAngle = circlePart * -props.activeSectionIndex
  const currentAngle = stopped ? finishAngle : 0
  const periodTimeStamp = useRef(0)

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.addEventListener('animationiteration', handleAnimationIteration)
      return () => {
        rootRef.current?.removeEventListener('animationiteration', handleAnimationIteration)
      }
    }
  }, [rootRef.current])

  const handleAnimationIteration = () => {
    if (periodTimeStamp.current) {
      stopFirstAnimation()
    } else {
      periodTimeStamp.current = Date.now()
    }
  }

  const stopFirstAnimation = () => {
    const oneSectionTime = (Date.now() - periodTimeStamp.current) / numberOfSections
    setTimeout(() => {
      setStopped(true)
    }, oneSectionTime * props.activeSectionIndex)
  }

  return (
    <div
      ref={rootRef}
      className={classNames({
        [styles.root]: true,
        [styles.inProgress]: !stopped && props.inProgress,
      })}
      style={{
        width: props.settings.size,
        height: props.settings.size,
        transform: `rotate(${currentAngle}rad)`,
      }}
    >
      {props.settings.slots.map((item, index) => (
        <Section
          key={`${index}${item.winMoneyAmount}`}
          angle={circlePart * index}
          settings={props.settings}
          even={index % 2 === 0}
          text={`${item.winMoneyAmount}`}
          active={stopped && (index === props.activeSectionIndex)}
          numberOfSections={numberOfSections}
        />
      ))}
    </div>
  )
}

interface SectionProps {
  angle: number // rad
  settings: ISettings
  even: boolean
  text: string
  active: boolean
  numberOfSections: number
}

function Section(props: SectionProps) {
  const rootRef = useRef<HTMLDivElement>()
  const [finishStage, setFinishStage] = useState(false)
  const imgAspectRation = 68 / 160
  const outerPadding = 10
  const radius = props.settings.size / 2 - outerPadding
  const imgSize: ISize = {
    height: radius,
    width: radius * imgAspectRation * (16 / props.numberOfSections)
  }
  const color = props.even ? '#FF1B00' : '#1D1E25'
  const transformBase = `rotate(${props.angle}rad)`
  const transformActive = props.active
    ? (finishStage ? 'translateY(-3px) scale(1.1)' : 'translateY(-5px) scale(1.2)')
    : ''

  useEffect(() => {
    const el = rootRef.current
    if (el) {
      el.addEventListener('transitionend', handleTransitionEnd)
      return () => {
        el.removeEventListener('transitionend', handleTransitionEnd)
      }
    }
  }, [rootRef.current])

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName === 'transform') {
      setFinishStage(true)
    }
  }

  return (
    <div
      ref={rootRef}
      className={classNames({
        [styles.section]: true,
        [styles.even]: props.even,
        [styles.active]: props.active,
      })}
      style={{
        left: radius - imgSize.width / 2 + outerPadding,
        top: outerPadding,
        transform: `${transformBase} ${transformActive}`,
        width: imgSize.width,
        height: imgSize.height,
      }}
    >
      <svg className={styles.sectionBackground} viewBox="0 0 68 148" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0.516765 11.7757C-0.341416 7.44158 2.47466 3.21381 6.84264 2.54904C24.8982 -0.198867 43.2674 -0.182833 61.3182 2.59659C65.685 3.26899 68.4937 7.50167 67.6279 11.8343L41.8058 141.061C40.0905 149.645 27.8135 149.634 26.1132 141.047L0.516765 11.7757Z" fill={color} />
      </svg>
      <StrokeSvg className={classNames({
        [styles.stroke]: true,
        [styles.active]: props.active,
      })}/>
      <div className={styles.sectionContent}>
        <img src="/img/Fortune/coin.png" className={styles.sectionIcon} alt=""/>
        <div className={styles.sectionText}>
          {props.text}
        </div>
      </div>
    </div>
  )
}


