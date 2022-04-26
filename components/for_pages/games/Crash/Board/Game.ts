import { MutableRefObject } from 'react'
import { StateMachineInput } from 'rive-react'
import { IPosition, ISize } from 'types/interfaces'
import { MAX_FACTOR, SPEED_EXP, SPEED_LINEAR, THRESHOLD_TIME } from './constants'
import { IAviatorRound } from 'data/interfaces/IAviatorEvent'

export interface GameTickData {
  planePosition: IPosition
  progress: number
  factor: number
  time: number
}

export interface ISettings{
  roundStatusRef: MutableRefObject<IAviatorRound>
  startTimeRef: MutableRefObject<Date | null>
  inputPlaneRef: MutableRefObject<StateMachineInput>
  size: ISize
  onProgress: (data: GameTickData) => void
}

export default class Game {
  readonly _settings: ISettings
  readonly startPosition: IPosition
  _animationId: number
  track: IPosition[] = []
  planePosition: IPosition
  progress: number = 0 // from 0 to 1 and more
  factor: number
  _planeAlive: boolean = true
  get _progressTime(): number {
    return Date.now() - this._settings.startTimeRef.current.getTime()
  }

  constructor(settings: ISettings) {
    this._settings = settings
    this.startPosition = {
      x: settings.size.width / 10,
      y: settings.size.height - settings.size.height / 13,
    }
    this.planePosition = this.startPosition
  }

  start() {
    this.progress = 0
    this.track = []
    this._animationId = requestAnimationFrame(this._animate.bind(this))
  }

  stop() {
    cancelAnimationFrame(this._animationId)
    this._detonatePlane()
  }

  clear() {
    cancelAnimationFrame(this._animationId)
    this.progress = 0
    this.track = []
    this.planePosition = this.startPosition
    if (!this._planeAlive) {
      this._settings.inputPlaneRef.current.fire()
      this._planeAlive = true
    }
  }

  _detonatePlane() {
    if (this._planeAlive) {
      this._settings.inputPlaneRef.current.fire()
      this._planeAlive = false
    }
  }

  _animate() {
    this.factor = this._getFactorByTime(this._progressTime)
    this.progress = this.factor / MAX_FACTOR
    this.planePosition = this._progressToPosition(this.progress > 1 ? 1 : this.progress)
    if (this.progress <= 1) {
      this.track.push(this.planePosition)
    }
    this._animationId = requestAnimationFrame(this._animate.bind(this))
    this._settings.onProgress({
      planePosition: this.planePosition,
      progress: this.progress,
      factor: this.factor,
      time: this._progressTime,
    })
  }

  _progressToPosition(progress: number): IPosition {
    const rightPadding = this._settings.size.width / 8
    const dx = (this._settings.size.width - this.startPosition.x - rightPadding) * progress
    const x = this.startPosition.x + dx
    const max = Math.log(this.startPosition.y - this.startPosition.y / 2)
    const y = this.startPosition.y - Math.exp(max * progress) - dx / 5
    return {x, y}
  }

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
