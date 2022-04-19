import SwitchFilter, {SwitchFilterBaseProps} from 'components/for_pages/Common/SwitchFilter'
import {ISwitchFilterItem} from 'types/interfaces'
import {PaymentSwitchFilterKey} from 'types/enums'
import {useTranslation} from 'next-i18next'

interface Props  extends  SwitchFilterBaseProps<PaymentSwitchFilterKey>{
}

export default function SwitchFilterPayments(props: Props) {
  const {t} = useTranslation()
  const items: ISwitchFilterItem<PaymentSwitchFilterKey>[] = [
    {label: t('payment_history_filter_all'), value: PaymentSwitchFilterKey.All},
    {label: t('payment_history_filter_deposit'), value: PaymentSwitchFilterKey.Deposit},
    {label: t('payment_history_filter_withdrawal'), value: PaymentSwitchFilterKey.Withdrawal},
  ]

  return (
     <SwitchFilter<PaymentSwitchFilterKey> {...props} items={items}  />
  )
}
