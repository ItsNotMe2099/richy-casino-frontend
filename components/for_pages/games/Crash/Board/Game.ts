import { MutableRefObject } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { StateMachineInput } from 'rive-react'
import { EventData } from 'components/for_pages/games/Limbo/Board/Game'
import { IPosition, ISize } from 'types/interfaces'
import { MAX_FACTOR, ANIMATION_SPEED } from './constants'

export interface GameTickData {
  planePosition: IPosition
  progress: number
  factor: number
}

export interface ISettings{
  resultRef: MutableRefObject<ICasinoGameFinishEvent<EventData>>
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
    this._settings.inputPlaneRef.current.fire()
  }

  _animate() {
    this.progress += ANIMATION_SPEED
    this.factor = this._progressToFactor(this.progress)
    this.planePosition = this._progressToPosition(this.progress > 1 ? 1 : this.progress)
    if (this.progress <= 1) {
      this.track.push(this.planePosition)
    }
    this._animationId = requestAnimationFrame(this._animate.bind(this))
    this._settings.onProgress({
      planePosition: this.planePosition,
      progress: this.progress,
      factor: this.factor,
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

  _progressToFactor(progress: number): number {
    return Math.round(MAX_FACTOR * progress * 100) / 100
  }
}
