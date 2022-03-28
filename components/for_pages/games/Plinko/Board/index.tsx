import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {useGameContext} from 'components/for_pages/games/context/state'
import {Engine, Events, Render, Composite, Bodies, Runner} from 'matter-js'
import {useEffect, useRef, useState} from 'react'
import {
  ICasinoGameFinishEvent,
  ICasinoGameMinesTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { useGameSound} from 'components/for_pages/games/context/game_sound'

interface Props{
  pinsCount: number
  difficulty: string
}
const coords = {
  8: {
    1: [5, -66],
    2: [-44, -24],
    3: [-11],
    4: [-3, -100],
    5: [.1, -7.4],
    6: [10],
    7: [0, .11, -.11, 20, -77, -97],
    8: [-19, -33],
    9: [30]
  },
  9: {1: [-5], 2: [1.3], 3: [4.1, 28], 4: [1.1], 5: [1.8, 4], 6: [-4], 7: [-1.4], 8: [2.2], 9: [-2], 10: [-25]},
  10: {
    1: [0, 1, -1.3],
    2: [-2.22],
    3: [3],
    4: [5, -70],
    5: [.4, -9.6],
    6: [2],
    7: [.2, 4],
    8: [-29],
    9: [6.5, -3.5],
    10: [.7, 2.5],
    11: [66, -1]
  },
  11: {
    1: [6.66],
    2: [1.4, 22, 112, -52],
    3: [-57],
    4: [-160],
    5: [7, -1.444, 7],
    6: [1.2, -4, -50],
    7: [5, -2],
    8: [-7, -60],
    9: [3.33, 25],
    10: [0, 1.8, -2.2, 3.52, -85],
    11: [-22],
    12: [.55, -29.3, -1.3]
  },
  12: {
    1: [0, -1.5, -1.66],
    2: [22],
    3: [-2, -2.22],
    4: [.6, .21, 5.42, 77],
    5: [5.5, 27],
    6: [7, 5, 5.2, .051, -4.1, 55.555],
    7: [25, 55],
    8: [-7, 29.3],
    9: [.1],
    10: [3],
    11: [128],
    12: [33],
    13: [-1, -4.42, 2.424]
  },
  13: {
    1: [.555],
    2: [.5, 5, -2.7],
    3: [.7],
    4: [.9],
    5: [.99, -99.3],
    6: [-55],
    7: [.12, -.6],
    8: [.6, -99.4],
    9: [0, -1.76, -.2, -.7312],
    10: [-99.2],
    11: [-3.131, -3, -99],
    12: [100],
    13: [-2.22, -121],
    14: [3.33, 77, -1]
  },
  14: {
    1: [3.7],
    2: [.9, -3],
    3: [.4, .8],
    4: [1.3],
    5: [-.213],
    6: [-.1],
    7: [.6],
    8: [2.9],
    9: [0, 3.5],
    10: [.1, .7],
    11: [-24, 28],
    12: [.5, 2.8, -5, -20],
    13: [-.8, 44],
    14: [3],
    15: [-66]
  },
  15: {
    1: [1.3, 3.1],
    2: [-68.9],
    3: [3, 5],
    4: [2.9, 5.5],
    5: [5.2],
    6: [.4, .7],
    7: [1.5, -2],
    8: [.5, 3.33],
    9: [-21.2],
    10: [.9],
    11: [.3, 3.2, 5.6],
    12: [.2, .6],
    13: [20],
    14: [20.1],
    15: [20.2],
    16: [0, -3.1]
  },
  16: {
    1: [-150],
    2: [1.4, -3, -66],
    3: [-3.1],
    4: [1.5],
    5: [1.9],
    6: [1.2, -88],
    7: [.8, 1.1, 1.6],
    8: [0],
    9: [1.3, 2.8],
    10: [.9, 2.1],
    11: [2.2],
    12: [2.3, -1.2],
    13: [1.8],
    14: [3.6],
    15: [3.1, -45],
    16: [3],
    17: [2.7]
  }
}
export default function Board(props: Props) {
  const {pinsCount, difficulty} = props
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [turn, setTurn] = useState<ICasinoGameMinesTurn>(null)
  const scene = useRef()
  const engine = useRef(Engine.create())
  const dataRef = useRef({p: {}, m: {}, f: {}})

  useEffect(() => {

    Composite.clear(engine.current.world)
    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        wireframes: !1, background: 'rgb(39, 45, 57)', pixelRatio: 3
      }
    })
    Render.setPixelRatio(render, 3)
    const g = []
    const a = pinsCount + 2
    const o = 800 / a / 2
    const i = (pinsCount - 3) / ((pinsCount - 7) / 2) * (800 / 700)
    const r = engine.current.world
   const  multiplier = gameContext.game.multipliers[difficulty][pinsCount] //c
    const colors = {
      0: ['#ffc000', '#997300'],
      1: ['#ffa808', '#a16800'],
      2: ['#ffa808', '#a95b00'],
      3: ['#ff9010', '#a95b00'],
      4: ['#ff7818', '#914209'],
      5: ['#ff6020', '#b93500'],
      6: ['#ff4827', '#c01d00'],
      7: ['#ff302f', '#c80100'],
      8: ['#ff1837', '#91071c'],
      9: ['#ff003f', '#990026']
    }
    const $ = {
      8: [colors[9], colors[7], colors[4], colors[2], colors[0], colors[2], colors[4], colors[7], colors[9]],
      9: [colors[9], colors[7], colors[6], colors[5], colors[2], colors[2], colors[5], colors[6], colors[7], colors[9]],
      10: [colors[9], colors[8], colors[7], colors[5], colors[4], colors[1], colors[4], colors[5], colors[7], colors[8], colors[9]],
      11: [colors[9], colors[8], colors[7], colors[5], colors[4], colors[2], colors[2], colors[4], colors[5], colors[7], colors[8], colors[9]],
      12: [colors[9], colors[8], colors[7], colors[6], colors[5], colors[4], colors[1], colors[4], colors[5], colors[6], colors[7], colors[8], colors[9]],
      13: [colors[9], colors[8], colors[7], colors[6], colors[5], colors[4], colors[2], colors[2], colors[4], colors[5], colors[6], colors[7], colors[8], colors[9]],
      14: [colors[9], colors[8], colors[7], colors[6], colors[5], colors[4], colors[3], colors[2], colors[3], colors[4], colors[5], colors[6], colors[7], colors[8], colors[9]],
      15: [colors[9], colors[8], colors[7], colors[6], colors[5], colors[4], colors[3], colors[2], colors[2], colors[3], colors[4], colors[5], colors[6], colors[7], colors[8], colors[9]],
      16: [colors[9], colors[8], colors[7], colors[6], colors[5], colors[4], colors[3], colors[2], colors[1], colors[2], colors[3], colors[4], colors[5], colors[6], colors[7], colors[8], colors[9]]
    }
    const v = (800 - 2 * o) / (a - 1)

    const  k = [Bodies.rectangle(400, 625, 800, 50, {
      isStatic: !0,
      render: {fillStyle: 'transparent'}
    }), Bodies.rectangle(0, 0, o / 2, 1200, {
      isStatic: !0,
      render: {fillStyle: 'transparent'}
    }), Bodies.rectangle(800, 0, o / 2, 1200, {isStatic: !0, render: {fillStyle: 'transparent'}})]

    const y = (800 - 2 * o) / a,
      h = 560 / pinsCount, _ = Array(pinsCount).fill(undefined).map((t, a) => {
      const n = y * (pinsCount - a - 1) / 2
      return Array(a + 3).fill(undefined).map((t, e) => ((t, e) => Bodies.circle(t, e, i, {
        isStatic: !0,
        render: {
         shadowOffsetX: 0,
        shadowOffsetY: 2.3,
         shadowBlur: 6,
         shadowColor: 'red',
          sprite: {
            texture: '/img/Games/plinko/ball.svg',
            xScale: 1,
            yScale: 1
          }
        },
        label: 'peg'
      }))(o + y * e + y / 2 + n, h * a + h / 2))
    }).reduce((t, e) => [...t, ...e], []), A = Array(a - 1).fill(undefined).map((e, a) => (e => {
      const a = v / 1.08
      let o = g.length, i = $[pinsCount][o]
        Composite.add(r, Bodies.rectangle(e, 588, a, 24, {
        isStatic: !0,
        render: {fillStyle: i[0]},
        chamfer: {radius: 3},
        label: 'bucket-' + o
      }))
      let l = 'x' + multiplier[o]
        g.push({text: l, x: e, y: 591.75})
      return  Bodies.rectangle(e, 600, a, 7.5, {
        isStatic: !0,
        render: {fillStyle: i[1]}
      })
    })(v * a + v))
    Composite.add(r, [...k, ..._, ...A])



    Events.on(engine.current, 'collisionStart', function (t) {
      const p =   dataRef.current.p
      const m = dataRef.current.m
      const f = dataRef.current.f
      const {pairs: e} = t
      e.forEach(t => {
        const {bodyA: e, bodyB: a} = t, {label: o} = e, {label: s} = a
        if (o.includes('plinko') && s.includes('plinko') && (t.isActive = !1), s.includes('plinko') && o.includes('bucket')) {
          let t = s.split('plinko-')[1]
          if (console.log('Collide - ' + t + ' (profit: ' + p[t] + ')'), void 0 === p[t]) return
          Composite.remove(engine.current.world, a)
          delete p[t]
          dataRef.current.p = p
        }
      })
    })

    const afterRender = (e) => {

      const canvas = document.getElementById('scene').firstElementChild
      if(!canvas) return
      const ctx = (canvas as any).getContext('2d')
      ctx.font = '13px Gilroy', ctx.fillStyle = 'black', ctx.textAlign = 'center'
      for (let e = 0; e < g.length; e++) {
        let a = g[e]
        ctx.fillText(a.text, a.x, a.y)
      }
      //Events.off(render, 'afterRender', afterRender)

    }
    Events.on(render, 'afterRender', afterRender)

      Runner.run(engine.current)
    Render.run(render)
    // create runner
   // var runner = Runner.create()
   // Runner.run(runner, engine)
    return () => {
      // destroy Matter
      Render.stop(render)
      Composite.clear(engine.current.world)
      Engine.clear(engine.current)
      Events.off(render, 'afterRender', afterRender)
     Runner.stop(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [pinsCount, difficulty])

  useEffect(() => {

    const subscriptionGame = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
      if(!data){
        return null
      }
      const i = (data.data.pins - 3) / ((data.data.pins - 7) / 2) * (800 / 700)
      const drop = (bucket, id, profit, multiplier, n) => {
        let s = coords[data.data.pins ][bucket][Math.floor(Math.random() * coords[data.data.pins ][bucket].length)]
        const d = function (t, e, a, o, l) {
          const d = ((t, e, a, o, n) => {

            const r = 1.1 * i, l = 400 + t, d = `hsl(${((t, e) => Math.floor(360 * Math.random()) + 0)()}, 90%, 60%)`
            dataRef.current.p[e] = a
            dataRef.current.m[e] = o
            dataRef.current.f[e] = n
            return Bodies.circle(l, 0, r, {
              restitution: .8,
              render: {fillStyle: d},
              label: 'plinko-' + e
            })
          })(t, e, a, o, l)
          Composite.add(engine.current.world, d)
        }
        d(s, id, profit, multiplier, n), console.log('Dropping game id ' + id + ' in ' + bucket + ' - ' + s + ' = ' + multiplier + ' status: ' + n)
      }
      drop(data.data.bucket, data.id, data.profit.toFixed(2), data.multiplier, false)

    })
    return () => {
      subscriptionGame.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.board} ref={scene} id={'scene'}></div>

    </GamePageBoardLayout>
  )
}


