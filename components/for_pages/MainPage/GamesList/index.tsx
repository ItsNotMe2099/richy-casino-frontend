import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import {useEffect, useState} from 'react'
import classNames from 'classnames'
import VisibleXs from 'components/ui/VisibleXS'
import HiddenXs from 'components/ui/HiddenXS'
import ItemGame from 'components/for_pages/Common/ItemGame'
import CategoryFilter from 'components/for_pages/MainPage/GamesList/CategoryFilter'
import {IPagination} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import GameListRepository from 'data/repositories/GameListRepository'
import ProviderFilter from 'components/for_pages/MainPage/GamesList/ProviderFilter'
import {Routes} from 'types/routes'
import Formatter from 'utils/formatter'
import {useMeasure} from 'react-use'
export enum MainGameListType{
  All = 'all',
  Live = 'live'
}
interface IItem {
  image: string
  label: string
  category: string
  provider: string
}

interface Props {
  type: MainGameListType
  icon: string
  label: string
  shadowColor?: 'red' | 'blue' | 'yellow'
}

export default function MainGamesList(props: Props) {
  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [ref, { width, height }] = useMeasure()
  const limit = 30
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [providerId, setProviderId] = useState<number | null>(null)
  useEffect(() => {
    (props.type === MainGameListType.All ? GameListRepository.fetchGames({}, 1, limit) :
      GameListRepository.fetchLiveGames({}, 1, limit)
    ).then(i => {
      setData(i)
      setLoading(false)
    })
  }, [])
  const handleChangeFilter = (categoryId: number, providerId: number) => {
    setCategoryId(categoryId)
    setProviderId(providerId);

    (props.type === MainGameListType.All ? GameListRepository.fetchGames({}, 1, limit) :
      GameListRepository.fetchLiveGames({}, 1, limit)
    ).then(i => {
      setData(i)
      setLoading(false)
    })
  }
  return (
    <div ref={ref} className={classNames(styles.root, {[styles.none]: data.total === 0})}>
      <Header icon={props.icon} label={props.label} length={Formatter.formatNumber(data.total)} shadowColor={props.shadowColor} allLink={props.type === MainGameListType.All ? Routes.catalog :  Routes.catalogLive}/>
      <HiddenXs>
        <>
          <div className={styles.filters}>
           <CategoryFilter categoryId={categoryId} onChange={(categoryId) => handleChangeFilter(categoryId, providerId)}/>
            <ProviderFilter providerId={providerId} onChange={(providerId) => handleChangeFilter(categoryId, providerId)}/>
          </div>
          <div className={styles.list}>
            {data.data.slice(0, width > 634 ? 12 : 9).map((item, index) =>
              <ItemGame item={item} key={index}/>
            )}
          </div>
        </>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.mobile}>
            {data.data.map((item, index) =>
              <ItemGame item={item} key={index}/>
            )}
        </div>
      </VisibleXs>
    </div>
  )
}
