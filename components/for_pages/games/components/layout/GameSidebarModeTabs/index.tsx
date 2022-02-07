import Tabs from 'components/ui/Tabs'

interface Props {
  mode: IGameModeType
  onChange: (mode) => void
}

export enum IGameModeType {
  Manual = 'manual',
  Auto = 'auto'
}

export default function GameSidebarModeTabs(props: Props) {
  const {mode, onChange} = props
  const options = [
    {label: 'Мануальный', value: IGameModeType.Manual},
    {label: 'Авто', value: IGameModeType.Auto}
  ]
  return (
    <Tabs fluid options={options} value={mode} onChange={(option) => onChange(option.value)}/>
  )
}


