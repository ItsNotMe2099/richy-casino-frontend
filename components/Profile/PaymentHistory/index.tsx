import Button from 'components/ui/Button'
import {format} from 'date-fns'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import SwitchFilterPayments from 'components/for_pages/Common/SwitchFilterPayments'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import {useAppContext} from 'context/state'
import {ProfileModalType} from 'types/enums'

interface Props {

}

interface ItemProps {
  label?: string
  card?: string
  date: string
  amount: string
}

export default function PaymentHistory(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const items = [
    {label: 'Qiwi', card: null, date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: 'Qiwi', card: null, date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: 'Qiwi', card: null, date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: 'Qiwi', card: null, date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: 'Qiwi', card: null, date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: 'Qiwi', card: null, date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
    {label: null, card: '0000000000000001', date: '2021-12-27T12:46:24.007Z', amount: '+ 1000 ₽'},
  ]
  const Item = ({label, card, date, amount}: ItemProps) => {

    return (
      <div className={styles.item}>
        <div className={styles.left}>
          {label ?
            <div className={styles.label}>{label}</div>
            :
            <>
              <div className={styles.bank}>Банковская карта</div>
              <div className={styles.card}>{card.slice(0, 4)} **** **** **{card.slice(14)}</div>
            </>
          }
        </div>
        <div className={styles.right}>
          <div className={styles.date}>{format(new Date(date), 'dd MMMM yyyy | hh:mm')}</div>
          <div className={styles.amount}>{amount}</div>
        </div>
      </div>
    )
  }

  return (<ProfileModalLayout fixed>
      <ProfileModalHeader title={t('payment_history_title')}/>
      <div className={styles.wrapper}>
        <SwitchFilterPayments/>
      </div>
      <ProfileModalBody fixed>

        <div className={styles.list}>
          {items.map((item, index) =>
            <Item label={item.label} card={item.card} date={item.date} amount={item.amount} key={index}/>
          )}
        </div>

      </ProfileModalBody>
      <ProfileModalFooter>
        <div className={styles.btn}>
          <Button size='normal' background='payGradient500' onClick={() => appContext.showModalProfile(ProfileModalType.wallet, {backTo: ProfileModalType.paymentHistory})}>{t('payment_history_deposit')}</Button>
        </div>
      </ProfileModalFooter>
    </ProfileModalLayout>

  )
}
