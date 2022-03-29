import { Engine, Events, Render, Composite, Bodies, Runner, Body, World } from 'matter-js'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { coords, colors } from './constants'

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
  }

  /**
   * Start the game
   */
  run() {
    World.add(this._engine.world, [...this._pegsGrid])

    Runner.run(this._engine)
    Render.run(this._render)
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
      label: 'plinko-' + id,
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
}
