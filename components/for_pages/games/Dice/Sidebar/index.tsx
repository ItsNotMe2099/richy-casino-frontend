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
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'

interface Props {
  values: ICasinoGameDiceDto
}

export default function Sidebar(props: Props) {
  const {values} = props
  const {mode} = values

  return (
    <GamePageSidebarLayout>
          <HiddenXs>
            <>
              <GFieldMode/>
              <GFieldBet balance={'0.0s0ds0d0sd BTC'}/>
            </>
          </HiddenXs>
          {mode === CasinoGameModeType.Auto && <>
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
                <GFieldBet balance={'0.0s0ds0d0sd BTC'}/>
                <GamePageBetButton/>
              </GamePageBetMobileLayout>
            </>
          </VisibleXs>
    </GamePageSidebarLayout>
  )
}


