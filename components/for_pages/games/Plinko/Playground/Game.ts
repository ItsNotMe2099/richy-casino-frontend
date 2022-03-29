import { Engine, Render, Bodies, Runner, Body, World } from 'matter-js'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { coords } from './constants'

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
}

export default class Game {
  _settings: ISettings
  _engine: Engine
  _render: Render
  _pegsGrid: Body[]
  _bucketsRow: Body[]
  _runner: Runner

  /**
   * For margins between buckets
   */
  _bucketFactor = 1.08

  constructor(props: IProps) {
    this._settings = {
      ...props,
      pegsColumns: props.pegsRows + 2,
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
    });
    this._pegsGrid = this._makePegsGrid()
    this._bucketsRow = this._makeBucketsRow()
  }

  /**
   * Start the game
   */
  start() {
    World.add(this._engine.world, [...this._pegsGrid, ...this._bucketsRow])

    this._runner = Runner.run(this._engine)
    Render.run(this._render)
  }

  /**
   * Stop the game
   */
  stop() {
    Runner.stop(this._runner)
  }

  /**
   * Drop a plinko
   */
  dropPlinkoByEvent(e: ICasinoGameFinishEvent) {
    const dx: number = coords[e.data.pins][e.data.bucket][Math.floor(Math.random() * coords[e.data.pins ][e.data.bucket].length)]
    const x = this._settings.size.width / 2 + dx
    World.add(this._engine.world, this._makePlinko(x, 0, e.data.id))
  }

  _getCircleRadius(): number {
    return (this._settings.pegsRows - 3)
      / ((this._settings.pegsRows - 7) / 2)
      * (this._settings.size.width / this._settings.size.height)
  }

  _makePeg(x: number, y: number): Body {
    return Bodies.circle(x, y, this._getCircleRadius(), {
      isStatic: true,
      render: {
        sprite: {
          texture: '/img/Games/plinko/ball_without_shadow.png',
          xScale: 1,
          yScale: 1,
        },
      },
      label: 'peg'
    })
  }

  _makePlinko(x: number, y: number, id: number): Body {
    return Bodies.circle(x, y, this._getCircleRadius(), {
      restitution: 0.8,
      render: {
        fillStyle: `hsl(${Math.floor(360 * Math.random())}, 90%, 60%)`,
      },
      label: `plinko-${id}`,
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
          this._makePeg(center + y * indexInner + y / 2 + n, h * rowIndex + h / 2)
        )
      }
    )
    return grid.reduce((acc, curr) => [...acc, ...curr], []);
  }

  _makeBucket(x: number, y: number, id: number): Body {
    const size = this._getBucketSize()
    return Bodies.rectangle(x, y, size.width, size.height, {
      isStatic: true,
      density: 1,
      render: {
        sprite: {
          texture: '/img/Games/plinko/buckets/bucket_long_1.png',
          xScale: size.width / 84,
          yScale: size.width / 84,
        },
      },
      label: `bucket-${id}`
    })
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
    return Array(this._settings.pegsColumns - 1).fill(null).map((value, index) => {
      const x = size.width * this._bucketFactor * index + size.width * this._bucketFactor + (this._settings.size.width / this._settings.pegsColumns / 2)
      return this._makeBucket(x, this._settings.size.height, index)
    })
  }
}
