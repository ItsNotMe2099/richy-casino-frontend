import {
  Engine,
  Render,
  Runner,
  Body,
  World,
  Common,
  Events,
  IEventCollision,
  IEventTimestamped,
} from 'matter-js'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import decomp from 'poly-decomp'
import { COORDS, BUCKET_FACTOR, COLORS } from './constants'
import LabelHelper from './LabelHelper'
import BodyMaker from './BodyMaker'

export interface ISize {
  width: number
  height: number
}

interface IProps {
  element: HTMLDivElement
  size: ISize
  backgroundColor: string
  pegsRows: number
}

export interface ISettings extends IProps{
  pegsColumns: number
  bucketsColumns: number
}

export default class Game {
  _settings: ISettings
  _engine: Engine
  _render: Render
  _pegsGrid: Body[]
  _bucketsRow: Body[]
  _outlines: Body[]
  _runner: Runner
  _plinkoInProgress: boolean
  _plinkoReal: Body
  _plinkoFake: Body
  _bodyMaker: BodyMaker

  constructor(props: IProps) {
    this._settings = {
      ...props,
      pegsColumns: props.pegsRows + 2,
      bucketsColumns: props.pegsRows + 1
    }
    this._bodyMaker = new BodyMaker(this._settings)
    this._engine = Engine.create(props.element)
    this._render = Render.create({
      element: props.element,
      engine: this._engine,
      options: {
        width: props.size.width,
        height: props.size.height,
        showDebug: false,
        wireframes: false,
        background: props.backgroundColor,
      },
    })
    Common.setDecomp(decomp)
    this._pegsGrid = this._bodyMaker.makePegsGrid()
    this._bucketsRow = this._bodyMaker.makeBucketsRow()
    this._outlines = this._bodyMaker.makeOutlines()
  }

  /**
   * Start the game
   */
  start() {
    World.add(this._engine.world, [...this._pegsGrid, ...this._bucketsRow, ...this._outlines])

    this._runner = Runner.run(this._engine)
    Render.run(this._render)
    Events.on(this._engine, 'collisionStart', this._handleCollision.bind(this))
    Events.on(this._render, 'beforeRender', this._beforeRender.bind(this))
    Events.on(this._render, 'afterRender', this._afterRender.bind(this))
  }

  /**
   * Clear the game
   */
  clear() {
    if (this._render) {
      Runner.stop(this._runner)
      Render.stop(this._render)
      this._render.canvas.remove()
      this._render = null
      this._runner = null
    }
  }

  /**
   * Drop a plinko
   */
  dropPlinkoByEvent(e: ICasinoGameFinishEvent) {
    const dx: number = COORDS[e.data.pins][e.data.bucket][Math.floor(Math.random() * COORDS[e.data.pins ][e.data.bucket].length)]
    const x = this._settings.size.width / 2 + dx
    this._plinkoInProgress = true
    this._plinkoReal = this._bodyMaker.makeRealPlinko(x, 0, e.data.id ?? 1)
    this._plinkoFake = this._bodyMaker.makeFakePlinko(x, 0)
    World.add(this._engine.world, [this._plinkoReal, this._plinkoFake])
  }

  /**
   * Before render hook
   */
  _beforeRender(e: IEventTimestamped<Render>): void {
    this._joinPlinkosPositions()
  }

  /**
   * After render hook
   */
  _afterRender(e: IEventTimestamped<Render>): void {
    this._joinPlinkosPositions()
  }

  _handleCollision(e: IEventCollision<Engine>): void {
    e.pairs.forEach(pair => {
      const { bodyA, bodyB } = pair
      if (bodyA != bodyB) {
        if (LabelHelper.isPlinko(bodyA.label) && LabelHelper.isPeg(bodyB.label)) {
          this._pegPlinkoCollision(LabelHelper.getId(bodyB.label), LabelHelper.getId(bodyA.label))
        }
        if (LabelHelper.isPeg(bodyA.label) && LabelHelper.isPlinko(bodyB.label)) {
          this._pegPlinkoCollision(LabelHelper.getId(bodyA.label), LabelHelper.getId(bodyB.label))
        }
        if (LabelHelper.isPlinko(bodyA.label) && LabelHelper.isBucket(bodyB.label)) {
          this._bucketPlinkoCollision(LabelHelper.getId(bodyB.label), LabelHelper.getId(bodyA.label))
        }
        if (LabelHelper.isBucket(bodyA.label) && LabelHelper.isPlinko(bodyB.label)) {
          this._bucketPlinkoCollision(LabelHelper.getId(bodyA.label), LabelHelper.getId(bodyB.label))
        }
      }
    })
  }

  _pegPlinkoCollision(pegId: number, plinkoId: number): void {
    this._coloringPeg(pegId)
  }

  _coloringPeg(id: number) {
    this._pegsGrid.forEach(peg => {
      if (peg.label === LabelHelper.createPegLabel(id)) {
        const size = this._bodyMaker.getBucketSize()
        const sections = Array(this._settings.bucketsColumns).fill(null).map((value, index) => {
          return size.width * BUCKET_FACTOR * index
            + size.width * BUCKET_FACTOR
            + (this._settings.size.width / this._settings.pegsColumns)
        })
        const tmpSection = sections.findIndex(item => item > peg.position.x)
        const section = tmpSection < 0 ? this._settings.bucketsColumns : tmpSection
        const colorId = Math.abs(section - Math.floor(this._settings.bucketsColumns / 2)) + 1
        const max = this._settings.bucketsColumns / 2 / COLORS.length
        const colorIndex = colorId / max
        peg.render.sprite = null
        peg.render.fillStyle = COLORS[Math.round(colorIndex)]
      }
    })
  }

  _bucketPlinkoCollision(bucketId: number, plinkoId: number): void {
    if (this._plinkoInProgress) {
      this._bucketsRow.forEach((body) => {
        if (body.label === LabelHelper.createRealBucketLabel(bucketId) || body.label === LabelHelper.createFakeBucketLabel(bucketId)) {
          Body.translate(body, {x: 0, y: 10})
          this._plinkoReal.restitution = 0
        }
      })
      this._plinkoInProgress = false
    }
  }

  _joinPlinkosPositions() {
    if (this._plinkoReal && this._plinkoFake && (
      this._plinkoReal.position.y != this._plinkoFake.position.y
      || this._plinkoReal.position.x != this._plinkoFake.position.x
    )) {
      this._plinkoFake.position = this._plinkoReal.position
    }
  }
}
