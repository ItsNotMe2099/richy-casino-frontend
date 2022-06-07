import GamesList from 'components/for_pages/CatalogPage/GamesList'
import {useEffect, useState} from 'react'
import {IPagination, ISwitchFilterItem} from 'types/interfaces'
import {IGame} from 'data/interfaces/IGame'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import GameListRepository from 'data/repositories/GameListRepository'
import Dice from 'components/svg/Dice'
import Favorite from 'components/svg/Favorite'
import New from 'components/svg/New'
import useIsActiveLink from 'hooks/useIsActiveLink'
import {Routes} from 'types/routes'


enum GameSwitchFilterKey{
  All = 'all',
  Popular = 'Popular',
  New = 'new',
}

interface Props {

}

export default function GamesListLive(props: Props) {

  const [data, setData] = useState<IPagination<IGame>>({data: [], total: 0})
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const limit = 20
  const [filter, setFilter] = useState<GameSwitchFilterKey>(GameSwitchFilterKey.All)
  const allLink = Routes.catalogLive
  const currentPage = useIsActiveLink(allLink)
  const filters: ISwitchFilterItem<GameSwitchFilterKey>[] = [
    {label: 'Все', value: GameSwitchFilterKey.All, icon: <Dice/>},
    {label: 'Популярные', value: GameSwitchFilterKey.Popular, icon: <Favorite/>},
    {label: 'Новинки', value: GameSwitchFilterKey.New, icon: <New/>},
  ]
  useEffect(() => {
    setLoading(true)

    switch (filter) {
      case GameSwitchFilterKey.All:
        GameListRepository.fetchLiveGames({}, 1, limit).then(i => {
          setData(i)
          setLoading(false)
        })
        break
      case GameSwitchFilterKey.New:
        GameListRepository.fetchLatestGames({isLive: true}, 1, limit).then(i => {
          setData(i)
          setLoading(false)
        })
        break
      case GameSwitchFilterKey.Popular:
        GameListRepository.fetchPopularGames( 1, limit, true).then(i => {
          setData(i)
          setLoading(false)
        })
        break
    }

  }, [filter])

  const handleChangeFilter = (item: GameSwitchFilterKey) => {
    setData({data: [], total: 0})
    setFilter(item)
  }
  const handleScrollNext = async () => {
    const newPage = page + 1
    setPage(newPage)
    setLoading(true)
    let res: IPagination<IGame>  = {data: [], total: 0}
    switch (filter){
      case GameSwitchFilterKey.All:
        res = await GameListRepository.fetchLiveGames({}, newPage, limit)
        break
      case GameSwitchFilterKey.New:
        res = await GameListRepository.fetchLatestGames({isLive: true}, 1, limit)
        break
      case GameSwitchFilterKey.Popular:
        res = await GameListRepository.fetchPopularGames( newPage, limit, true)
        break

    }
    setData(data => ({data: [...data.data, ...res.data], total: res.total}))
    setLoading(false)
  }
  return (
    <GamesList title={'Live Casino'} icon={'/img/Contents/live.svg'}
               totalItems={data?.total ?? 0}
               items={data?.data ?? []}
               loading={loading}
               allLink={!currentPage? allLink : null}
               onScrollNext={handleScrollNext}
               switchFilter={<SwitchFilter<GameSwitchFilterKey> items={filters} onClick={handleChangeFilter} active={filter}/>}
    />
  )
}
