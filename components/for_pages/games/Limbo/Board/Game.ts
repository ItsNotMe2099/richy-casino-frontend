import { MutableRefObject } from 'react'
import { StateMachineInput } from 'rive-react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'

const STAGE_TIME = 2000

export enum GameStage {
  idle,
  inProgress,
  finish,
}

export interface EventData {
  target: number
  number: number
}

export interface ISettings{
  resultRef: MutableRefObject<ICasinoGameFinishEvent<EventData>>
  inputRocketRef: MutableRefObject<StateMachineInput>
  inputPlanetsRef: MutableRefObject<StateMachineInput>
  onStageChanged: (stage: GameStage) => void
  onTick: (stage: GameStage, progress: number) => void
}

export default class Game {
  _settings: ISettings
  _interval: NodeJS.Timer
  _counterMs: number = 0
  stage: GameStage = GameStage.idle

  constructor(settings: ISettings) {
    this._settings = settings
  }

  start() {
    if (this.stage !== GameStage.idle) {
      this.clear()
    }
    this._next()
    this._interval = setInterval(() => {
      if (this._counterMs > 0) {
        this._counterMs -= 100
        this._settings.onTick(this.stage, (STAGE_TIME - this._counterMs) / STAGE_TIME)
      } else {
        if (this.stage === GameStage.idle) {
          this.clear()
        } else {
          this._next()
        }
      }
    }, 100)
  }

  clear() {
    this.stage = GameStage.idle
    if (this._interval) {
      clearInterval(this._interval)
    }
  }

  _next() {
    switch (this.stage) {
      case GameStage.idle:
        this._setStage(GameStage.inProgress)
        this._settings.inputPlanetsRef.current.fire()
        break
      case GameStage.inProgress:
        this._setStage(GameStage.finish)
        if (!this._settings.resultRef.current.win) {
          this._settings.inputRocketRef.current.fire()
        }
        break
      case GameStage.finish:
        this._setStage(GameStage.idle)
        this._settings.inputPlanetsRef.current.fire()
        if (!this._settings.resultRef.current.win) {
          this._settings.inputRocketRef.current.fire()
        }
        break
    }
  }

  _setStage(stage: GameStage) {
    this.stage = stage
    this._counterMs = STAGE_TIME
    this._settings.onStageChanged(this.stage)
  }
}
