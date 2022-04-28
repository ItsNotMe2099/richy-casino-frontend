import { MutableRefObject } from 'react'
import { StateMachineInput } from 'rive-react'
import { IPosition, ISize } from 'types/interfaces'
import { MAX_FACTOR, MAX_TIME, SPEED_EXP, SPEED_LINEAR, THRESHOLD_TIME } from './constants'
import { IAviatorRound } from 'data/interfaces/IAviatorEvent'

export interface GameTickData {
  currentPosition: IPosition
  factor: number
  time: number
}

export interface ISettings{
  roundStatusRef: MutableRefObject<IAviatorRound>
  startTimeRef: MutableRefObject<Date | null>
  inputPlaneRef: MutableRefObject<StateMachineInput>
  size: ISize
  isSmallScreen: boolean
  onProgress: (data: GameTickData) => void
}

export default class Game {
  readonly _settings: ISettings
  _animationId: number
  _paddingHorizontal: number
  _paddingVertical: number
  _innerSize: ISize
  track: IPosition[] = []
  startPosition: IPosition
  currentPosition: IPosition
  factor: number = 0
  time: number = 0
  _planeAlive: boolean = true

  constructor(settings: ISettings) {
    this._settings = settings
    this._paddingHorizontal = settings.size.width / (settings.isSmallScreen ? 6 : 10)
    this._paddingVertical = settings.size.height / 10
    this._innerSize = {
      width: settings.size.width - this._paddingHorizontal * 2,
      height: settings.size.height - this._paddingVertical * 2,
    }
    this.startPosition = {
      x: this._paddingHorizontal,
      y: settings.size.height - this._paddingVertical,
    }
    this.currentPosition = {...this.startPosition}
  }

  start() {
    this.clear()
    this._animationId = requestAnimationFrame(this._animate.bind(this))
  }

  stop() {
    cancelAnimationFrame(this._animationId)
    this._detonatePlane()
  }

  clear() {
    cancelAnimationFrame(this._animationId)
    this.factor = 0
    this.time = 0
    this.track = []
    this.currentPosition = {...this.startPosition}
    if (!this._planeAlive) {
      this._settings.inputPlaneRef.current?.fire()
      this._planeAlive = true
    }
  }

  _getProgressTime(): number {
    return Date.now() - this._settings.startTimeRef.current.getTime()
  }

  _detonatePlane() {
    if (this._planeAlive) {
      this._settings.inputPlaneRef.current?.fire()
      this._planeAlive = false
    }
  }

  _animate() {
    this.time = this._getProgressTime()
    this.factor = this._getFactorByTime(this.time)

    if (this.time <= MAX_TIME && this.factor <= MAX_FACTOR) {
      const effectiveTime = this.time > MAX_TIME ? MAX_TIME : this.time
      const effectiveFactor = this.factor > MAX_FACTOR ? MAX_FACTOR : this.factor
      this.currentPosition = {
        x: this._innerSize.width * (effectiveTime / MAX_TIME) + this._paddingHorizontal,
        y: this._innerSize.height - this._innerSize.height * (effectiveFactor / MAX_FACTOR) + this._paddingVertical,
      }
      this.track.push({...this.currentPosition})
    }
    this._animationId = requestAnimationFrame(this._animate.bind(this))
    this._settings.onProgress({
      factor: this.factor,
      time: this.time,
      currentPosition: {...this.currentPosition},
    })
  }

  // _progressToPosition(progress: number): IPosition {
  //   const rightPadding = this._settings.size.width / 8
  //   const dx = (this._settings.size.width - this.startPosition.x - rightPadding) * progress
  //   const x = this.startPosition.x + dx
  //   const max = Math.log(this.startPosition.y - this.startPosition.y / 2)
  //   const y = this.startPosition.y - Math.exp(max * progress) - dx / 5
  //   return {x, y}
  // }

  _getFactorByTime(time: number): number {
    const threshold = time > THRESHOLD_TIME
    const expTime = threshold ? THRESHOLD_TIME : time
    const linearTime = threshold ? (time - THRESHOLD_TIME) / 1000 * SPEED_LINEAR : 0
    return Math.exp(expTime / 1000 * SPEED_EXP) + linearTime - 1
  }

  _getTimeByFactor(position: number): number {
    const thresholdPosition = this._getFactorByTime(THRESHOLD_TIME)
    if (position > thresholdPosition) {
      return THRESHOLD_TIME + (position - thresholdPosition) * 1000 / SPEED_LINEAR
    } else {
      return Math.log(position + 1) * 1000 / SPEED_EXP
    }
  }
}
