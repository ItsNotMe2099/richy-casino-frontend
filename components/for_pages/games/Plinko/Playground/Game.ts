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
  Vector,
} from 'matter-js'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import decomp from 'poly-decomp'
import { COORDS, BUCKET_FACTOR, COLORS, BUCKETS_INDEXES, CANVAS_ASPECT_RATIO } from './constants'
import LabelHelper from './LabelHelper'
import BodyMaker from './BodyMaker'

export interface ISize {
  width: number
  height: number
}

interface IProps {
  element: HTMLDivElement
  width: number
  pegsRows: number
  multiplier: number[]
  backgroundColor?: string
}

export interface ISettings extends IProps{
  pegsColumns: number
  bucketsColumns: number
  size: ISize
  isVerticalBucket: boolean
}

export default class Game {
  _settings: ISettings
  _engine: Engine
  _render: Render
  _pegsGrid: Body[]
  _bucketsRow: Body[]
  _outlines: Body[]
  _backgrounds: Body[]
  _runner: Runner
  _plinkoInProgress: boolean
  _plinkoReal: Body
  _plinkoFake: Body
  _bodyMaker: BodyMaker

  constructor(props: IProps) {
    const isVerticalBucket = props.pegsRows > 14
    this._settings = {
      ...props,
      size: {
        width: props.width,
        height: props.width / CANVAS_ASPECT_RATIO,
      },
      pegsColumns: props.pegsRows + 2,
      bucketsColumns: props.pegsRows + 1,
      isVerticalBucket: isVerticalBucket,
    }
    this._bodyMaker = new BodyMaker(this._settings)
    this._engine = Engine.create(props.element)
    this._render = Render.create({
      element: props.element,
      engine: this._engine,
      options: {
        width: this._settings.size.width,
        height: this._settings.size.height,
        showDebug: false,
        wireframes: false,
        background: props.backgroundColor,
      },
    })
    Common.setDecomp(decomp)
    this._pegsGrid = this._bodyMaker.makePegsGrid()
    this._bucketsRow = this._bodyMaker.makeBucketsRow()
    this._outlines = this._bodyMaker.makeOutlines()
    this._backgrounds = this._bodyMaker.makeBackgrounds()
  }

  /**
   * Start the game
   */
  start() {
    World.add(
      this._engine.world,
      [...this._backgrounds, ...this._pegsGrid, ...this._bucketsRow, ...this._outlines]
    )

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
    const index = e.data.bucket + 1
    const dx: number = COORDS[e.data.pins][index][Math.floor(Math.random() * COORDS[e.data.pins][index].length)]
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
    this._mergePlinkosPositions()
  }

  /**
   * After render hook
   */
  _afterRender(e: IEventTimestamped<Render>): void {
    this._mergePlinkosPositions()
    this._renderBucketsText()
  }

  _renderBucketsText(): void {
    this._bucketsRow.forEach(body => {
      if (LabelHelper.isFakeBucket(body.label)) {
        const id = LabelHelper.getId(body.label)
        const width = body.bounds.max.x - body.bounds.min.x
        const height = body.bounds.max.y - body.bounds.min.y
        const extraOffsetY = height / 7
        const center = Vector.create(body.bounds.min.x + width / 2, body.bounds.min.y + height / 2 + extraOffsetY)
        const ctx = this._render.context
        ctx.font = 'bold 12px Gilroy'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.fillText(`${this._settings.multiplier[id]}x`, center.x, center.y)
      }
    })
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
        const section = tmpSection < 0 ? 0 : tmpSection
        const indexes = BUCKETS_INDEXES[this._settings.pegsRows]
        peg.render.sprite = null
        peg.render.fillStyle = COLORS[indexes[section]]
      }
    })
  }

  _bucketPlinkoCollision(bucketId: number, plinkoId: number): void {
    if (this._plinkoInProgress) {
      this._bucketsRow.forEach((body) => {
        if (body.label === LabelHelper.createRealBucketLabel(bucketId) || body.label === LabelHelper.createFakeBucketLabel(bucketId)) {
          Body.translate(body, {x: 0, y: this._bodyMaker.bucketShiftSize})
          this._plinkoReal.restitution = 0
          this._plinkoReal.inertia = 1
        }
      })
      this._plinkoInProgress = false
    }
  }

  _mergePlinkosPositions() {
    if (this._plinkoReal && this._plinkoFake && (
      this._plinkoReal.position.y != this._plinkoFake.position.y
      || this._plinkoReal.position.x != this._plinkoFake.position.x
    )) {
      this._plinkoFake.position = this._plinkoReal.position
    }
  }
}
