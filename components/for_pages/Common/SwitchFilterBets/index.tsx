
import SwitchFilter, {SwitchFilterBaseProps} from 'components/for_pages/Common/SwitchFilter'
import {ISwitchFilterItem} from 'types/interfaces'
import {BetSwitchFilterKey} from 'types/enums'

interface Props  extends  SwitchFilterBaseProps<BetSwitchFilterKey>{
}

export default function SwitchFilterBets(props: Props) {
  const items: ISwitchFilterItem<BetSwitchFilterKey>[] = [
    {label: 'Все ставки', value: BetSwitchFilterKey.All},
    {label: 'Мои ставки', value: BetSwitchFilterKey.My}
  ]

  return (
     <SwitchFilter<BetSwitchFilterKey> {...props} items={items}  />
  )
}
