import Button from 'components/ui/Button'
import {format} from 'date-fns'
import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import {useTranslation} from 'next-i18next'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import BalanceTransactionRepository from 'data/repositories/BalanceTransationRepository'
import {useEffect, useState} from 'react'
import {IPagination} from 'types/interfaces'
import {IBetHistoryItem} from 'data/interfaces/IBetHistoryItem'
import ContentLoader from 'components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image'

const Item = ({item}: {item: IBetHistoryItem}) => {

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.game}>
          <HiddenXs>
            <div className={styles.icon}>
              {(item.imageIconSmallUrl || item.imageIconPreviewUrl)  && <Image src={item.imageIconSmallUrl || item.imageIconPreviewUrl} width={64} height={64}/>}

            </div>
          </HiddenXs>
          <div className={styles.info}>
            <div className={styles.label}>{item.gameId}</div>
            <div className={styles.id}>
              id
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.date}>{format(new Date(item.time), 'dd MMMM yyyy · hh:mm')}</div>
        <div className={classNames(styles.usdt, {[styles.plus]: item.money > 0 })}>{item.money} <span>{item.currencyIso}</span>
        </div>
        {/*<div className={classNames(styles.btc, {[styles.plus]: usdt.slice(0, 1) === '+'})}>{btc}</div>*/}
      </div>
    </div>
  )
}

interface Props {

}

interface ItemProps {
  label?: string
  usdt?: string
  btc: string
  date: string
  icon: string
  id: string
}

export default function BetsHistory(props: Props) {
  const {t} = useTranslation()
  const initialData = {data: [], total: 0}
  const [data, setData] = useState<IPagination<IBetHistoryItem>>(initialData)
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 30

  useEffect(() => {
    BalanceTransactionRepository.fetchBetHistory(1, limit).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])

  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)

    const res = await BalanceTransactionRepository.fetchBetHistory(newPage, limit)
    setData(data => ({data: [...data.data, ...res.data], total: res.total}))

    setLoading(false)
  }

  return (
    <ProfileModalLayout fixed>
      <ProfileModalHeader title={t('bets_history_title')}/>

      <ProfileModalBody fixed id={'bet-history-list'} className={styles.body}>
        {loading && data.total == 0 && <ContentLoader style={'block'} isOpen={true}/>}
        <InfiniteScroll
          dataLength={data.data.length}
          next={handleScrollNext}
          loader={ data.total > 0 ? <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
          hasMore={data.total > data.data.length}
          scrollThreshold={0.6}
          scrollableTarget={'bet-history-list'}
        >
          <div className={styles.list}>
            {data.data.map((item, index) =>
              <Item key={index} item={item}/>
            )}

          </div>
        </InfiniteScroll>

      </ProfileModalBody>
      <ProfileModalFooter>
        <div className={styles.btn}>
          <Button size='normal' background='payGradient500'>{t('bets_history_deposit')}</Button>
        </div>
      </ProfileModalFooter>

    </ProfileModalLayout>
  )
}
