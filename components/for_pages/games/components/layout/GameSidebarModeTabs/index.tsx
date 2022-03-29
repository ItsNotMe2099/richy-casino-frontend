import Tabs from 'components/ui/Tabs'

interface Props {
  mode: CasinoGameModeType
  onChange: (mode) => void
}

export enum CasinoGameModeType {
  Manual = 'manual',
  Auto = 'auto'
}

export default function GameSidebarModeTabs(props: Props) {
  const {mode, onChange} = props
  const options = [
    {label: 'Мануальный', value: CasinoGameModeType.Manual},
    {label: 'Авто', value: CasinoGameModeType.Auto}
  ]
  return (
    <Tabs fluid options={options} value={mode} onChange={(option) => onChange(option.value)}/>
  )
}


