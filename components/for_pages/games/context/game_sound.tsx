import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {Howl} from 'howler'
import {GameStorageType} from 'components/for_pages/games/data/types'
export enum GameSound {
  Ball1,
  Ball2,
  Ball3,
  Ball4,
  Bet,
  CardSlide,
  Click,
  Drop,
  Empty,
  Flip,
  FlipCard,
  Guessed,
  Lose,
  Open,
  Open1,
  Open2,
  Plinko,
  Roll,
  Spin,
  Tick,
  Win,
}

const GameSoundFiles = {
  [GameSound.Ball1]: 'ball1.mp3',
  [GameSound.Ball2]: 'ball2.mp3',
  [GameSound.Ball3]: 'ball3.mp3',
  [GameSound.Ball4]: 'ball4.mp3',
  [GameSound.Bet]: 'bet.mp3',
  [GameSound.CardSlide]: 'card_slide.mp3',
  [GameSound.Click]: 'click.mp3',
  [GameSound.Drop]: 'drop.mp3',
  [GameSound.Empty]: 'empty.mp3',
  [GameSound.Flip]: 'flip.mp3',
  [GameSound.FlipCard]: 'flip_card.mp3',
  [GameSound.Guessed]: 'guessed.mp3',
  [GameSound.Lose]: 'lose.mp3',
  [GameSound.Open]: 'open.mp3',
  [GameSound.Open1]: 'open1.mp3',
  [GameSound.Open2]: 'open2.mp3',
  [GameSound.Plinko]: 'plinko1.mp3',
  [GameSound.Roll]: 'roll.mp3',
  [GameSound.Spin]: 'spin.mp3',
  [GameSound.Tick]: 'tick.mp3',
  [GameSound.Win]: 'win.mp3',
}

interface IState {
  play: (file: GameSound, debounce?: number) => void
  stop: () => void
  disabled: boolean
  setDisabled: (disabled?: boolean) => void
}


const defaultValue: IState = {
  play: (file: GameSound, debounce) => null,
  stop: () => null,
  setDisabled: (disabled) => null,
  disabled: false,
}

const GameSoundContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function GameSoundWrapper(props: Props) {
  const songs = Object.values(GameSoundFiles).map(file => `/sounds/${file}`)
  const [songIndex, setSongIndex] = useState(0)
  const [disabled, setDisabled] = useState<boolean>(typeof window !== 'undefined' ? !!localStorage.getItem(GameStorageType.soundDisabled) : false)
  const debounceRef = useRef(null)
  const playersRef = useRef(null)
  const currentPlayer = useRef(null)
  const enabledRef = useRef(!disabled)
  useEffect(() => {
    playersRef.current = songs.map(file =>  new Howl({
      src: [file],
      preload: true
    }))
  }, [])
  const value: IState = {
    ...defaultValue,
    disabled,
    play: (file: GameSound, debounce:number = 0) => {
      if(!enabledRef.current){
        return
      }
      const _play = (file: GameSound) => {
        if(currentPlayer.current){
          currentPlayer.current.stop()
        }

        playersRef.current[file].play()
        currentPlayer.current = playersRef[file]
      }
      if(debounceRef.current){
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      if(debounce > 0){
        debounceRef.current = setTimeout(() => _play(file), debounce)
        return
      }
      _play(file)
    },
    stop: () => {
      if(currentPlayer.current){
        currentPlayer.current.stop()
      }
      currentPlayer.current = null
    },
    setDisabled(disabled){
      setDisabled(disabled)
      enabledRef.current = !disabled
      if(!disabled){
        localStorage.removeItem(GameStorageType.soundDisabled)
      }else{
        localStorage.setItem(GameStorageType.soundDisabled, '1')
      }
    }

  }

  return (
    <GameSoundContext.Provider value={value}>

      {props.children}
    </GameSoundContext.Provider>
  )
}

export function useGameSound() {
  return useContext(GameSoundContext)
}
