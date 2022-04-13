import { MutableRefObject } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { StateMachineInput } from 'rive-react'
import { EventData } from 'components/for_pages/games/Limbo/Board/Game'
import { IPosition, ISize } from 'types/interfaces'

export interface ISettings{
  resultRef: MutableRefObject<ICasinoGameFinishEvent<EventData>>
  inputPlaneRef: MutableRefObject<StateMachineInput>
  size: ISize
  onProgress: (position: IPosition, progress: number) => void
}

export default class Game {
  readonly _speed: number = 0.002
  readonly _settings: ISettings
  readonly startPosition: IPosition
  _animationId: number
  track: IPosition[] = []
  position: IPosition
  progress: number = 0 // from 0 to 1

  constructor(settings: ISettings) {
    this._settings = settings
    this.startPosition = {
      x: settings.size.width / 15,
      y: settings.size.height - settings.size.height / 15,
    }
    this.position = this.startPosition
  }

  start() {
    this.progress = 0
    this.track = []
    this._animationId = requestAnimationFrame(this._animate.bind(this))
  }

  _animate() {
    this.progress += this._speed
    this.position = this._progressToPosition(this.progress)
    if (this.progress < 1) {
      this.track.push(this.position)
      this._animationId = requestAnimationFrame(this._animate.bind(this))
      this._settings.onProgress(this.position, this.progress)
    } else {
      cancelAnimationFrame(this._animationId)
      this._settings.inputPlaneRef.current.fire()
    }
  }

  _progressToPosition(progress: number): IPosition {
    const x = this.startPosition.x + (this._settings.size.width - this.startPosition.x) * progress
    const max = Math.log(this.startPosition.y - this.startPosition.y / 6)
    const y = this.startPosition.y - Math.exp(max * progress)
    return {x, y}
  }
}
