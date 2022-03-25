import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {Form, FormikProvider, useFormik} from 'formik'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {useGameContext} from 'components/for_pages/games/context/state'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import {CasinoGameModeType} from 'components/for_pages/games/components/inputs/GFieldMode'

interface Props{

}
export default function GameDice(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  const onSubmit = async (data) => {
    gameSound.play(GameSound.Roll)

    await gameContext.startGame({...data, gameType: CasinoGameType.Dice}, false)

  }

  const formik = useFormik({
    initialValues: {
      gameMode: CasinoGameModeType.Manual,
      bet: null,
      profit: null,
      betAmount: null,
      onWinType: null,
      onWinValue: null,
      onLooseType: null,
      onLooseValue: null,
      target: 'higher',
      payout: 'x1.98',
      value: 50,
      chance: 50
    },
    onSubmit,
  })
  const handleChangeField = (name: string, value: any) => {
    formik.setFieldValue(name, value)
  }
  return (
    <FormikProvider value={formik}>
      <Form>
    <GamePageLayout
      header={<GamePageHeader title={'Dice'} icon={''}/>}
      sideBar={<Sidebar values={formik.values}/>}
      board={<Board values={formik.values} onSetValue={handleChangeField}/>} history={<GameHistory items={history}/>}/>
      </Form>
    </FormikProvider>
  )
}


