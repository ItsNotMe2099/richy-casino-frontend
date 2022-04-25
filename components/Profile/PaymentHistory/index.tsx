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
import {PaymentSwitchFilterKey, ProfileModalType} from 'types/enums'
import {useEffect, useState} from 'react'
import BalanceTransactionRepository from 'data/repositories/BalanceTransationRepository'
import {BalanceTransactionType, IBalanceTransaction} from 'data/interfaces/IBalanceTransaction'
import {IPagination} from 'types/interfaces'
import {IWithdrawHistory} from 'data/interfaces/IWithdrawHistory'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {

}

interface ItemProps {
  label?: string
  card?: string
  date: string
  amount: number
  currency: string
  isRed?: boolean
}

const Item = ({label, card, date, amount, currency, isRed}: ItemProps) => {

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
        <div className={classNames(styles.amount, {[styles.red]: isRed})}>{isRed ? '-' : '+'} {amount} {currency}</div>
      </div>
    </div>
  )
}
export default function PaymentHistory(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const initialData = {data: [], total: 0}
  const [filter, setFilter] = useState<PaymentSwitchFilterKey>(PaymentSwitchFilterKey.All)
  const [data, setData] = useState<IPagination<IBalanceTransaction>>(initialData)
  const [applicationsData, setApplicationsData] = useState<IPagination<IWithdrawHistory>>(initialData)
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 30
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
  const getTypesFilter = (filter: PaymentSwitchFilterKey) => {
    switch (filter){
      case PaymentSwitchFilterKey.All:
        return [BalanceTransactionType.Initial, BalanceTransactionType.Deposit, BalanceTransactionType.Withdrawal]
      case PaymentSwitchFilterKey.Deposit:
        return [BalanceTransactionType.Deposit]
      case PaymentSwitchFilterKey.Withdrawal:
        return [BalanceTransactionType.Withdrawal]
      case PaymentSwitchFilterKey.Applications:
    }
  }
  useEffect(() => {
    if(filter === PaymentSwitchFilterKey.Applications){
      BalanceTransactionRepository.fetchWithdrawalHistory( 1, limit).then(i => setApplicationsData(i))
    }else {
      BalanceTransactionRepository.fetchTransactions(getTypesFilter(filter), 1, limit).then(i => setData(i))
    }
    }, [filter])
  const handleChangeFilter = (item: PaymentSwitchFilterKey) => {
    setPage(1)
    setData(initialData)
    setApplicationsData(initialData)
    setFilter(item)
  }

  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    if(filter === PaymentSwitchFilterKey.Applications){
      const res = await BalanceTransactionRepository.fetchWithdrawalHistory( newPage, limit)
      setApplicationsData(data => ({data: [...data.data, ...res.data], total: res.total}))
    }else {
      const res = await BalanceTransactionRepository.fetchTransactions(getTypesFilter(filter), newPage, limit)
      setData(data => ({data: [...data.data, ...res.data], total: res.total}))
    }
    setLoading(false)
  }

  return (<ProfileModalLayout fixed>
      <ProfileModalHeader title={t('payment_history_title')}/>
      <div className={styles.wrapper}>
        <SwitchFilterPayments active={filter} onClick={handleChangeFilter}/>
      </div>
      <ProfileModalBody fixed id={'payment-history-list'} className={styles.body}>
        <InfiniteScroll
          dataLength={PaymentSwitchFilterKey.Applications ? applicationsData.data.length : data.data.length}
          next={handleScrollNext}
          loader={<div></div>}
          hasMore={PaymentSwitchFilterKey.Applications ? applicationsData.total > applicationsData.data.length : data.total > data.data.length}
          scrollThreshold={0.6}
          scrollableTarget={'payment-history-list'}
        >
        <div className={styles.list}>
          {filter === PaymentSwitchFilterKey.Applications &&  applicationsData.data.map((item, index) =>
            <Item label={'Вывод'} card={item.address} date={item.createdAt.unixtimestamp} amount={item.amount} currency={item.currencyIso} key={item.id} isRed/>
          )}
          {filter !== PaymentSwitchFilterKey.Applications &&  data.data.map((item, index) =>
            <Item label={item.providerName} card={item.providerDetails} date={item.eventDate} amount={item.amount} currency={item.currencyIso}
                  isRed={[BalanceTransactionType.Withdrawal].includes(item.type)}
                  key={item.unixtimestamp}/>
          )}

        </div>
        </InfiniteScroll>

      </ProfileModalBody>
      <ProfileModalFooter>
        <div className={styles.btn}>
          <Button size='normal' background='payGradient500' onClick={() => appContext.showModalProfile(ProfileModalType.wallet, {backTo: ProfileModalType.paymentHistory})}>{t('payment_history_deposit')}</Button>
        </div>
      </ProfileModalFooter>
    </ProfileModalLayout>

  )
}
