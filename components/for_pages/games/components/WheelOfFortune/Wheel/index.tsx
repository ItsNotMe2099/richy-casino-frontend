import React, { useState, useEffect, useRef } from 'react'

import { getRotationDegrees } from 'components/for_pages/games/components/WheelOfFortune/utils'
import {
  RouletteContainer,
  RouletteSelectorImage,
  RotationContainer,
} from 'components/for_pages/games/components/WheelOfFortune/Wheel/styles'
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_TEXT_COLORS,
  DEFAULT_OUTER_BORDER_COLOR,
  DEFAULT_OUTER_BORDER_WIDTH,
  DEFAULT_INNER_RADIUS,
  DEFAULT_INNER_BORDER_COLOR,
  DEFAULT_INNER_BORDER_WIDTH,
  DEFAULT_RADIUS_LINE_COLOR,
  DEFAULT_RADIUS_LINE_WIDTH,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_DISTANCE,
  DEFAULT_SPIN_DURATION,
} from 'components/for_pages/games/components/WheelOfFortune/strings'
import { WheelData } from 'components/for_pages/games/components/WheelOfFortune/Wheel/types'
import WheelCanvas from 'components/for_pages/games/components/WheelOfFortune/WheelCanvas'

interface Props {
  mustStartSpinning: boolean;
  prizeNumber: number;
  data: WheelData[];
  onStopSpinning?: () => any;
  onStartSpinning?: (duration: number) => any;
  backgroundColors?: string[];
  textColors?: string[];
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerRadius?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  fontSize?: number;
  perpendicularText?: boolean;
  textDistance?: number;
  spinDuration?: number;
}

const STARTED_SPINNING = 'started-spinning'

const START_SPINNING_TIME = 750
const CONTINUE_SPINNING_TIME = 750
const STOP_SPINNING_TIME = 5000

export const Wheel = ({
                        mustStartSpinning,
                        prizeNumber,
                        data,
                        onStopSpinning = () => null,
                        onStartSpinning = () => null,
                        backgroundColors = DEFAULT_BACKGROUND_COLORS,
                        textColors = DEFAULT_TEXT_COLORS,
                        outerBorderColor = DEFAULT_OUTER_BORDER_COLOR,
                        outerBorderWidth = DEFAULT_OUTER_BORDER_WIDTH,
                        innerRadius = DEFAULT_INNER_RADIUS,
                        innerBorderColor = DEFAULT_INNER_BORDER_COLOR,
                        innerBorderWidth = DEFAULT_INNER_BORDER_WIDTH,
                        radiusLineColor = DEFAULT_RADIUS_LINE_COLOR,
                        radiusLineWidth = DEFAULT_RADIUS_LINE_WIDTH,
                        fontSize = DEFAULT_FONT_SIZE,
                        perpendicularText = false,
                        textDistance = DEFAULT_TEXT_DISTANCE,
                        spinDuration = DEFAULT_SPIN_DURATION,
                      }: Props): JSX.Element | null => {
  const [wheelData, setWheelData] = useState<WheelData[]>([...data])
  const [startRotationDegrees, setStartRotationDegrees] = useState(0)
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0)
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false)
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false)
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false)
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const normalizedSpinDuration = Math.max(0.01, spinDuration)

  const startSpinningTime = START_SPINNING_TIME * normalizedSpinDuration
  const continueSpinningTime = CONTINUE_SPINNING_TIME * normalizedSpinDuration
  const stopSpinningTime = STOP_SPINNING_TIME * normalizedSpinDuration

  const totalSpinningTime =
    startSpinningTime + continueSpinningTime + stopSpinningTime

  const mustStopSpinning = useRef<boolean>(false)

  useEffect(() => {
    const dataLength = data.length
    const wheelDataAux = [{ option: '' }] as WheelData[]
    for (let i = 0; i < dataLength; i++) {
      wheelDataAux[i] = {
        ...data[i],
        style: {
          backgroundColor:
            data[i].style?.backgroundColor ||
            backgroundColors[i % backgroundColors.length],
          textColor:
            data[i].style?.textColor || textColors[i % textColors.length],
        },
      }
    }
    setWheelData([...wheelDataAux])
    setIsDataUpdated(true)
  }, [data, backgroundColors, textColors])

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true)
      startSpinning()

      const finalRotationDegreesCalculated = getRotationDegrees(
        prizeNumber,
        data.length
      )
      setFinalRotationDegrees(finalRotationDegreesCalculated)
    }
  }, [mustStartSpinning])

  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false)
      setStartRotationDegrees(finalRotationDegrees)
    }
  }, [hasStoppedSpinning])

  const startSpinning = () => {
    setHasStartedSpinning(true)
    setHasStoppedSpinning(false)
    mustStopSpinning.current = true
    onStartSpinning(totalSpinningTime)
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false
        setHasStartedSpinning(false)
        setHasStoppedSpinning(true)
        onStopSpinning()
      }
    }, totalSpinningTime)
  }

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING
    }
    return ''
  }

  if (!isDataUpdated) {
    return null
  }
  return (
    <RouletteContainer>
      <RotationContainer
        className={getRouletteClass()}
        startSpinningTime={startSpinningTime}
        continueSpinningTime={continueSpinningTime}
        stopSpinningTime={stopSpinningTime}
        startRotationDegrees={startRotationDegrees}
        finalRotationDegrees={finalRotationDegrees}
      >
        <WheelCanvas
          width="900"
          height="900"
          data={wheelData}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          fontSize={fontSize}
          perpendicularText={perpendicularText}
          textDistance={textDistance}
        />
      </RotationContainer>
      <RouletteSelectorImage src={'/img/Games/wheel/selector.svg'} alt="roulette-static" />
    </RouletteContainer>
  )
}
