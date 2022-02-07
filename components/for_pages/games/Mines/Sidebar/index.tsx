import GamePageSidebarLayout from 'components/for_pages/games/components/layout/GamePageSidebarLayout'
import GameSidebarModeTabs, {IGameModeType} from 'components/for_pages/games/components/layout/GameSidebarModeTabs'
import {useState} from 'react'
import FormManual from './FormManual'
interface Props{

}
export default function Sidebar(props: Props) {
  const [mode, setMode] = useState(IGameModeType.Manual)
  const handleChangeMode = (mode) => {
    setMode(mode)
  }
  return (
    <GamePageSidebarLayout>
     <GameSidebarModeTabs onChange={handleChangeMode} mode={mode}/>
      <FormManual/>
    </GamePageSidebarLayout>
  )
}


