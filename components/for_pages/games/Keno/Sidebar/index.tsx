import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import GFieldBet from 'components/for_pages/games/components/inputs/GFieldBet'
import GFieldBetAmount from 'components/for_pages/games/components/inputs/GFieldBetAmount'
import GFieldAutoAction from 'components/for_pages/games/components/inputs/GFieldAutoAction'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
import HiddenXs from 'components/ui/HiddenXS'
import GamePageBetMobileLayout from 'components/for_pages/games/components/layout/GamePageBetMobileLayout'
import VisibleXs from 'components/ui/VisibleXS'
import GamePageBetButton from 'components/for_pages/games/components/GamePageBetButton'
import GFieldMode from 'components/for_pages/games/components/inputs/GFieldMode'
import GamePageSidebarLayout from 'components/for_pages/games/components/layout/GamePageSidebarLayout'
import {CasinoGameModeType} from 'components/ui/Tabs'
import {KenoGameLevel} from 'components/for_pages/games/Keno/data/enums'
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import Button from 'components/ui/Button'

interface Props {
  onSubmit: (data: ICasinoGameDataDto) => void
  onClear: () => void
  onAutoSelect: () => void
}

export default function Sidebar(props: Props) {

  const onSubmit = (data) => {
    props.onSubmit(data)
  }

  const formik = useFormik({
    initialValues: {
      gameMode: CasinoGameModeType.Manual,
      bet: null,
      betAmount: null,
      onWinType: null,
      onWinValue: null,
      onLooseType: null,
      onLooseValue: null,
    },
    onSubmit,
  })

  const {values} = formik
  const {gameMode} = values
  const options = [
    {label: 'Low', value: KenoGameLevel.Low},
    {label: 'Medium', value: KenoGameLevel.Medium},
    {label: 'High', value: KenoGameLevel.High},
  ]
  const handleClearClick = () => {

  }
  const handleAutoClick = () => {

  }
  return (
    <GamePageSidebarLayout>
      <FormikProvider value={formik}>
        <Form>
          <HiddenXs>
            <>
              <GFieldMode/>
              <GFieldBet/>
            </>
          </HiddenXs>
          <div className={styles.buttons}>
            <Button size='small' fluid background='dark500'  onClick={props.onAutoSelect}>
              Авто выбор
            </Button>
            <Button className={styles.clearButton} size='small' fluid background='dark500'  onClick={props.onClear}>
              Очистить
            </Button>
          </div>
          {gameMode ===CasinoGameModeType.Auto && <>
            <GFieldBetAmount name={'betAmount'}/>
            <GFieldAutoAction typeName={'onWinType'} valueName={'onWinValue'}/>
            <GFieldAutoAction typeName={'onLooseType'} valueName={'onLooseValue'}/>
            <CheckBox size={'normal'} name={'stopOnWin'} label={'Stop on win'}/>
          </>}

          <HiddenXs>
            <GamePageBetButton/>
          </HiddenXs>

          <VisibleXs>
            <>
              <GFieldMode/>
              <GamePageBetMobileLayout>
                <GFieldBet/>
                <GamePageBetButton/>
              </GamePageBetMobileLayout>
            </>
          </VisibleXs>
        </Form>
      </FormikProvider>
    </GamePageSidebarLayout>

  )
}


