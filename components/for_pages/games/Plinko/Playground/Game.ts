import {
  Engine,
  Render,
  Bodies,
  Runner,
  Body,
  World,
  Vector,
  Common,
  Events,
  IEventCollision,
  IEventTimestamped,
  IChamferableBodyDefinition,
} from 'matter-js'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import decomp from 'poly-decomp'
import { COORDS, PLINKO_SIZE_FACTOR } from './constants'
import LabelHelper from './LabelHelper'

interface ISize {
  width: number
  height: number
}

interface IProps {
  element: HTMLDivElement
  size: ISize
  backgroundColor: string
  pegsRows: number
}

interface ISettings extends IProps{
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

  /**
   * For margins between buckets
   */
  _bucketFactor = 1.08

  constructor(props: IProps) {
    this._settings = {
      ...props,
      pegsColumns: props.pegsRows + 2,
      bucketsColumns: props.pegsRows + 1
    }
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
    this._pegsGrid = this._makePegsGrid()
    this._bucketsRow = this._makeBucketsRow()
    this._outlines = this._makeOutlines()
  }

  /**
   * Start the game
   */
  start() {
    World.add(this._engine.world, [...this._pegsGrid, ...this._bucketsRow, ...this._outlines])

    this._runner = Runner.run(this._engine)
    Render.run(this._render)
    Events.on(this._engine, 'collisionStart', this._handleCollision.bind(this));
    Events.on(this._render, 'beforeRender', this._beforeRender.bind(this));
    Events.on(this._render, 'afterRender', this._afterRender.bind(this));
  }

  /**
   * Clear the game
   */
  clear() {
    Runner.stop(this._runner)
    Render.stop(this._render)
    this._render.canvas.remove()
    this._render = null
    this._runner = null
  }

  /**
   * Drop a plinko
   */
  dropPlinkoByEvent(e: ICasinoGameFinishEvent) {
    const dx: number = COORDS[e.data.pins][e.data.bucket][Math.floor(Math.random() * COORDS[e.data.pins ][e.data.bucket].length)]
    const x = this._settings.size.width / 2 + dx
    this._plinkoInProgress = true
    this._plinkoReal = this._makeRealPlinko(x, 0, e.data.id ?? 1)
    this._plinkoFake = this._makeFakePlinko(x, 0)
    World.add(this._engine.world, [this._plinkoReal, this._plinkoFake])
  }

  /**
   * Before render hook
   */
  _beforeRender(e: IEventTimestamped<Render>): void {
    this._joinPlinksPositions()
  }

  /**
   * After render hook
   */
  _afterRender(e: IEventTimestamped<Render>): void {
    this._joinPlinksPositions()
  }

  _getPegRadius(): number {
    return (this._settings.pegsRows - 3)
      / ((this._settings.pegsRows - 7) / 2)
      * (this._settings.size.width / this._settings.size.height)
  }

  _makePeg(x: number, y: number, id: number): Body {
    const radius = this._getPegRadius()
    return Bodies.circle(x, y, radius, {
      isStatic: true,
      render: {
        sprite: {
          texture: '/img/Games/plinko/peg/peg.png',
          xScale: radius * 2 / 28,
          yScale: radius * 2 / 28,
        },
      },
      label: LabelHelper.createPegLabel(id)
    })
  }

  _makeRealPlinko(x: number, y: number, id: number): Body {
    const radius = this._getPegRadius() * PLINKO_SIZE_FACTOR
    return Bodies.circle(x, y, radius, {
      restitution: 0.8,
      render: {
        visible: false,
        // fillStyle: `hsl(${Math.floor(360 * Math.random())}, 90%, 60%)`,
      },
      label: LabelHelper.createPlinkoLabel(id),
    })
  }

  _makeFakePlinko(x: number, y: number): Body {
    const radius = this._getPegRadius() * PLINKO_SIZE_FACTOR
    return Bodies.circle(x, y, radius, {
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: '/img/Games/plinko/plinko/plinko.png',
          xScale: radius * 2 / 44,
          yScale: radius * 2 / 44,
        },
      },
      label: 'shadow',
    })
  }

  _makePegsGrid(): Body[] {
    const center = this._settings.size.width / this._settings.pegsColumns / 2
    const grid = Array(this._settings.pegsRows).fill(null).map(
      (value, rowIndex) => {
        const y = (this._settings.size.width - 2 * center) / this._settings.pegsColumns
        const h = (this._settings.size.height - 40) / this._settings.pegsRows
        const n = y * (this._settings.pegsRows - rowIndex - 1) / 2
        return Array(rowIndex + 3).fill(null).map((valueInner, indexInner) =>
          this._makePeg(center + y * indexInner + y / 2 + n, h * rowIndex + h / 2, rowIndex * (indexInner + 1))
        )
      }
    )
    return grid.reduce((acc, curr) => [...acc, ...curr], [])
  }

  _makeRealBucket(x: number, y: number, id: number): Body {
    const size = this._getBucketSize()
    return Bodies.fromVertices(x, y, [
      [
        Vector.create(0, 0),
        Vector.create(size.width / 2.4, size.height / 5),
        Vector.create(size.width - size.width / 2.4, size.height / 5),
        Vector.create(size.width, 0),
        Vector.create(size.width, size.height),
        Vector.create(0, size.height),
      ],
    ], {
      isStatic: true,
      render: {
        visible: false,
        fillStyle: `hsl(${Math.floor(360 * Math.random())}, 90%, 60%)`,
      },
      label: LabelHelper.createRealBucketLabel(id)
    })
  }

  _makeFakeBucket(x: number, y: number, id: number): Body {
    const size = this._getBucketSize()
    const imageId = Math.abs(id - Math.floor(this._settings.bucketsColumns / 2)) + 1
    return Bodies.rectangle(x, y, size.width, size.height, {
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: `/img/Games/plinko/buckets/bucket_long_${imageId}.png`,
          xScale: size.width / 84,
          yScale: size.width / 84,
        },
      },
      label: LabelHelper.createFakeBucketLabel(id)
    })
  }

  _makeOutlines(): Body[] {
    const onePegWidth = this._settings.size.width / this._settings.pegsColumns
    const pegRadius = this._getPegRadius()
    const options: IChamferableBodyDefinition = {
      isStatic: true,
      render: {
        visible: false,
        // fillStyle: '#ffffff',
      }
    }
    const leftSide = Bodies.rectangle(
      onePegWidth - pegRadius,
      this._settings.size.height / 2,
      1,
      this._settings.size.height,
      options
    )
    const rightSide = Bodies.rectangle(
      this._settings.size.width - onePegWidth + pegRadius,
      this._settings.size.height / 2,
      1,
      this._settings.size.height,
      options
    )
    return [leftSide, rightSide]
  }

  _getBucketSize(): ISize {
    const onePegWidth = this._settings.size.width / this._settings.pegsColumns
    const widthRow = this._settings.size.width - onePegWidth
    const width = widthRow / this._settings.pegsColumns
    const aspectRatio = 1.29
    return {
      width: width / this._bucketFactor,
      height: width / aspectRatio / this._bucketFactor,
    }
  }

  _makeBucketsRow(): Body[] {
    const size = this._getBucketSize()
    const arrs = Array(this._settings.bucketsColumns).fill(null).map((value, index) => {
      const x = size.width * this._bucketFactor * index
        + size.width * this._bucketFactor
        + (this._settings.size.width / this._settings.pegsColumns / 2)
      return [
        this._makeRealBucket(x, this._settings.size.height - size.height / 2, index),
        this._makeFakeBucket(x, this._settings.size.height - size.height / 2, index)
      ]
    })
    return arrs.reduce((acc, curr) => [...acc, ...curr], [])
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
    // peg collision
  }

  _bucketPlinkoCollision(bucketId: number, plinkoId: number): void {
    if (this._plinkoInProgress) {
      this._bucketsRow.forEach((body) => {
        if (body.label === LabelHelper.createRealBucketLabel(bucketId) || body.label === LabelHelper.createFakeBucketLabel(bucketId)) {
          Body.translate(body, {x: 0, y: 10})
          this._plinkoReal.restitution = 0;
        }
      })
      this._plinkoInProgress = false
    }
  }

  _joinPlinksPositions() {
    if (this._plinkoReal && this._plinkoFake && (
      this._plinkoReal.position.y != this._plinkoFake.position.y
      || this._plinkoReal.position.x != this._plinkoFake.position.x
    )) {
      this._plinkoFake.position = this._plinkoReal.position
    }
  }
}
