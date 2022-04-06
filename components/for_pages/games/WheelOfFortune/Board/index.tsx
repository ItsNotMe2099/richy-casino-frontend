import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {Wheel} from 'components/for_pages/games/components/WheelOfFortune/Wheel'
import {useEffect, useState} from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import {useGameContext} from 'components/for_pages/games/context/state'
import {chain} from 'components/for_pages/games/utils/chain'
import styles from './index.module.scss'
interface Props{
  mode: 'double' | 'x50'
}
export default function Board(props: Props) {
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const gameSound = useGameSound()

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
      setResult(data)

      if(data){
        gameSound.play(data.win ? GameSound.Win : GameSound.Lose, 100)

      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const redStyle = {style: { backgroundColor: '#FF1F62'}  }
  const data = props.mode === 'double' ? [
    { option: '0', style: { backgroundColor: '#FFC700'}},
    { option: '1', style: { backgroundColor: '#D5F1F1'}  },
    { option: '2'  },
    { option: '3' },
    { option: '4' },
    { option: '5' },
    { option: '6' },
    { option: '7' },
    { option: '8' },
    { option: '9' },
    { option: '10' },
    { option: '11' },
    { option: '12'},
    { option: '13'},
    { option: '14'},
  ] : [
    { option: '0', style: { backgroundColor: '#FFC700'}  },
    { option: '1', ...redStyle},
    { option: '2' },
    { option: '3', },
    { option: '4' },
    { option: '5' },
    { option: '6' },
    { option: '7' },
    { option: '8' },
    { option: '9', ...redStyle },
    { option: '10' },
    { option: '11', ...redStyle },
    { option: '12'},
    { option: '13'},
    { option: '14'},
    { option: '15' },
    { option: '16'},
    { option: '17'  },
    { option: '18' },
    { option: '19', ...redStyle },
    { option: '20' },
    { option: '21', ...redStyle },
    { option: '22' },
    { option: '23' },
    { option: '24' },
    { option: '25' },
    { option: '26' },
    { option: '27'},
    { option: '28'},
    { option: '29'},
    { option: '30'  },
    { option: '31' },
    { option: '32' },
    { option: '33', ...redStyle },
    { option: '34' },
    { option: '35', ...redStyle },
    { option: '36' },
    { option: '37' },
    { option: '38' },
    { option: '39' },
    { option: '40'},
    { option: '41'},
    { option: '42'},
    { option: '43', ...redStyle},
    { option: '44'  },
    { option: '45', ...redStyle },
    { option: '46' },
    { option: '47' },
    { option: '48' },
    { option: '49' },
    { option: '50' },
    { option: '51' },
    { option: '52' },
    { option: '53' },
    { option: '54'},
    { option: '55', ...redStyle},

  ]
  const handleStart = (duration) => {
    setTimeout(() => {
      const length = Math.floor((duration) / 200)
      const length2 = 7
      const length3 = 15
      const length4 = 15
      chain(length, 100, (i) => {
        gameSound.play(GameSound.Tick)
        if(i === length - 1){
          setTimeout(() =>     gameSound.play(GameSound.Tick), 100)

          chain(length2, 200, (i) => {
            gameSound.play(GameSound.Tick)

            if(i === length2 -1){
              setTimeout(() => gameContext.setShowResultModal(true), 300)
            }

          })

        }
      })
    }, 300)

  }
  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <div className={styles.wheel}>
          <div className={styles.radial}>
            <img src={'/img/Games/wheel/wheel_radius@3x.png'}/>
            <div className={styles.radialOverlay}>
              <div className={styles.wheelWrapper}>
              <Wheel
                mustStartSpinning={!!result}
                onStartSpinning={handleStart}
                prizeNumber={result?.data.segment}
                data={data}
                backgroundColors={['#7101FF', '#D5F1F1']}
                textColors={['transparent']}
                outerBorderWidth={0}
                outerBorderColor={'rgba(0, 25,255, 0.05)'}
              />
              <div className={styles.border}>
                <img src={'/img/Games/wheel/wheel_border.svg'}/>
              </div>
              </div>
              <div className={styles.circle}/>
              <div className={styles.overlay}/>
            </div>

          </div>


        </div>

      </div>
    </GamePageBoardLayout>
  )
}


